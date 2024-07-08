import {InputUserType, OutputUserType} from "../../types/input-output-types/user-type";
import {UsersMongoRepository} from "../04-repository/users-mongo-repository";
import {BcryptService} from "../../application/bcrypt-service/bcrypt-service";
import {UserClass} from "../../classes/user-class";

export class UsersService {
    constructor(
        protected usersMongoRepository: UsersMongoRepository,
        protected bcryptService: BcryptService
    ) {}

    async createSuperUser(input: InputUserType): Promise<OutputUserType> {
        const passwordHash = await this.bcryptService.generateHash(input.password)
        const createdUser = new UserClass(
            input.login,
            passwordHash,
            undefined,
            input.email,
            new Date().toISOString(),
            {confirmationCode: undefined, expirationDate: undefined, isConfirmed: true}
        )
        const insertedUser = await this.usersMongoRepository.create(createdUser)
        return {
            id: insertedUser.id.toString(),
            login: createdUser.login,
            email: createdUser.email,
            createdAt: createdUser.createdAt
        }
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.usersMongoRepository.delete(id)
        return result.deletedCount === 1
    }
}
import {InputUserType, OutputUserType} from "../../types/input-output-types/user-type";
import {UserDbType} from "../../types/db-types/user-db-type";
import {UsersMongoRepository} from "../04-repository/users-mongo-repository";
import {BcryptService} from "../../application/bcrypt-service/bcrypt-service";

export class UsersService {
    private usersMongoRepository: UsersMongoRepository
    private bcryptService: BcryptService

    constructor() {
        this.usersMongoRepository = new UsersMongoRepository()
        this.bcryptService = new BcryptService()
    }

    async createSuperUser(input: InputUserType): Promise<OutputUserType> {
        const passwordHash = await this.bcryptService.generateHash(input.password)
        const createdUser: UserDbType = { //todo something
            login: input.login,
            passwordHash: passwordHash,
            email: input.email,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                isConfirmed: true
            }
        }
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
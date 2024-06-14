import {UserModel} from "../../db/mongo/mongo-db";
import {UserDbType} from "../../types/db-types/user-db-type";
import {ObjectId} from "mongodb";

export class UsersMongoRepository {
    async create(input: UserDbType) {
        return UserModel.create(input)
    }

    async delete(id: string) {
        return UserModel.deleteOne({_id: new ObjectId(id)})
    }

    async updateEmailConfirmation(id: string, input: Object) {
        return UserModel.updateOne({_id: new ObjectId(id)}, {
            $set: {
                ...input
            }
        })
    }

    async passwordRecoveryConfirmation(email: string, input: Object) {
        return UserModel.updateOne({email: email}, {
            $set: {
                ...input
            }
        })
    }

    async updatePasswordRecovery(userId: string, newPasswordHash: string, input: Object) {
        return UserModel.updateOne({_id: new ObjectId(userId)}, {
            $set: {
                passwordHash: newPasswordHash,
                ...input
            }
        })
    }
}
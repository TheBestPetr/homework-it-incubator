import {userCollection} from "../../db/mongo-db";
import {UserDbType} from "../../types/db-types/user-db-type";
import {ObjectId} from "mongodb";

export const usersMongoRepository = {
    async create(input: UserDbType) {
        return await userCollection.insertOne(input)
    },

    async delete(id: string) {
        return await userCollection.deleteOne({_id: new ObjectId(id)})
    },

    async updateEmailConfirmation(id: string, input: Object) {
        return await userCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                ...input
            }
        })
    },

    async passwordRecoveryConfirmation(email: string, input: Object) {
        return await userCollection.updateOne({email: email}, {
            $set: {
                ...input
            }
        })
    }
}
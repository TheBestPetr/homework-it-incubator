import {userCollection} from "../../db/mongo-db";
import {UserDbType} from "../../db/user-db-type";
import {ObjectId} from "mongodb";

export const usersMongoRepository = {
    async create(input: UserDbType) {
        return await userCollection.insertOne(input)
    },

    async delete(id: string) {
        return await userCollection.deleteOne({_id: new ObjectId(id)})
    },

    async updateEmailStatus(id: string, input: Object) {
        return await userCollection.updateOne({_id: new ObjectId(id)}, {
            $set: {
                ...input
            }
        })
    }
}
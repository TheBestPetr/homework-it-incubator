import {InputUserQueryType, OutputUserQueryType} from "../../types/userType";
import {userCollection} from "../../db/mongo-db";
import {meDBType} from "../../db/me-db-type";
import {ObjectId} from "mongodb";

export const usersMongoQueryRepository = {
    async find(query: InputUserQueryType): Promise<OutputUserQueryType> {
        const searchWithEmail = query.searchEmailTerm
            ? {email: {$regex: query.searchEmailTerm, $options: 'i'}}
            : {}
        const searchWithLogin = query.searchLoginTerm
            ? {login: {$regex: query.searchLoginTerm, $options: 'i'}}
            : {}
        const items = await userCollection
            .find({$or: [searchWithEmail, searchWithLogin]})
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()
        const totalCount = await userCollection.countDocuments({$or: [searchWithEmail, searchWithLogin]})
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: items.map(user => ({
                id: user._id.toString(),
                login: user.login,
                email: user.email,
                createdAt: user.createdAt
            }))
        }
    },

    async findByLoginOrEmail(loginOrEmail: string) {
        return await userCollection.findOne({$or: [{'login': loginOrEmail}, {'email': loginOrEmail}]})
    },

    async findById(userId: string): Promise<meDBType | null> {
        const user = await userCollection.findOne({_id: new ObjectId(userId)})
        if (user) {
            return {
                email: user.email,
                login: user.login,
                userId: user._id.toString()
            }
        }
        return null
    },

    async findByConfirmationCode(code: string) {
        const user = await userCollection.findOne({"emailConfirmation.confirmationCode": code})
        if (user) {
            return user
        }
        return null
    }
}
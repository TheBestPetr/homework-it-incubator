import {InputUserQueryType, OutputUserQueryType} from "../../types/usersType";
import {usersCollection} from "../../db/mongo-db";

export const usersMongoQueryRepository = {
    async find(query: InputUserQueryType): Promise<OutputUserQueryType> {
        const searchWithEmail = query.searchEmailTerm
            ? {email: {$regex: query.searchEmailTerm, $options: 'i'}}
            : {}
        const searchWithLogin = query.searchLoginTerm
            ? {login: {$regex: query.searchLoginTerm, options: 'i'}}
            : {}
        const items = await usersCollection
            .find({$or: [{email: searchWithEmail}, {login: searchWithLogin}]})
            .sort(query.sortBy, query.sortDirection)
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .toArray()
        const totalCount = await usersCollection.countDocuments({$or: [{email: searchWithEmail}, {login: searchWithLogin}]})
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
    }
}
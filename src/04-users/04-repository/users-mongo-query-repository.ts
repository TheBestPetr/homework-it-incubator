import {InputUserQueryType, OutputIType, OutputUserQueryType} from "../../types/input-output-types/user-type";
import {UserModel} from "../../db/mongo/mongo-db";
import {ObjectId} from "mongodb";

export class UsersMongoQueryRepository {
    async find(query: InputUserQueryType): Promise<OutputUserQueryType> {
        const searchWithEmail = query.searchEmailTerm
            ? {email: {$regex: query.searchEmailTerm, $options: 'i'}}
            : {}
        const searchWithLogin = query.searchLoginTerm
            ? {login: {$regex: query.searchLoginTerm, $options: 'i'}}
            : {}
        const items = await UserModel
            .find({$or: [searchWithEmail, searchWithLogin]})
            .sort({[`${query.sortBy}`]: query.sortDirection})
            .skip((query.pageNumber - 1) * query.pageSize)
            .limit(query.pageSize)
            .lean()
        const totalCount = await UserModel.countDocuments({$or: [searchWithEmail, searchWithLogin]})
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

    async findByLoginOrEmail(loginOrEmail: string) {
        return UserModel.findOne({$or: [{'login': loginOrEmail}, {'email': loginOrEmail}]}).lean()
    }

    async findById(userId: string): Promise<OutputIType | null> {
        const user = await UserModel.findOne({_id: new ObjectId(userId)}).lean()
        if (user) {
            return {
                email: user.email,
                login: user.login,
                userId: user._id.toString()
            }
        }
        return null
    }

    async findByEmailConfirmationCode(code: string) {
        const user = await UserModel.findOne({'emailConfirmation.confirmationCode': code}).lean()
        if (user) {
            return user
        }
        return null
    }

    async findByPasswordRecoveryCode(code: string) {
        const user = await UserModel.findOne({'passwordRecovery.recoveryCode': code}).lean()
        if (user) {
            return user
        }
        return null
    }
}
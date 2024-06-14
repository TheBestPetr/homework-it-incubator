import {Request, Response} from "express";
import {
    InputUserQueryType,
    InputUserType,
    OutputUserQueryType,
    OutputUserType
} from "../../types/input-output-types/user-type";
import {sortNPagingUserQuery} from "../../helpers/query-helper";
import {UsersMongoQueryRepository} from "../04-repository/users-mongo-query-repository";
import {UsersService} from "../03-service/users-service";
import {ObjectId} from "mongodb";

class UsersController {
    private usersService: UsersService
    private usersMongoQueryRepository: UsersMongoQueryRepository

    constructor() {
        this.usersService = new UsersService()
        this.usersMongoQueryRepository = new UsersMongoQueryRepository()
    }

    async findUsers(req: Request<{}, {}, {}, Partial<InputUserQueryType>>,
                    res: Response<OutputUserQueryType>) {
        const query = sortNPagingUserQuery(req.query)
        const users = await this.usersMongoQueryRepository.find(query)
        res.status(200).send(users)
    }

    async createUserController(req: Request<{}, {}, InputUserType>,
                               res: Response<OutputUserType>) {
        const user = await this.usersService.createSuperUser(req.body)
        res.status(201).send(user)
    }

    async deleteUserController(req: Request<{ id: string }>,
                               res: Response) {
        if (!ObjectId.isValid(req.params.id)) {
            res.sendStatus(404)
            return
        }
        const isDelete = await this.usersService.delete(req.params.id)
        if (isDelete) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    }
}

export const usersController = new UsersController()
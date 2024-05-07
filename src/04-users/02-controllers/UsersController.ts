import {Request, Response} from "express";
import {InputUserType, OutputUserQueryType, OutputUserType} from "../../types/userType";
import {sortNPagingUserQuery} from "../../helpers/queryHelper";
import {usersMongoQueryRepository} from "../04-repository/usersMongoQueryRepository";
import {usersService} from "../03-service/usersService";
import {ObjectId} from "mongodb";

export const getUsers = async (req: Request,
                               res: Response<OutputUserQueryType>) => {
    const query = sortNPagingUserQuery(req.query)
    const users = await usersMongoQueryRepository.find(query)
    res.status(200).send(users)
}

export const createUserController = async (req: Request<{}, {}, InputUserType>,
                                           res: Response<OutputUserType>) => {
    const user = await usersService.create(req.body)
    res.status(201).send(user)
}

export const deleteUserController = async (req: Request<{ id: string }>,
                                           res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.sendStatus(404)
        return
    }
    const isDelete = await usersService.delete(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
}

import {UsersMongoRepository} from "../../04-users/04-repository/users-mongo-repository";
import {UsersService} from "../../04-users/03-service/users-service";
import {BcryptService} from "../bcrypt-service/bcrypt-service";
import {UsersController} from "../../04-users/02-controllers/users-controller";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";

const bcryptService = new BcryptService()
const usersMongoRepository = new UsersMongoRepository()
const usersMongoQueryRepository = new UsersMongoQueryRepository()
const usersService = new UsersService(
    usersMongoRepository,
    bcryptService
)
export const usersController = new UsersController(
    usersService,
    usersMongoQueryRepository
)
import {RefreshTokenMongoRepository} from "../../05-auth/04-repository/refresh-token-mongo-repository";
import {UsersMongoRepository} from "../../04-users/04-repository/users-mongo-repository";
import {UsersMongoQueryRepository} from "../../04-users/04-repository/users-mongo-query-repository";
import {DevicesMongoRepository} from "../../07-security/04-repository/devices-mongo-repository";
import {BcryptService} from "../../application/bcrypt-service/bcrypt-service";
import {JwtService} from "../../application/jwt-service/jwt-service";
import {NodemailerService} from "../../application/nodemaile-service/nodemailer-service";
import {AuthService} from "../../05-auth/03-servise/auth-service";
import {AuthController} from "../../05-auth/02-controllers/auth-controller";
import {devicesService} from "./devices-composition";

const refreshTokenMongoRepository = new RefreshTokenMongoRepository()
const usersMongoRepository = new UsersMongoRepository()
const usersMongoQueryRepository = new UsersMongoQueryRepository()
const devicesMongoRepository = new DevicesMongoRepository()
const bcryptService = new BcryptService()
const jwtService = new JwtService()
const nodemailerService = new NodemailerService()
const authService = new AuthService(
    refreshTokenMongoRepository,
    usersMongoRepository,
    usersMongoQueryRepository,
    devicesService,
    devicesMongoRepository,
    bcryptService,
    jwtService,
    nodemailerService
)
export const authController = new AuthController(
    authService,
    usersMongoQueryRepository,
)
import {DevicesMongoRepository} from "../../07-security/04-repository/devices-mongo-repository";
import {JwtService} from "../jwt-service/jwt-service";
import {DevicesService} from "../../07-security/03-service/devices-service";
import {DevicesController} from "../../07-security/02-controllers/devices-controller";

const devicesMongoRepository = new DevicesMongoRepository()
const jwtService = new JwtService()
export const devicesService = new DevicesService(
    devicesMongoRepository,
    jwtService
)
export const devicesController = new DevicesController(
    devicesService,
    devicesMongoRepository
)
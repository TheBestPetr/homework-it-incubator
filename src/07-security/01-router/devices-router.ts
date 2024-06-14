import {Router} from "express";
import {devicesController} from "../02-controllers/devices-controller";

export const devicesRouter = Router()

devicesRouter.get('/',
    devicesController.getAllDevicesWithActiveSession.bind(devicesController))

devicesRouter.delete('/',
    devicesController.terminateAllDevicesSession.bind(devicesController))

devicesRouter.delete('/:deviceId',
    devicesController.terminateSpecifiedDeviceSession.bind(devicesController))
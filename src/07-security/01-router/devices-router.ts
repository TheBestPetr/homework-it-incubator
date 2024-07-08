import {Router} from "express";
import {devicesController} from "../../classes/composition-root/devices-composition";

export const devicesRouter = Router()

devicesRouter.get('/',
    devicesController.getAllDevicesWithActiveSession.bind(devicesController))

devicesRouter.delete('/',
    devicesController.terminateAllDevicesSession.bind(devicesController))

devicesRouter.delete('/:deviceId',
    devicesController.terminateSpecifiedDeviceSession.bind(devicesController))
import {Router} from "express"
import {TestingAllData} from "./testing-all-data";

export const testingRouter = Router()

testingRouter.delete('/', TestingAllData)
import {UserDbType} from "../db/user-db-type";

declare global {
    declare namespace Express {
        export interface Request {
            user: UserDbType | null
        }
    }
}
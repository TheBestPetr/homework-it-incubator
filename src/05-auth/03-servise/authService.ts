import {InputLoginType} from "../../types/authType";
import {bcryptService} from "../../bcryptService/bcryptService";
import {usersMongoQueryRepository} from "../../04-users/04-repository/usersMongoQueryRepository";

export const authService = {
    async checkCredentials(input: InputLoginType): Promise<string | null> {
        const user = await usersMongoQueryRepository.findWithLoginOrEmail(input.loginOrEmail)
        if (user) {
            const isPassCorrect = await bcryptService.checkPassword(input.password, user!.passwordHash)
            if (isPassCorrect) {
                return user._id.toString()
            }
        }
        return null
    }
}
import {InputLoginType} from "../../types/authType";
import {usersMongoRepository} from "../../04-users/04-repository/usersMongoRepository";
import {bcryptService} from "../../bcryptService/bcryptService";

export const authService = {
    async checkCredentials(input: InputLoginType): Promise<string | null> {
        const user = await usersMongoRepository.find(input.loginOrEmail)
        if (user) {
            const isPassCorrect = await bcryptService.checkPassword(input.password, user!.passwordHash)
            if (isPassCorrect) {
                return user._id.toString()
            }
        }
        return null
    }
}
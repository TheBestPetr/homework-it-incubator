import {app} from './app'
import {SETTINGS} from "./settings";
import {connectToDB} from "./db/mongo-db";
import {addRoutes} from "./routes";

const startApp = async () => {
    addRoutes(app)
    if (!await connectToDB()) {
        console.log('Failed connection to DB')
        process.exit(1)
    }
    app.listen(SETTINGS.PORT, async () => {
        console.log(`Server started on port: ${SETTINGS.PORT}`)
    })

}

startApp()
import {app} from './app'
import {SETTINGS} from "./settings";
import {connectToDB} from "./db/mongo/mongo-db";
import {addRoutes} from "./routes";

const startApp = async () => {
    addRoutes(app)
    if (!await connectToDB()) {
        console.log('Connection to DB - Failed')
        process.exit(1)
    }
    app.listen(SETTINGS.PORT, async () => {
        console.log(`Server started on port: ${SETTINGS.PORT}`)
    })

}

startApp()
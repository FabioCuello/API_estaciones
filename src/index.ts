require("dotenv").config()

import mongoose from "mongoose"
import schedule from "node-schedule"
import { update, newsletter } from "./lib/index"
import { MONGO_URI, MONGO_OPTIONS, APP_PORT, RULE, DATA_UPDATE } from "./config/index"
import { createApp } from "./app"

    ; (async () => {
        await mongoose.connect(MONGO_URI, MONGO_OPTIONS)
        mongoose.set("useCreateIndex", true);

        setInterval(() => { update() }, +DATA_UPDATE)

        schedule.scheduleJob(RULE, () => newsletter())

        const app = createApp()

        app.listen(APP_PORT, () => console.log(`http://localhost:${APP_PORT}`))
    })()


import express from "express"
import cors from "cors"
import { radiation, wind, emuEnergy, panelEnergy, HSP } from "./routes/index"

export const createApp = () => {
    const app = express()

    app.use(cors())

    app.use("/api/data", radiation)

    app.use("/api/data", wind)

    app.use("/api/data", emuEnergy)

    app.use("/api/data", panelEnergy)

    app.use("/api/data", HSP)

    return app
}


// Imports 
import express from "express"
import stationRoutes from "./routes/station"

export const createApp = () => {
    const app = express()

    app.use("/api/data", stationRoutes)

    return app
}


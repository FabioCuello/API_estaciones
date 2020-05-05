import { Router, Request, Response } from "express"
import { catchAsync } from "../middleware/error"
import * as controllers from "../controllers/stationControllers"


const routes: Router = Router()

// Routers
routes.get("/:data", catchAsync(controllers.wind))

routes.get("/radiation", catchAsync(controllers.radiation))

routes.get("/HSP", catchAsync(controllers.HSP))

routes.get("/panelEnergy", catchAsync(controllers.panelEnergy))

routes.get("/emuEnergy", catchAsync(controllers.emuEnergy))

export default routes

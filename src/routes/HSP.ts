import { Request, Response, Router } from "express"
import { stationC } from "../lib/stations"

const router = Router()

router.get("/HSP", async (req: Request, res: Response) => {
    await stationC.update_panelEnergy()

    res.status(200).json(stationC.HSP)
})

export { router as HSP }
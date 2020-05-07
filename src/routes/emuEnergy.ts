import { Request, Response, Router } from "express"
import { stationK } from "../lib/stations"

const router = Router()

router.get("/emuEnergy", async (req: Request, res: Response) => {
    await stationK.update_emuEnergy()

    res.status(200).json(stationK.emuEnergy)
})

export { router as emuEnergy }
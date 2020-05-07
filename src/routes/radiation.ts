import { Request, Response, Router } from "express"
import { stationC } from "../lib/stations"

const router = Router()

router.get("/radiation", async (req: Request, res: Response) => {
    await stationC.update_Radiation()

    res.status(200).json(stationC.radiation)
})

export { router as radiation }
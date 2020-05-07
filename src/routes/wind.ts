import { Request, Response, Router } from "express"
import { stationK } from "../lib/stations"

const router = Router()

router.get("/wind", async (req: Request, res: Response) => {
    await stationK.update_Wind()

    res.status(200).json(stationK.wind)
})

export { router as wind }


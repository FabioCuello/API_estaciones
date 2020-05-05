import { Request, Response } from "express"
import { stationK, stationC } from "../lib/stations"

export const wind = async (req: Request, res: Response) => {
    await stationK.update_Wind()
    res.status(200).json(stationK.wind)
}
export const emuEnergy = async (req: Request, res: Response) => {
    await stationC.update_emuEnergy()
    res.status(200).json(stationK.emuEnergy)
}
export const radiation = async (req: Request, res: Response) => {
    await stationC.update_Radiation()
    res.status(200).json(stationC.radiation)
}
export const HSP = async (req: Request, res: Response) => {
    await stationC.update_panelEnergy()
    res.status(200).json(stationC.HSP)
}
export const panelEnergy = async (req: Request, res: Response) => {
    await stationC.update_Radiation()
    res.status(200).json(stationC.panelEnergy)
}

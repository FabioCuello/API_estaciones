import { alertControl, getData } from "./index"

interface dataPoints {
    x: number,
    y: number,
    z: any
}


// Create class
class Station {
    // properties
    name: string
    jsonResponse: any
    status: number
    down: boolean
    wind: Array<object>
    radiation: Array<object>
    emuEnergy: number[]
    HSP: number
    panelEnergy: number[]

    constructor(name: string) {
        this.name = name
        this.jsonResponse = 0
        this.status = 0
        this.down = false
        this.wind = []
        this.radiation = []
        this.emuEnergy = [0, 0, 0, 0, 0, 0, 0]
        this.panelEnergy = [0, 0, 0, 0, 0, 0, 0]
        this.HSP = 0
    }

    //methods
    async getData() {
        const { status, jsonResponse } = await getData(this.name)
        this.status = status
        this.jsonResponse = jsonResponse

        // check response status from w.u api
        if (this.status != 200) {
            this.down = true
            return alertControl(this.down, this.name)
        }

        this.down = false
        alertControl(this.down, this.name, this.jsonResponse.observations[this.jsonResponse.observations.length - 1].obsTimeLocal)
    }

    // SECTION: wind
    async update_Wind() {
        if (this.status != 200) return

        const dataPoints: Array<any> = []

        // get wind information
        this.jsonResponse.observations.map((data: any) => {
            let v: number = (data.metric.windspeedAvg) * (10 / 36)
            dataPoints.push({
                x: data.obsTimeLocal,
                y: Number(v.toFixed(3))
            });
        })
        this.wind = dataPoints
    }

    // SECTION: radiation
    async update_Radiation() {
        if (this.status != 200) return

        // get radiation information
        const dataPoints: Array<any> = []
        this.jsonResponse.observations.map((data: any) => {
            dataPoints.push({
                x: data.obsTimeLocal,
                y: data.solarRadiationHigh
            });
        })
        this.radiation = dataPoints
    }

    // SECTION: emuEnergy
    async update_emuEnergy() {

        // Case server down
        if (this.status != 200) return

        const dataPoints: Array<any> = []
        const hoydate: Date = new Date();
        const hoy: number = hoydate.getDay()
        let v: number = 0;
        let power: number = 0;

        this.jsonResponse.observations.map((data: any) => {
            v = (data.metric.windspeedAvg) * (10 / 36)
            if (v < 4 || v > 14) {
                power = 0 + power
            } else {
                power = power + (0.001723483 * (Math.pow(v, 6)) - 0.04935507 * (Math.pow(v, 5)) + 0.01124858 * (Math.pow(v, 4)) + 12.34628 * (Math.pow(v, 3)) - 144.3604 * (Math.pow(v, 2)) + 657.3997 * v - 1038.827) * (5 / 60)
            }
            dataPoints.push({
                x: new Date(data.obsTimeLocal),
                y: Number(v.toFixed(3))
            });
        })

        if (dataPoints.length == 0) return

        power = power / 10
        power = Number(power.toFixed(3))
        if (hoy === 0) {
            this.emuEnergy[0] = power
        }
        if (hoy === 1) {
            this.emuEnergy[1] = power
        }
        if (hoy === 2) {
            this.emuEnergy[2] = power
        }
        if (hoy === 3) {
            this.emuEnergy[3] = power
        }
        if (hoy === 4) {
            this.emuEnergy[4] = power
        }
        if (hoy === 5) {
            this.emuEnergy[5] = power
        }
        if (hoy === 6) {
            this.emuEnergy[6] = power
        }

    }

    // SECTION: panelEnergy
    async update_panelEnergy() {

        // Case server down
        if (this.status != 200) return

        const dataPoints: dataPoints[] = []
        let HSP: number = 0
        this.jsonResponse.observations.map((data: any) => {
            const n: Date = new Date(data.obsTimeLocal)
            dataPoints.push({
                x: n.getHours(),
                y: n.getMinutes(),
                z: data.solarRadiationHigh
            })
        })
        if (dataPoints.length == 0) return

        // Case length != 0
        const hoydate: Date = new Date();
        const areapanel = 1.572;
        const eficiencia = 0.11;
        let m: number[] = []
        let h: number
        let temp: number
        let hoy: number = hoydate.getDay()
        for (let j = 0; j < dataPoints.length - 1; j++) {

            m[j] = dataPoints[j + 1].y - dataPoints[j].y
            // Resta de minutos
            if (m[j] < 0) {

                //Si los minutos son negativos
                h = dataPoints[j + 1].x - 1 //Conversion de la hora para ver el tiempo transcurrido
                temp = dataPoints[j + 1].y + 60;
                h = h - dataPoints[j].x;
                temp = temp - dataPoints[j].y;
                m[j] = h * 60 + temp;
            }

        }

        for (let u = 0; u < m.length; u++) {
            HSP = (HSP + (m[u] * dataPoints[u + 1].z) / 60);
        }

        HSP = HSP / 1000;
        HSP = Number(HSP.toFixed(3));
        this.HSP = HSP;
        const EBC = +(HSP * areapanel * eficiencia * 1000).toFixed(3)

        if (hoy === 0) {
            this.panelEnergy[0] = EBC
        }
        if (hoy === 1) {
            this.panelEnergy[1] = EBC
        }
        if (hoy === 2) {
            this.panelEnergy[2] = EBC
        }
        if (hoy === 3) {
            this.panelEnergy[3] = EBC
        }
        if (hoy === 4) {
            this.panelEnergy[4] = EBC
        }
        if (hoy === 5) {
            this.panelEnergy[5] = EBC
        }
        if (hoy === 6) {
            this.panelEnergy[6] = EBC
        }
    }

}

// Stations objects
const stationK = new Station("IATLNTIC4")
const stationC = new Station("IPUERTOC4")

//updateStations
async function update(): Promise<void> {
    try {
        await stationC.getData()
        await stationK.getData()
        console.log("Data exitosamente actualizada")

    } catch (error) { console.log(error) }
}

export { stationK, stationC, update }
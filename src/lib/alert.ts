import { searchUsers, sendEmail } from "./index"
import { ALERT_TIME } from "../config/index"

// Global Variables that defines the Alert Status of the Stations
let AlertStatusC_On: boolean = false
let AlertStatusK_On: boolean = false

// Send Alert Email in case the station is down 
async function sendAlert(lastTime: number, Estacion: string, Scene: string, cases?: string) {
    let output = "No output"
    const date = new Date(lastTime)
    const subject = "Alerta"
    const receivers = await searchUsers("alerts")

    // Determinates the output message
    if (Scene == "Up") {
        output = `<h2> Estación ${Estacion} activa</h2>
        <h3> Ultimo reporte de la estación sobre las ${date.getHours()}hrs con ${date.getMinutes()}min hora Colombiana  </h3>`;
    }

    if (Scene == "Down" && cases == "A") {
        output = `<h2> Estación ${Estacion} no presentó último reporte</h2>
            <h3> Último reporte registrado sobre a las ${date.getHours()}hrs con ${date.getMinutes()}min hora Colombiana</h3>`;
    }

    if (Scene == "Down" && cases == "B") {
        output = `<h2> Se sobrepasó la capacidad de la llave de la estación ${Estacion}, por lo tanto se ha podido obtener información</h2>`
    }

    sendEmail(subject, receivers, output)
}

// Control alert system
export const alertControl = async (stationDown: boolean, station: string, vartime?: Date): Promise<void> => {
    let AlertStatus_On: boolean
    const timeNow: number = new Date().getTime();

    // Read AlertStatus_On of the station and assign to a new const
    AlertStatus_On = station == "IPUERTOC4" ? AlertStatusC_On : AlertStatusK_On

    if (!stationDown) {
        const lastTime: number = new Date(vartime!).getTime();
        if ((timeNow - lastTime) > +ALERT_TIME && !AlertStatus_On) {
            await sendAlert(lastTime, station, "Down", "A")
            station == "IPUERTOC4" ? AlertStatusC_On = true : AlertStatusK_On = true
        }
        if (timeNow - lastTime < +ALERT_TIME && AlertStatus_On) {
            await sendAlert(lastTime, station, "Up")
            station == "IPUERTOC4" ? AlertStatusC_On = false : AlertStatusK_On = false
        }
    }

    if (stationDown && !AlertStatus_On) {
        await sendAlert(timeNow, station, "Down", "B")
        station == "IPUERTOC4" ? AlertStatusC_On = true : AlertStatusK_On = true
    }
}


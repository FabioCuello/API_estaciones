import fetch from "node-fetch"

interface dataReturn {
    status: number,
    jsonResponse: any
}

export const getData = async (station: string): Promise<dataReturn> => {
    const url: string = `https://api.weather.com/v2/pws/observations/all/1day?stationId=${station}&format=json&units=m&apiKey=${process.env.APIKEY}`
    const response = await fetch(url)
    const status = response.status
    const jsonResponse = status == 200 ? await response.json() : []
    return { status, jsonResponse }
}


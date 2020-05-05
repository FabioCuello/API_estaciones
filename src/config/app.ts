const MINUTEINMILLI = 60000

export const {
    NODE_ENV = "development",
    APP_PORT,
    APP_HOSTNAME = "localhost",
    APP_PROTOCOL = "http",
    ALERT_TIME = MINUTEINMILLI * 30,
    DATA_UPDATE = MINUTEINMILLI * 15
} = process.env

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`

export const IN_PROD = NODE_ENV === "production"
const MINUTEINMILLI = 60000

export const {
    NODE_ENV,
    APP_PORT,
    APP_HOSTNAME,
    APP_PROTOCOL,
    ALERT_TIME = MINUTEINMILLI * 30,
    DATA_UPDATE = MINUTEINMILLI * 1
} = process.env

export const APP_ORIGIN = `${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`

export const IN_PROD = NODE_ENV === "production"
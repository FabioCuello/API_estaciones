import { Schema, model, Document } from "mongoose";

// Interfaces
interface infoDocument extends Document {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}
interface subcriptionsDocument extends Document {
    alerts: boolean,
    newsletter: boolean
}
interface userDocument extends Document {
    data: infoDocument,
    subcriptions: subcriptionsDocument,
    admin: boolean,
    verifiedAt: Date
}
// Schema structures
const infoSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
})
const subscriptionSchema = new Schema({
    alerts: Boolean,
    newsletter: Boolean
})
const userSchema = new Schema({
    data: infoSchema,
    subcriptions: subscriptionSchema,
    admin: {
        type: Boolean,
        default: false
    },
    verifiedAt: Date
})

export const User = model<userDocument>("User", userSchema)
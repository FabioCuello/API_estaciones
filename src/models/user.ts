import { Schema, model, Document } from "mongoose";

// Interfaces
interface infoDocument extends Document {
    fistname: string,
    name: string,
    email: string,
    password: string
}
interface subcriptionsDocument extends Document {
    alert: boolean,
    newsletter: boolean
}
interface userDocument extends Document {
    data: infoDocument,
    subcription: subcriptionsDocument,
    admin: boolean
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
    admin: Boolean
});

export const User = model<userDocument>("User", userSchema)
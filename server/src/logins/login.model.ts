import * as mongoose from 'mongoose';

export const LoginSchema = new mongoose.Schema({
    timestamp: String,
    eventid: Number,
    providername: String,
    description: String,
    ipaddress: String,
    username: String,
});

export interface Login {
    id?: string;
    timestamp: string;
    eventid: number;
    providername: string;
    description?: string;
    ipaddress: string;
    username?: string;
}

export interface LastState {
    id?: string;
    eventid: number;
    timestamp: string;
    prevStateSince: string;
}

export interface LoginMongo extends mongoose.Document {
    id?: string;
    timestamp: string;
    eventid: number;
    providername: string;
    description?: string;
    ipaddress: string;
    username?: string;
}

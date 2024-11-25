import { Schema, Document } from 'mongoose';

export const HotelCodeSchema = new Schema({
    HotelCodes: { type: [Number], required: true },
});

export interface HotelCodeDocument extends Document{
        HotelCodes: number[];
}
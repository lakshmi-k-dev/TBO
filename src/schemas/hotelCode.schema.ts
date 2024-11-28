import { Schema, Document } from 'mongoose';

export const HotelCodeSchema = new Schema({
      Code: { type: Number, required: true },  // Hotel code
      flag: { type: Number, default: 0 }      // Flag, default to 0
  });

export interface HotelCodeDocument extends Document{
        HotelCodes: {
            Code : number,
            flag: number,
        }[];
} 
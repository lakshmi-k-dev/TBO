import { Schema, Document } from 'mongoose';

// export const HotelCodeSchema = new Schema({
//     HotelCodes: { type: [Number], required: true },
//     flag: { type: Number, required: true, default: 0 }
// });

// export const hotelSchema = new Schema({
//     Code: { type: String, required: true },
//     flag: { type: Number, required: true, default: 0 },
// });


// export const HotelCodeSchema = new Schema({
//     HotelCodes: { type: [hotelSchema], required: true },
// });

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
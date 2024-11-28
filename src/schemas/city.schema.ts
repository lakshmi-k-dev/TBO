import { Schema, Document } from 'mongoose';

// Country schema
export const CitySchema = new Schema({
  Code: { type: String, required: true },
  Name: { type: String, required: true },
  flag: { type: Number, required: true, default: 0 },
});

// Status schema
export const StatusSchema = new Schema({
  Code: { type: Number, required: true },
  Description: { type: String, required: true },
});

// Main schema
export const CityStatusSchema = new Schema({
  Status: { type: StatusSchema, required: true },
  CityList: { type: [CitySchema], required: true },
  CountryCode : { type: String, required: true},
  CountryName: { type: String, required: true},  
  flag: { type: Number, required: true, default: 0}, 
});

export interface CityStatus extends Document {
  Status: {
    Code: number;
    Description: string;
  };
  CountryCode: string;
  CountryName: string;
  CityList: {
    Code: string;
    Name: string;
    flag: number;
  }[];
  flag: number;
 
}

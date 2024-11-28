import { Schema, Document } from 'mongoose';

// Country schema
export const CountrySchema = new Schema({
  Code: { type: String, required: true },
  Name: { type: String, required: true },
  flag: { type: Number, required: true, default: 0 }
});

// Status schema
export const StatusSchema = new Schema({
  Code: { type: Number, required: true },
  Description: { type: String, required: true },
});

// Main schema
export const CountryStatusSchema = new Schema({
  Status: { type: StatusSchema, required: true },
  CountryList: { type: [CountrySchema], required: true },
});

export interface CountryStatus extends Document {
  Status: {
    Code: number;
    Description: string;
  };
  CountryList: {
    Code: string;
    Name: string;
    flag: number;
  }[];
}

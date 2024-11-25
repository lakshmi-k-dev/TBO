import { Schema, Document } from 'mongoose';

// Country schema
export const CitySchema = new Schema({
  Code: { type: String, required: true },
  Name: { type: String, required: true },
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
});

export interface CityStatus extends Document {
  Status: {
    Code: number;
    Description: string;
  };
  CityList: {
    Code: string;
    Name: string;
  }[];
}

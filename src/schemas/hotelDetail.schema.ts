import { Schema, Document } from 'mongoose';

// Status schema
export const StatusSchema = new Schema({
  Code: { type: Number, required: true },
  Description: { type: String, required: true },
});

// HotelDetails schema
export const HotelDetailsSchema = new Schema({
  HotelCode: { type: String, required: true },
  HotelName: { type: String, required: true },
  Description: { type: String, required: true },
  HotelFacilities: { type: [String], required: true },  // Array of strings (facilities)
  Attractions: { type: Object, required: true },
  Images: { type: [String], required: true },  // Array of image URLs
  Address: { type: String, required: true },
  PinCode: { type: String, required: true },
  CityId: { type: String, required: true },
  CountryName: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  FaxNumber: { type: String, required: true },
  Map: { type: String, required: true },
  HotelRating: { type: Number, required: true },
  CityName: { type: String, required: true },
  CountryCode: { type: String, required: true },
  CheckInTime: { type: String, required: true },
  CheckOutTime: { type: String, required: true },
});

// Main schema
export const HotelSchema = new Schema({
  Status: { type: StatusSchema, required: true },
  HotelDetails: { type: [HotelDetailsSchema], required: true }, // Array of hotel details
 
});

// Interface for Hotel Document (with TypeScript)
export interface Hotel extends Document {
  Status: {
    Code: number;
    Description: string;
  };    
  HotelDetails: {
    HotelCode: string;
    HotelName: string;
    Description: string;
    HotelFacilities: string[];
    Attractions: string;
  Images: string[]; // Array of image URLs
  Address: object;
  PinCode: string;
  CityId: string;
  CountryName: string;
  PhoneNumber: string;
  FaxNumber: string;
  Map: string;
  HotelRating: number;
  CityName: string;
  CountryCode: string;
  CheckInTime: string;
  CheckOutTime: string;
}
}

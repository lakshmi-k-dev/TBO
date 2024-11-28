import { Schema, Document } from 'mongoose';

// Status schema
export const StatusSchema = new Schema({
    Code: { type: Number, required: true },
    Description: { type: String, required: true },
  });

// HotelDetails schema
export const HotelSchema = new Schema({
    HotelCode: { type: String },
    HotelName: { type: String },
    HotelRating: { type: String },
    Address: { type: String },
    Attractions: { type: [String] },
    CountryName: { type: String },
    CountryCode: { type: String },
    Description: { type: String},  
    FaxNumber: { type: String  },
    HotelFacilities: { type: [String] }, 
    Map: { type: String},
    PhoneNumber: { type: String },
    PinCode: { type: String },
    HotelWebsiteUrl: { type: String},
    CityName: { type: String },
    
})

// Main schema
export const TBOHotelDetailSchema = new Schema({
    Status: { type: StatusSchema, required: true },
    Hotels: { type: [HotelSchema], required: true } // Array of hotel details
   
  });

// Interface for Hotel Document (with TypeScript)
export interface TBOHotelDetails extends Document {
    Status: {
      Code: number;
      Description: string;
    };
    Hotels: {
        HotelCode: string;
        HotelName: string;
        HotelRating : string;
        Address: string;
        Attractions: string[];
        CountryName: string;
        CountryCode: string;
        Description: string;
        FaxNumber: string;
        HotelFacilities: string[];
        Map: string;
        PhoneNumber: string;
        PinCode: string;
        HotelWebsiteUrl: string;
        CityName: string;
    }[];
}
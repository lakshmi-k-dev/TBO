import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { HotelCodeDocument} from '../schemas/hotelCode.schema'
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from '../schemas/hotelDetail.schema'

@Injectable()  
export class HotelService {
    constructor(
    @InjectModel('HotelCode')
    private readonly hotelCodeModel: Model<HotelCodeDocument>,
    @InjectModel('HotelDetail')
    private readonly hotelDetailsModel: Model<Hotel>,
    ){}

    private getBasicAuthHeader(username: string, password: string): string {
        const authValue = `${username}:${password}`;
        return 'Basic ' + Buffer.from(authValue).toString('base64');
      }

    async fetchHotelCode(): Promise<any> {
        const username = 'TBOStaticAPITest';
        const password = 'Tbo@11530818';
    
        const authHeader = this.getBasicAuthHeader(username, password);
    
        try {
          const response = await axios.get(
            'http://api.tbotechnology.in/TBOHolidays_HotelAPI/hotelcodelist',
            {
              headers: {
                Authorization: authHeader,
              },
            },
          );
          //console.log(response)
          const { HotelCodes } = response.data;
          const hotelCode = new this.hotelCodeModel({
            HotelCodes
            
          });
    
          // Save the document to MongoDB
          return await hotelCode.save();
         
        } catch (error) {
          throw new Error('Failed to fetch data with Basic Auth');
        }
      }

      async fetchHotelDetail(body: any): Promise<any> {
        const username = 'TBOStaticAPITest';
        const password = 'Tbo@11530818';
    
        const authHeader = this.getBasicAuthHeader(username, password);
        const data = {
          Hotelcodes: body.Hotelcodes,
          Language: body.Language,
        };
    
        try {
          const response = await axios.post(
            'http://api.tbotechnology.in/TBOHolidays_HotelAPI/Hoteldetails',
            data,
            {
              headers: {
                Authorization: authHeader,
              },
            },
          );
          console.log('LAKSHMI',response.data)
          const { Status, HotelDetails } = response.data;
          const hotelDetail = new this.hotelDetailsModel({
            Status, 
            HotelDetails
            
          });
    
          // Save the document to MongoDB
          return await hotelDetail.save();
        } catch (error) {   
          throw new Error('Failed to create data with Basic Auth');
        }
      }
      
      async getHotelCode(): Promise<HotelCodeDocument[]>{
        return this.hotelCodeModel.find().exec();
      } 

      async getHotelDetails(): Promise<Hotel[]>{
        return this.hotelDetailsModel.find().exec();
      }

}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { CountryStatus } from '../schemas/country.schema';
import { CityStatus } from '../schemas/city.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
const { MongoClient } = require('mongodb');
import { TBOHotelDetails } from '../schemas/tboHotelDetail.schema';
import { Hotel } from '../schemas/hotelDetail.schema'
const username = 'TBOStaticAPITest';
const password = 'Tbo@11530818';

@Injectable()
export class CountryStatusService {
  constructor(
    @InjectModel('CountryStatus')
    private readonly countryStatusModel: Model<CountryStatus>,
    @InjectModel('CityStatus')
    private readonly cityStatusModel: Model<CityStatus>,
    @InjectModel('HotelDetail')
    private readonly hotelDetailsModel: Model<Hotel>,
    @InjectModel('TBOHotelDetail')
    private readonly tboHotelDetailModel: Model<TBOHotelDetails>,

  ) {}

    private getBasicAuthHeader(username: string, password: string): string {
      const authValue = `${username}:${password}`;
      return 'Basic ' + Buffer.from(authValue).toString('base64');
    }
  // Fetch data from third-party API and save it to MongoDB
  async fetchAndSaveCountry(): Promise<CountryStatus> {
    const authHeader = this.getBasicAuthHeader(username, password);
    try {
      const response = await axios.get(
        'http://api.tbotechnology.in/TBOHolidays_HotelAPI/CountryList',
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );

      const { Status, CountryList } = response.data;

      // Create a new document with the fetched data
      const countryStatus = new this.countryStatusModel({
        Status,
        CountryList,
      });

      // Save the document to MongoDB
      return await countryStatus.save();
    } catch (error) {
      throw new Error('Error fetching country status data');
    }
  }

  async fetchAndSaveCity(body:any): Promise<CityStatus> {
    const authHeader = this.getBasicAuthHeader(username, password);
    const data = {
      CountryCode: body.CountryCode,
    };
    try {
      const response = await axios.post(
        'http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList',
        data,
        {
          headers: {
            Authorization: authHeader,
          },
        },
      );

      const { Status, CityList } = response.data;

      // Create a new document with the fetched data
      const cityStatus = new this.cityStatusModel({
        Status,
        CityList,
      });

      // Save the document to MongoDB
      return await cityStatus.save();
    } catch (error) {
      throw new Error('Error fetching country status data');
    }
  }

  // Optionally, you can create a method to fetch data from DB as well
  async getCountryList() {

//     var MongoClient = require('mongodb').MongoClient;
//     var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("nest1");
//   const output = dbo.collection("countrystatus").find( function(err, result) {
//     if (err) throw err;
//     console.log('RESULT',result);
//     db.close();
//   });
//   console.log('OUTPUT',output)
// });
    const authHeader = this.getBasicAuthHeader(username, password);
    const documents =  await this.countryStatusModel.find({}, {flag: 0});
    console.log('RESULT', documents)
    for(let i = 0 ; i < documents.length; i++){
      const doc = documents[i];
      console.log('dddd',doc)
      const res = doc.CountryList.forEach(async country => {
        if(country.flag === 0){
          console.log(country.Code)
          const data = {
            CountryCode : country.Code
          }
          const CountryCode = country.Code;
          const CountryName = country.Name;
          console.log('ggggggggg',CountryCode)
          console.log('kkkkkk',CountryName)
          const response =  axios.post(
            'http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList',
             data,
              {
               headers: {
                      Authorization: authHeader,
                    },
                }
                )
          
                const { Status, CityList } = (await response).data;
          console.log('tttttt', (await response).data)
                // Create a new document
                const cityStatus = new this.cityStatusModel({
                  Status,
                  CityList,
                  CountryCode,
                  CountryName,
                });
               // Save the document to MongoDB
                await cityStatus.save();

        }
      });
      {    
     
      
      // const dd = doc.CountryList.forEach(country => {
      //   console.log(`Country Code: ${country.Code}`);
       // try {
            const response = await axios.post(
            'http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList',
             res,
              {
               headers: {
                      Authorization: authHeader,
                    },
                }
                )
                
                const { Status, CityList } = response.data;
          
                // Create a new document
                const cityStatus = new this.cityStatusModel({
                  Status,
                  CityList,
                });
               // Save the document to MongoDB
                await cityStatus.save();
                console.log('Saved successfully')
     // } 
      // catch (error) {
      //    throw new Error('Error fetching country status data');
      //   }
  }
   
}
}
  async getList(): Promise<any>{
    const result = await this.countryStatusModel.findOne().exec();
    const country = result.CountryList.find(c => c.flag === 0);
    const CountryCode = country.Code;
    const CountryName = country.Name;
    const flag = 0
    const authHeader = this.getBasicAuthHeader(username, password);
    const data = {
        CountryCode: country.Code
      }
      try {
          const response = await axios.post(
          'http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList',
          data,
          {
            headers: {
              Authorization: authHeader,
            },
          },
        );
        console.log(response.data)
        const { Status, CityList } = response.data;
  
        // Create a new document with the fetched data
        const cityStatus = new this.cityStatusModel({
          Status,
          CityList,
          CountryCode,
          CountryName,
          flag,
          
        });
        // Save the document to MongoDB
        const dataRes = await cityStatus.save();
        await this.updateCountryFlag(CountryCode);
        return dataRes;
      } catch (error) {
        throw new Error('Error fetching country status data');
      }
  }

  private async updateCountryFlag( countryCode: string): Promise<void> {
    // Find the country in the CountryList array and update its flag to 1
    await this.countryStatusModel.updateOne(
      {'CountryList.Code': countryCode },
      { $set: { 'CountryList.$.flag': 1 } }  // Using the positional operator to update the specific country's flag
    ).exec();
  }

  private async updateCityFlag( cityCode: string): Promise<void> {
    // Find the country in the CountryList array and update its flag to 1
    await this.cityStatusModel.updateOne(
      {'CityList.Code': cityCode },
      { $set: { 'CityList.$.flag': 1 } }  // Using the positional operator to update the specific country's flag
    ).exec();
  }
  private async updateFlag( countryCode: string): Promise<void> {
    // Find the country in the CountryList array and update its flag to 1
    await this.cityStatusModel.updateOne(
      {'CountryCode': countryCode },
      { $set: { 'flag': 1 } }  // Using the positional operator to update the specific country's flag
    ).exec();
  }

  async getTBOCityList(): Promise<any> {
      const result = await this.cityStatusModel.findOne({ flag: 0 }).exec();
      const cityRes = result.CityList.find(city => city.flag === 0);
      //console.log(cityRes.Code)
      if(!cityRes){
        await this.updateFlag(result.CountryCode);
      }
      const dataInput = {
        CityCode: cityRes.Code,
        IsDetailedResponse: "true"
      }
      const CityCode = cityRes.Code;
      const CountryName = cityRes.Name;
      
      const authHeader = this.getBasicAuthHeader(username, password);
      try {
        const response = await axios.post(
          'http://api.tbotechnology.in/TBOHolidays_HotelAPI/TBOHotelCodeList',
          dataInput,
          {
            headers: {
              Authorization: authHeader,
            },
          },
        );
        const { Status, Hotels } = response.data;
        console.log(response.data)
        const tbohotelDetails = new this.tboHotelDetailModel({
          Status, 
          Hotels
          
        });
        //console.log('tbohotelDetails', tbohotelDetails)
        // Save the document to MongoDB
        await this.updateCityFlag(CityCode);
        return await tbohotelDetails.save();
      } catch (error) {  
        console.log('ERROR', error) 
        throw new Error('Failed to insert record');
      }
    }

    async getTBOHotelCodes(): Promise<any> {
      // const transformedHotelCodes = hotelCodes.map((code) => ({
      //   Code: code,
      //   flag: 0,
      // }));
      
      const result = await this.hotelDetailsModel.findOne().exec();
    }

    async getCityListFromDB(): Promise<CityStatus[]> {
      return this.cityStatusModel.find().exec();
    }

    async getCountryListFromDB(): Promise<CountryStatus[]> {
      return this.countryStatusModel.find().exec();
    }
    
  }


 


//   @Cron(CronExpression.EVERY_10_MINUTES)
//   // Step 1: Find documents with flag = 0
//   async getCountry() {
//     const documents =  await this.countryStatusModel.find().exec();
//     console.log('DOCUMENTS', documents)
//   // Step 2: Fetch data from the third-party API for each document
//   for (const doc of documents) {
//     try {
//         //async fetchAndSaveCity(body:any): Promise<CityStatus> {
//         const username = 'TBOStaticAPITest';
//         const password = 'Tbo@11530818';
    
//         const authHeader = this.getBasicAuthHeader(username, password);
//         const data = {    
//           Code: 'IN',
//         };
//         try {
//           const response = await axios.post(
//             'http://api.tbotechnology.in/TBOHolidays_HotelAPI/CityList',
//             data,
//             {
//               headers: {
//                 Authorization: authHeader,
//               },
//             },
//           );
    
//           const { Status, CityList } = response.data;
    
//           // Create a new document
//           const cityStatus = new this.cityStatusModel({
//             Status,
//             CityList,
//           });
          
          
//           // Save the document to MongoDB
//           await cityStatus.save();
//           console.log('Saved successfully')
//         } 
//         catch (error) {
//           throw new Error('Error fetching country status data');
//         }
//       //}
//   }
//   catch (error) {
//     throw new Error('Error fetching country status data');
//   }
// }
//}




//Promise<CountryStatus[]>



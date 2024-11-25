import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { CountryStatus } from '../schemas/country.schema';
import { CityStatus } from '../schemas/city.schema';

@Injectable()
export class CountryStatusService {
  constructor(
    @InjectModel('CountryStatus')
    private readonly countryStatusModel: Model<CountryStatus>,
    @InjectModel('CityStatus')
    private readonly cityStatusModel: Model<CityStatus>,

  ) {}

    private getBasicAuthHeader(username: string, password: string): string {
      const authValue = `${username}:${password}`;
      return 'Basic ' + Buffer.from(authValue).toString('base64');
    }
  // Fetch data from third-party API and save it to MongoDB
  async fetchAndSaveCountry(): Promise<CountryStatus> {
    const username = 'TBOStaticAPITest';
    const password = 'Tbo@11530818';

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
    const username = 'TBOStaticAPITest';
    const password = 'Tbo@11530818';

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
  async getCountryList(): Promise<CountryStatus[]> {
    return this.countryStatusModel.find().exec();
  }

  async getCityList(): Promise<CityStatus[]> {
    return this.cityStatusModel.find().exec();
  }
}

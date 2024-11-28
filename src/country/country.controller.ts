import { Controller, Get, Post, Body } from '@nestjs/common';
import { CountryStatusService } from './country.service';

@Controller()
export class CountryStatusController {
  constructor(private readonly countryStatusService: CountryStatusService) {}

  //Country Master data
  @Get('country')
  async fetchCountryList(): Promise<any> {
    return this.countryStatusService.fetchAndSaveCountry();
  } 

  //API for cron to store city list based on country code
  @Get('getCityList')
  async getCountryStatus(): Promise<any> {
    return this.countryStatusService.getList();
  }

  //API for cron to store hotel details based on city code
  @Get('getHotelsForCity')
  async getTBOCityList() : Promise<any> {
    return this.countryStatusService.getTBOCityList();
  }

  @Post('city')
    async fetchCityList(@Body() body: any): Promise<any> {
      return this.countryStatusService.fetchAndSaveCity(body);
    }

 //Get the saved city list from mongodb
  @Get('getCityListFromDB')
    async getCityListFromDB() : Promise<any> {
      return this.countryStatusService.getCityListFromDB();
    }

  //Get the saved country list from mongodb
  @Get('getCountryListFromDB')
    async getCountryListFromDB() : Promise<any> {
      return this.countryStatusService.getCountryListFromDB();
    }
}
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CountryStatusService } from './country.service';

@Controller()
export class CountryStatusController {
  constructor(private readonly countryStatusService: CountryStatusService) {}

  // Fetch and store data from third-party API for city & country
  @Get('country')
  async fetchCountryList(): Promise<any> {
    return this.countryStatusService.fetchAndSaveCountry();
  } 

  @Post('city')
  async fetchCityList(@Body() body: any): Promise<any> {
    return this.countryStatusService.fetchAndSaveCity(body);
  }
  // Get the saved country list from mongodb
  @Get('getCountryList')
  async getCountryStatus(): Promise<any> {
    return this.countryStatusService.getCountryList();
  }

  // Get the saved city list and city list from mongodb
  @Get('getCityList')
  async getCityList() : Promise<any> {
    return this.countryStatusService.getCityList();
  }
}
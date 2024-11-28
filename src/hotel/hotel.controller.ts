import { Controller, Get, Post, Body } from '@nestjs/common';
import { HotelService } from './hotel.service';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('hotelCode')
  async getHotelCode(): Promise<any>  {
    return this.hotelService.fetchHotelCode();
  }

  @Post('hotelDetails')
  async hotelDetails(@Body() body: any) {
    return this.hotelService.fetchHotelDetail(body);
  }

  @Post('TBOHotelCodeList')
  async TBOHotelCodeList(@Body() body: any) : Promise<any> {
    return this.hotelService.TBOHotelCodeList(body);
  }

   // Get the saved hotel codes from mongodb
   @Get('getHotelCodes')
   async hotelCodes(): Promise<any>{
    return this.hotelService.getHotelCode();
   }

   // Get the saved hotel details from mongodb
   @Get('getHotelDetails')
   async gethotelDetails(): Promise<any>{   
    return this.hotelService.getHotelDetails();
   }
}

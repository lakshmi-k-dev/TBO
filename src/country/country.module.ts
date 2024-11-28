import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryStatusController } from './country.controller';
import { CountryStatusService } from './country.service'
import { CountryStatusSchema } from '../schemas/country.schema';
import { CityStatusSchema } from '../schemas/city.schema';
import { TBOHotelDetailSchema } from '../schemas/tboHotelDetail.schema';
import { HotelCodeSchema } from '../schemas/hotelCode.schema';
import { HotelSchema } from '../schemas/hotelDetail.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CountryStatus', schema: CountryStatusSchema },
      { name: 'CityStatus', schema: CityStatusSchema },
      { name: 'TBOHotelDetail', schema: TBOHotelDetailSchema },
      { name: 'HotelCode', schema: HotelCodeSchema },
      { name: 'HotelDetail', schema: HotelSchema },

    ]),
  ],
  controllers: [CountryStatusController],
  providers: [CountryStatusService],
})
export class CountryStatusModule {}

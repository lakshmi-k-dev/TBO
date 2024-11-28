import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { HotelCodeSchema } from '../schemas/hotelCode.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelCodeDocument } from '../schemas/hotelCode.schema';
import { HotelSchema } from '../schemas/hotelDetail.schema';
import { TBOHotelDetailSchema } from '../schemas/tboHotelDetail.schema';
@Module({   
  imports: [
    MongooseModule.forFeature([
      { name: 'HotelCode', schema: HotelCodeSchema },
      { name: 'HotelDetail', schema: HotelSchema },
      { name: 'TBOHotelDetail', schema: TBOHotelDetailSchema }
    ])  
  ],
  controllers: [HotelController],
  providers: [HotelService],
})  
export class HotelModule {}

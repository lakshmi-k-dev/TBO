import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryStatusController } from './country.controller';
import { CountryStatusService } from './country.service'
import { CountryStatusSchema } from '../schemas/country.schema';
import { CityStatusSchema } from '../schemas/city.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'CountryStatus', schema: CountryStatusSchema },
      { name: 'CityStatus', schema: CityStatusSchema }

    ]),
  ],
  controllers: [CountryStatusController],
  providers: [CountryStatusService],
})
export class CountryStatusModule {}

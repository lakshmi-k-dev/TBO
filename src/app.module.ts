import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryStatusModule } from './country/country.module';
import { HotelModule } from './hotel/hotel.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest1'),  // Replace with your MongoDB URI
    CountryStatusModule, HotelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

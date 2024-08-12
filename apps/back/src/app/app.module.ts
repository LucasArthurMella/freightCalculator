import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FreightSimulationModule } from './../freight-simulation/freight-simulation.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogisticsOperatorModule } from './../logistics-operator/logistics-operator.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from './config/config';
import { GeocodingModule } from 'src/geocoding/geocoding.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configSecret: ConfigService) => ({
        uri: configSecret.get('mongoUri'),
      }),
    }),
    FreightSimulationModule, 
    LogisticsOperatorModule, 
    GeocodingModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

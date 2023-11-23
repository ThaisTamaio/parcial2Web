import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AerolineaEntity } from './aerolinea/aerolinea.entity';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { AeropuertoEntity } from './aeropuerto/aeropuerto.entity';
import { AerolineaAeropuertoController } from './aerolinea/aerolinea-aeropuerto.controller';


@Module({
  imports: [
    AerolineaModule,
    AeropuertoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        AerolineaEntity,
        AeropuertoEntity,
        //TODO Agregar Entities
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController, AerolineaAeropuertoController],
  providers: [AppService],
})
export class AppModule {}

import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AerolineaModule } from '../aerolinea/aerolinea.module';
import { AeropuertoController } from './aeropuerto.controller'; // Importa AeropuertoController

@Module({
  imports: [
    TypeOrmModule.forFeature([AeropuertoEntity]),
    forwardRef(() => AerolineaModule),
  ],
  providers: [AeropuertoService],
  controllers: [AeropuertoController], // Agrega esta línea para incluir el controlador
  exports: [TypeOrmModule.forFeature([AeropuertoEntity]), AeropuertoService]
})
export class AeropuertoModule {}

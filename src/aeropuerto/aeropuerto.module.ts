import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AerolineaModule } from '../aerolinea/aerolinea.module'; // Ajusta la ruta según sea necesario

@Module({
  imports: [
    TypeOrmModule.forFeature([AeropuertoEntity]),
    forwardRef(() => AerolineaModule), // Importación con forwardRef
  ],
  providers: [AeropuertoService],
  exports: [TypeOrmModule.forFeature([AeropuertoEntity]), AeropuertoService] // Asegúrate de que solo estén los proveedores/módulos que sean parte de AeropuertoModule
})
export class AeropuertoModule {}

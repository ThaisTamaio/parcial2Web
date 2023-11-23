import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity';
import { AeropuertoModule } from '../aeropuerto/aeropuerto.module'; // Ajusta la ruta según sea necesario

@Module({
  imports: [
    TypeOrmModule.forFeature([AerolineaEntity]),
    forwardRef(() => AeropuertoModule), // Importación con forwardRef
  ],
  providers: [AerolineaService],
  exports: [TypeOrmModule.forFeature([AerolineaEntity]), AerolineaService] // Eliminada la exportación de AeropuertoModule
})
export class AerolineaModule {}

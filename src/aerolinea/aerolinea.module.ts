import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaService } from './aerolinea.service';
import { AerolineaEntity } from './aerolinea.entity';
import { AeropuertoModule } from '../aeropuerto/aeropuerto.module';
import { AerolineaController } from './aerolinea.controller'; // Asegúrate de importar AerolineaController

@Module({
  imports: [
    TypeOrmModule.forFeature([AerolineaEntity]),
    forwardRef(() => AeropuertoModule),
  ],
  providers: [AerolineaService],
  controllers: [AerolineaController],
  exports: [TypeOrmModule.forFeature([AerolineaEntity]), AerolineaService]
})
export class AerolineaModule {}
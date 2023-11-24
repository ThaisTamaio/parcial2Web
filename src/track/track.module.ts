import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';
import { AlbumModule } from '../album/album.module';
import { TrackController } from './track.controller'; // Importa TrackController

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    forwardRef(() => AlbumModule),
  ],
  providers: [TrackService],
  controllers: [TrackController], // Agrega esta línea para incluir el controlador
  exports: [TypeOrmModule.forFeature([TrackEntity]), TrackService]
})
export class TrackModule {}

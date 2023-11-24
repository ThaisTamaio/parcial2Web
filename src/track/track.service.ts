import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackDto } from './track.dto';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private trackRepository: Repository<TrackEntity>,
        @InjectRepository(AlbumEntity)
        private albumRepository: Repository<AlbumEntity>, // Inyectar el repositorio de Album
    ) {}

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({ relations: ['albumes'] });
    }

    async findOne(id: string): Promise<TrackEntity> {
        const track = await this.trackRepository.findOne({ 
            where: { id }, 
            relations: ['albumes'] 
        });
    
        if (!track) {
            throw new NotFoundException(`Track con ID ${id} no encontrado.`);
        }
    
        return track;
    }    

    async create(trackDto: TrackDto): Promise<TrackEntity> {   
        // Validar que la duración sea un número positivo
        if (trackDto.duracion <= 0) {
            throw new BadRequestException('La duración del track debe ser un número positivo.');
        }
    
        // Verificar si el álbum asociado existe
        const album = await this.albumRepository.findOne({ where: { id: trackDto.albumId } });
        if (!album) {
            throw new NotFoundException(`Álbum con ID ${trackDto.albumId} no encontrado.`);
        }
    
        const track = new TrackEntity();
        // Asignar el álbum al track
        track.album = album;
        Object.assign(track, trackDto);
        return await this.trackRepository.save(track);
    }
    
}
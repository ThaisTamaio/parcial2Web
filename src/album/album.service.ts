import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity} from '../track/track.entity';
import { AlbumDto } from './album.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private albumRepository: Repository<AlbumEntity>,
        @InjectRepository(PerformerEntity)
        private performerRepository: Repository<PerformerEntity>,
        @InjectRepository(TrackEntity)
        private trackRepository: Repository<TrackEntity>,
    ) {}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ 
            relations: ['performers', 'tracks'] 
        });
    }

    async findOne(id: string): Promise<AlbumEntity> {
        const album = await this.albumRepository.findOne({ 
            where: { id }, 
            relations: ['performers', 'tracks'] 
        });
    
        if (!album) {
            throw new NotFoundException(`Album con ID ${id} no encontrada.`);
        }
    
        return album;
    }    

    async create(albumDto: AlbumDto): Promise<AlbumEntity> {
        // Validar que el nombre y la descripción no estén vacíos
        if (!albumDto.nombre || albumDto.nombre.trim() === '') {
            throw new BadRequestException('El nombre del álbum no puede estar vacío.');
        }
        if (!albumDto.descripcion || albumDto.descripcion.trim() === '') {
            throw new BadRequestException('La descripción del álbum no puede estar vacía.');
        }

        const album = new AlbumEntity();
        Object.assign(album, albumDto);
        return await this.albumRepository.save(album);
    }

    async delete(id: string): Promise<void> {
        const album = await this.albumRepository.findOne({ 
            where: { id }, 
            relations: ['tracks'] 
        });
    
        if (!album) {
            throw new NotFoundException(`Album con ID ${id} no encontrada.`);
        }

        if (album.tracks && album.tracks.length > 0) {
            throw new BadRequestException('No se puede eliminar un álbum con tracks asociados.');
        }
    
        await this.albumRepository.delete(id);
    }

    async updateAlbumTracks(albumId: string, newTracks: TrackEntity[]): Promise<AlbumEntity> {
        // Encontrar el álbum por ID
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ['tracks']
        });
    
        if (!album) {
            throw new NotFoundException(`Album con ID ${albumId} no encontrado.`);
        }
    
        // Actualizar los tracks del álbum
        album.tracks = newTracks;
        
        // Guardar los cambios en el álbum
        return await this.albumRepository.save(album);
    }

    async updateAlbumPerformers(albumId: string, newPerformers: PerformerEntity[]): Promise<AlbumEntity> {
        // Encontrar el álbum por ID
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ['performers']
        });
    
        if (!album) {
            throw new NotFoundException(`Album con ID ${albumId} no encontrado.`);
        }
    
        // Actualizar los performers del álbum
        album.performers = newPerformers;
        
        // Guardar los cambios en el álbum
        return await this.albumRepository.save(album);
    }    

    //Asociacion
    async addPerformerToAlbum(albumId: string, performerId: string): Promise<AlbumEntity> {
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ['performers']
        });
        if (!album) throw new NotFoundException('Album no encontrada.');
    
        const performer = await this.performerRepository.findOne({
            where: { id: performerId }
        });
        if (!performer) throw new NotFoundException('Performer no encontrado.');
    
        // Verificar si el álbum ya tiene tres performers asociados
        if (album.performers.length >= 3) {
            throw new BadRequestException('Un álbum no puede tener más de tres performers asociados.');
        }
    
        album.performers.push(performer);
        return this.albumRepository.save(album);
    }
}

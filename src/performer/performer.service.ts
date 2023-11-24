import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { AlbumEntity } from '../album/album.entity';
import { PerformerDto } from './performer.dto';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private performerRepository: Repository<PerformerEntity>,
        @InjectRepository(AlbumEntity)
        private albumRepository: Repository<AlbumEntity>, // Inyectar el repositorio de Album
    ) {}

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find({ relations: ['albumes'] });
    }

    async findOne(id: string): Promise<PerformerEntity> {
        const performer = await this.performerRepository.findOne({ 
            where: { id }, 
            relations: ['albumes'] 
        });
    
        if (!performer) {
            throw new NotFoundException(`Performer con ID ${id} no encontrado.`);
        }
    
        return performer;
    }    

    async create(performerDto: PerformerDto): Promise<PerformerEntity> {    
        // Nueva validación para la descripción del performer
        if (performerDto.descripcion && performerDto.descripcion.length > 100) {
            throw new BadRequestException('La descripción del performer no puede exceder los 100 caracteres.');
        }
    
        const performer = new PerformerEntity();
        Object.assign(performer, performerDto);
        return await this.performerRepository.save(performer);
    }

}
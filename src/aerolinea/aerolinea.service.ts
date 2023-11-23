import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';

@Injectable()
export class AerolineaService {
    constructor(
        @InjectRepository(AerolineaEntity)
        private aerolineaRepository: Repository<AerolineaEntity>,
    ) {}

    async findAll(): Promise<AerolineaEntity[]> {
        return await this.aerolineaRepository.find({ 
            relations: ['aeropuertos'] 
        });
    }

    async findOne(id: string): Promise<AerolineaEntity> {
        return await this.aerolineaRepository.findOne({ 
            where: { id }, 
            relations: ['aeropuertos'] 
        });
    }

    async create(aerolinea: AerolineaEntity): Promise<AerolineaEntity> {
        if (new Date(aerolinea.fechaFundacion) >= new Date()) {
            throw new BadRequestException('La fecha de fundación debe ser en el pasado.');
        }
        return await this.aerolineaRepository.save(aerolinea);
    }

    async update(id: string, aerolinea: Partial<AerolineaEntity>): Promise<AerolineaEntity> {
        const existingAerolinea = await this.aerolineaRepository.findOne({ where: { id } });
        if (!existingAerolinea) {
            throw new BadRequestException('Aerolinea no encontrada.');
        }
        if (aerolinea.fechaFundacion && new Date(aerolinea.fechaFundacion) >= new Date()) {
            throw new BadRequestException('La fecha de fundación debe ser en el pasado.');
        }
        return await this.aerolineaRepository.save({ ...existingAerolinea, ...aerolinea });
    }    

    async delete(id: string): Promise<void> {
        await this.aerolineaRepository.delete(id);
    }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';

@Injectable()
export class AeropuertoService {
    constructor(
        @InjectRepository(AeropuertoEntity)
        private aeropuertoRepository: Repository<AeropuertoEntity>,
    ) {}

    async findAll(): Promise<AeropuertoEntity[]> {
        return await this.aeropuertoRepository.find({ relations: ['aerolineas'] });
    }

    async findOne(id: string): Promise<AeropuertoEntity> {
        return await this.aeropuertoRepository.findOne({ where: { id }, relations: ['aerolineas'] });
    }

    async create(aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity> {
        if (aeropuerto.codigo.length !== 3) {
            throw new BadRequestException('El código del aeropuerto debe tener exactamente tres caracteres.');
        }
        return await this.aeropuertoRepository.save(aeropuerto);
    }

    async update(id: string, aeropuerto: Partial<AeropuertoEntity>): Promise<AeropuertoEntity> {
        const existingAeropuerto = await this.aeropuertoRepository.findOne({ where: { id } });
        if (!existingAeropuerto) {
            throw new BadRequestException('Aeropuerto no encontrado.');
        }
        if (aeropuerto.codigo && aeropuerto.codigo.length !== 3) {
            throw new BadRequestException('El código del aeropuerto debe tener exactamente tres caracteres.');
        }
        return await this.aeropuertoRepository.save({ ...existingAeropuerto, ...aeropuerto });
    }

    async delete(id: string): Promise<void> {
        await this.aeropuertoRepository.delete(id);
    }
}
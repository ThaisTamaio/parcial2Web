import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

@Injectable()
export class AerolineaService {
    constructor(
        @InjectRepository(AerolineaEntity)
        private aerolineaRepository: Repository<AerolineaEntity>,
        @InjectRepository(AeropuertoEntity)
        private aeropuertoRepository: Repository<AeropuertoEntity>, // Inyectar el repositorio de Aeropuerto
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

    //Asociacion

    async addAirportToAirline(aerolineaId: string, aeropuertoId: string): Promise<AerolineaEntity> {
        const aerolinea = await this.aerolineaRepository.findOne({
            where: { id: aerolineaId },
            relations: ['aeropuertos']
        });
        if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada.');
    
        const aeropuerto = await this.aeropuertoRepository.findOne({
            where: { id: aeropuertoId }
        });
        if (!aeropuerto) throw new NotFoundException('Aeropuerto no encontrado.');
    
        aerolinea.aeropuertos.push(aeropuerto);
        return this.aerolineaRepository.save(aerolinea);
    }    
    
    async findAirportsFromAirline(aerolineaId: string): Promise<AeropuertoEntity[]> {
        const aerolinea = await this.aerolineaRepository.findOne({where: {id: aerolineaId}, relations: ['aeropuertos']});
        if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada.');
    
        return aerolinea.aeropuertos;
    }
    
    async updateAirportsFromAirline(aerolineaId: string, aeropuertosIds: string[]): Promise<AerolineaEntity> {
        const aerolinea = await this.aerolineaRepository.findOne({where: {id: aerolineaId}, relations: ['aeropuertos']});
        if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada.');
    
        const aeropuertos = await this.aeropuertoRepository.findByIds(aeropuertosIds);
        aerolinea.aeropuertos = aeropuertos;
    
        return this.aerolineaRepository.save(aerolinea);
    }
    
    async deleteAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<AerolineaEntity> {
        const aerolinea = await this.aerolineaRepository.findOne({where: {id: aerolineaId}, relations: ['aeropuertos']});
        if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada.');
    
        aerolinea.aeropuertos = aerolinea.aeropuertos.filter(aero => aero.id !== aeropuertoId);
    
        return this.aerolineaRepository.save(aerolinea);
    }
}

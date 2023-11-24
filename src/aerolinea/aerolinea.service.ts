import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AerolineaDto } from './aerolinea.dto';

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
        const aerolinea = await this.aerolineaRepository.findOne({ 
            where: { id }, 
            relations: ['aeropuertos'] 
        });
    
        if (!aerolinea) {
            throw new NotFoundException(`Aerolinea con ID ${id} no encontrada.`);
        }
    
        return aerolinea;
    }    

    async create(aerolineaDto: AerolineaDto): Promise<AerolineaEntity> {
        if (new Date(aerolineaDto.fechaFundacion) >= new Date()) {
            throw new BadRequestException('La fecha de fundación debe ser en el pasado.');
        }

        const aerolinea = new AerolineaEntity();
        Object.assign(aerolinea, aerolineaDto);
        return await this.aerolineaRepository.save(aerolinea);
    }

    async update(id: string, aerolineaDto: Partial<AerolineaDto>): Promise<AerolineaEntity> {
        const existingAerolinea = await this.aerolineaRepository.findOne({ where: { id } });
    
        if (!existingAerolinea) {
            throw new NotFoundException(`Aerolinea con ID ${id} no encontrada.`);
        }
    
        if (aerolineaDto.fechaFundacion && new Date(aerolineaDto.fechaFundacion) >= new Date()) {
            throw new BadRequestException('La fecha de fundación debe ser en el pasado.');
        }
    
        Object.assign(existingAerolinea, aerolineaDto);
        return await this.aerolineaRepository.save(existingAerolinea);
    }    

    async delete(id: string): Promise<void> {
        const aerolinea = await this.aerolineaRepository.findOne({ where: { id } });
    
        if (!aerolinea) {
            throw new NotFoundException(`Aerolinea con ID ${id} no encontrada.`);
        }
    
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
    
    async updateAirportsFromAirline(aerolineaId: string, aeropuertosData: any): Promise<AerolineaEntity> {
        const aeropuertosIds = Array.isArray(aeropuertosData) ? aeropuertosData : aeropuertosData.aeropuertosIds;

        // Verificar si la aerolínea existe
        const aerolinea = await this.aerolineaRepository.findOne({ where: { id: aerolineaId } });
        if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada.');
    
        // Verificar si cada aeropuerto existe
        const aeropuertosExistentes = [];
        for (const aeropuertoId of aeropuertosIds) {
            const aeropuerto = await this.aeropuertoRepository.findOne({ where: { id: aeropuertoId } });
            if (aeropuerto) {
                aeropuertosExistentes.push(aeropuerto);
            }
        }
    
        // Si no se encuentra al menos un aeropuerto, lanzar una excepción
        if (aeropuertosExistentes.length === 0) {
            throw new NotFoundException('Ninguno de los aeropuertos proporcionados fue encontrado.');
        }
    
        // Asociar solo los aeropuertos encontrados a la aerolínea
        aerolinea.aeropuertos = aeropuertosExistentes;
        return await this.aerolineaRepository.save(aerolinea);
    }    
    
    async deleteAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<AerolineaEntity> {
        const aerolinea = await this.aerolineaRepository.findOne({where: {id: aerolineaId}, relations: ['aeropuertos']});
        if (!aerolinea) throw new NotFoundException('Aerolinea no encontrada.');
    
        aerolinea.aeropuertos = aerolinea.aeropuertos.filter(aero => aero.id !== aeropuertoId);
    
        return this.aerolineaRepository.save(aerolinea);
    }

    async findAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<AeropuertoEntity> {
        const aerolinea = await this.aerolineaRepository.findOne({ 
            where: { id: aerolineaId },
            relations: ['aeropuertos']
        });
        if (!aerolinea) {
            throw new NotFoundException('Aerolinea no encontrada.');
        }

        const aeropuerto = aerolinea.aeropuertos.find(aero => aero.id === aeropuertoId);
        if (!aeropuerto) {
            throw new NotFoundException('Aeropuerto no encontrado en la aerolínea.');
        }

        return aeropuerto;
    }
}

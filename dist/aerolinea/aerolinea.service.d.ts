import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
import { AerolineaDto } from './aerolinea.dto';
export declare class AerolineaService {
    private aerolineaRepository;
    private aeropuertoRepository;
    constructor(aerolineaRepository: Repository<AerolineaEntity>, aeropuertoRepository: Repository<AeropuertoEntity>);
    findAll(): Promise<AerolineaEntity[]>;
    findOne(id: string): Promise<AerolineaEntity>;
    create(aerolineaDto: AerolineaDto): Promise<AerolineaEntity>;
    update(id: string, aerolineaDto: Partial<AerolineaDto>): Promise<AerolineaEntity>;
    delete(id: string): Promise<void>;
    addAirportToAirline(aerolineaId: string, aeropuertoId: string): Promise<AerolineaEntity>;
    findAirportsFromAirline(aerolineaId: string): Promise<AeropuertoEntity[]>;
    updateAirportsFromAirline(aerolineaId: string, aeropuertosIds: string[]): Promise<AerolineaEntity>;
    deleteAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<AerolineaEntity>;
    findAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<AeropuertoEntity>;
}

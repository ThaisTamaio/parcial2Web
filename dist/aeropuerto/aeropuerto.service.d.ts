import { Repository } from 'typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';
import { AeropuertoDto } from './aeropuerto.dto';
export declare class AeropuertoService {
    private aeropuertoRepository;
    private aerolineaRepository;
    constructor(aeropuertoRepository: Repository<AeropuertoEntity>, aerolineaRepository: Repository<AerolineaEntity>);
    findAll(): Promise<AeropuertoEntity[]>;
    findOne(id: string): Promise<AeropuertoEntity>;
    create(aeropuertoDto: AeropuertoDto): Promise<AeropuertoEntity>;
    update(id: string, aeropuertoDto: Partial<AeropuertoDto>): Promise<AeropuertoEntity>;
    delete(id: string): Promise<void>;
    findAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<AeropuertoEntity>;
}

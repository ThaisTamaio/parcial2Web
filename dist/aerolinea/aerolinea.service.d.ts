import { Repository } from 'typeorm';
import { AerolineaEntity } from './aerolinea.entity';
export declare class AerolineaService {
    private aerolineaRepository;
    constructor(aerolineaRepository: Repository<AerolineaEntity>);
    findAll(): Promise<AerolineaEntity[]>;
    findOne(id: string): Promise<AerolineaEntity>;
    create(aerolinea: AerolineaEntity): Promise<AerolineaEntity>;
    update(id: string, aerolinea: Partial<AerolineaEntity>): Promise<AerolineaEntity>;
    delete(id: string): Promise<void>;
}

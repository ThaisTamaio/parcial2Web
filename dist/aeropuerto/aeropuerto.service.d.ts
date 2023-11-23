import { Repository } from 'typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';
export declare class AeropuertoService {
    private aeropuertoRepository;
    constructor(aeropuertoRepository: Repository<AeropuertoEntity>);
    findAll(): Promise<AeropuertoEntity[]>;
    findOne(id: string): Promise<AeropuertoEntity>;
    create(aeropuerto: AeropuertoEntity): Promise<AeropuertoEntity>;
    update(id: string, aeropuerto: Partial<AeropuertoEntity>): Promise<AeropuertoEntity>;
    delete(id: string): Promise<void>;
}

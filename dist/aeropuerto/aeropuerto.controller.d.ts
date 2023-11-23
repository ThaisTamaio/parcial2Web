import { AeropuertoService } from './aeropuerto.service';
import { AeropuertoDto } from './aeropuerto.dto';
export declare class AeropuertoController {
    private aeropuertoService;
    constructor(aeropuertoService: AeropuertoService);
    findAll(): Promise<import("./aeropuerto.entity").AeropuertoEntity[]>;
    findOne(id: string): Promise<import("./aeropuerto.entity").AeropuertoEntity>;
    create(aeropuertoDto: AeropuertoDto): Promise<import("./aeropuerto.entity").AeropuertoEntity>;
    update(id: string, aeropuertoDto: AeropuertoDto): Promise<import("./aeropuerto.entity").AeropuertoEntity>;
    delete(id: string): Promise<void>;
}

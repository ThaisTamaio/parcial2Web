import { AerolineaService } from './aerolinea.service';
import { AerolineaDto } from './aerolinea.dto';
export declare class AerolineaController {
    private aerolineaService;
    constructor(aerolineaService: AerolineaService);
    findAll(): Promise<import("./aerolinea.entity").AerolineaEntity[]>;
    findOne(id: string): Promise<import("./aerolinea.entity").AerolineaEntity>;
    create(aerolineaDto: AerolineaDto): Promise<import("./aerolinea.entity").AerolineaEntity>;
    update(id: string, aerolineaDto: AerolineaDto): Promise<import("./aerolinea.entity").AerolineaEntity>;
    delete(id: string): Promise<void>;
}

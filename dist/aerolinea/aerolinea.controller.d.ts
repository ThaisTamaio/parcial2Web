import { AerolineaService } from './aerolinea.service';
import { Response } from 'express';
import { AerolineaDto } from './aerolinea.dto';
export declare class AerolineaController {
    private aerolineaService;
    constructor(aerolineaService: AerolineaService);
    findAll(): Promise<import("./aerolinea.entity").AerolineaEntity[]>;
    findOne(id: string): Promise<import("./aerolinea.entity").AerolineaEntity>;
    create(aerolineaDto: AerolineaDto): Promise<import("./aerolinea.entity").AerolineaEntity>;
    update(id: string, aerolineaDto: AerolineaDto): Promise<import("./aerolinea.entity").AerolineaEntity>;
    delete(id: string): Promise<void>;
    addAirportToAirline(aerolineaId: string, aeropuertoId: string, res: Response): Promise<void>;
    updateAirportsFromAirline(aerolineaId: string, body: any): Promise<import("./aerolinea.entity").AerolineaEntity>;
}

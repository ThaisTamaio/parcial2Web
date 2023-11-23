import { AerolineaService } from './aerolinea.service';
export declare class AerolineaAeropuertoController {
    private aerolineaService;
    constructor(aerolineaService: AerolineaService);
    addAirportToAirline(aerolineaId: string, aeropuertoId: string): Promise<import("./aerolinea.entity").AerolineaEntity>;
    findAirportsFromAirline(aerolineaId: string): Promise<import("../aeropuerto/aeropuerto.entity").AeropuertoEntity[]>;
    findAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<import("../aeropuerto/aeropuerto.entity").AeropuertoEntity>;
    updateAirportsFromAirline(aerolineaId: string, aeropuertosIds: string[]): Promise<import("./aerolinea.entity").AerolineaEntity>;
    deleteAirportFromAirline(aerolineaId: string, aeropuertoId: string): Promise<import("./aerolinea.entity").AerolineaEntity>;
}

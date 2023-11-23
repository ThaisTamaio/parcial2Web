import { AerolineaEntity } from 'src/aerolinea/aerolinea.entity';
export declare class AeropuertoEntity {
    id: string;
    nombre: string;
    codigo: string;
    pais: string;
    ciudad: string;
    aerolineas: AerolineaEntity[];
}

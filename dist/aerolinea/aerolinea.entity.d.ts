import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';
export declare class AerolineaEntity {
    id: string;
    nombre: string;
    descripcion: string;
    fechaFundacion: Date;
    paginaWeb: string;
    aeropuertos: AeropuertoEntity[];
}

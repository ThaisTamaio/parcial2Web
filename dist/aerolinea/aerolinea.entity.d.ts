import { AeropuertoEntity } from 'src/aeropuerto/aeropuerto.entity';
export declare class AerolineaEntity {
    id: string;
    nombre: string;
    descripcion: string;
    fechaFundacion: Date;
    paginaWeb: string;
    aeropuertos: AeropuertoEntity[];
}

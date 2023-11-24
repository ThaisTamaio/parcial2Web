import { AlbumEntity } from '../album/album.entity';
export declare class PerformerEntity {
    id: string;
    nombre: string;
    imagen: string;
    descripcion: string;
    albumes: AlbumEntity[];
}

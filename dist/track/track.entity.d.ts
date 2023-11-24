import { AlbumEntity } from '../album/album.entity';
export declare class TrackEntity {
    id: string;
    nombre: string;
    duracion: number;
    album: AlbumEntity;
}

import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity } from '../track/track.entity';
export declare class AlbumEntity {
    id: string;
    nombre: string;
    caratula: string;
    fechaLanzamiento: Date;
    descripcion: string;
    performers: PerformerEntity[];
    tracks: TrackEntity[];
}

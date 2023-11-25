import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity } from '../track/track.entity';
import { AlbumDto } from './album.dto';
export declare class AlbumService {
    private albumRepository;
    private performerRepository;
    private trackRepository;
    constructor(albumRepository: Repository<AlbumEntity>, performerRepository: Repository<PerformerEntity>, trackRepository: Repository<TrackEntity>);
    findAll(): Promise<AlbumEntity[]>;
    findOne(id: string): Promise<AlbumEntity>;
    create(albumDto: AlbumDto): Promise<AlbumEntity>;
    delete(id: string): Promise<void>;
    updateAlbumTracks(albumId: string, newTracks: TrackEntity[]): Promise<AlbumEntity>;
    updateAlbumPerformers(albumId: string, newPerformers: PerformerEntity[]): Promise<AlbumEntity>;
    addPerformerToAlbum(albumId: string, performerId: string): Promise<AlbumEntity>;
}

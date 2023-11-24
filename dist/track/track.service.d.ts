import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackDto } from './track.dto';
export declare class TrackService {
    private trackRepository;
    private albumRepository;
    constructor(trackRepository: Repository<TrackEntity>, albumRepository: Repository<AlbumEntity>);
    findAll(): Promise<TrackEntity[]>;
    findOne(id: string): Promise<TrackEntity>;
    create(trackDto: TrackDto): Promise<TrackEntity>;
}

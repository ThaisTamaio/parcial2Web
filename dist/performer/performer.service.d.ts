import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { AlbumEntity } from '../album/album.entity';
import { PerformerDto } from './performer.dto';
export declare class PerformerService {
    private performerRepository;
    private albumRepository;
    constructor(performerRepository: Repository<PerformerEntity>, albumRepository: Repository<AlbumEntity>);
    findAll(): Promise<PerformerEntity[]>;
    findOne(id: string): Promise<PerformerEntity>;
    create(performerDto: PerformerDto): Promise<PerformerEntity>;
    findPerformerFromAlbum(albumId: string, performerId: string): Promise<PerformerEntity>;
}

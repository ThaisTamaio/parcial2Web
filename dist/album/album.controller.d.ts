import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';
export declare class AlbumController {
    private albumService;
    constructor(albumService: AlbumService);
    findAll(): Promise<import("./album.entity").AlbumEntity[]>;
    findOne(id: string): Promise<import("./album.entity").AlbumEntity>;
    create(albumDto: AlbumDto): Promise<import("./album.entity").AlbumEntity>;
    delete(id: string): Promise<void>;
    findAlbumPerformers(id: string): Promise<import("../performer/performer.entity").PerformerEntity[]>;
    findSpecificPerformerInAlbum(albumId: string, performerId: string): Promise<import("../performer/performer.entity").PerformerEntity>;
}

import { AlbumService } from './album.service';
import { AlbumDto } from './album.dto';
export declare class AlbumController {
    private albumService;
    constructor(albumService: AlbumService);
    findAll(): Promise<import("./album.entity").AlbumEntity[]>;
    findOne(id: string): Promise<import("./album.entity").AlbumEntity>;
    create(albumDto: AlbumDto): Promise<import("./album.entity").AlbumEntity>;
}

import { AlbumService } from './album.service';
export declare class AlbumPerformerController {
    private albumService;
    constructor(albumService: AlbumService);
    addPerformerToAlbum(albumId: string, performerId: string): Promise<import("./album.entity").AlbumEntity>;
}

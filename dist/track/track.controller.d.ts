import { TrackService } from './track.service';
import { TrackDto } from './track.dto';
export declare class TrackController {
    private trackService;
    constructor(trackService: TrackService);
    findAll(): Promise<import("./track.entity").TrackEntity[]>;
    findOne(id: string): Promise<import("./track.entity").TrackEntity>;
    create(trackDto: TrackDto): Promise<import("./track.entity").TrackEntity>;
}

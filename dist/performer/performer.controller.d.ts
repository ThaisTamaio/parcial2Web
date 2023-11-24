import { PerformerService } from './performer.service';
import { PerformerDto } from './performer.dto';
export declare class PerformerController {
    private performerService;
    constructor(performerService: PerformerService);
    findAll(): Promise<import("./performer.entity").PerformerEntity[]>;
    findOne(id: string): Promise<import("./performer.entity").PerformerEntity>;
    create(performerDto: PerformerDto): Promise<import("./performer.entity").PerformerEntity>;
}

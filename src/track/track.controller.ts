import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackDto } from './track.dto';

@Controller('tracks')
export class TrackController {
    constructor(private trackService: TrackService) {}

    @Get()
    async findAll() {
        return this.trackService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.trackService.findOne(id);
    }

    @Post()
    async create(@Body() trackDto: TrackDto) {
        return this.trackService.create(trackDto);
    }
}

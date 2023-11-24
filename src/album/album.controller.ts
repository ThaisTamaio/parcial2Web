import { Controller, Get, Post, Put, Delete, Param, Body, Res, BadRequestException } from '@nestjs/common';
import { AlbumService } from './album.service';
import { Response } from 'express';
import { AlbumDto } from './album.dto';

@Controller('albumes')
export class AlbumController {
    constructor(private albumService: AlbumService) {}

    @Get()
    async findAll() {
        return this.albumService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.albumService.findOne(id);
    }

    @Post()
    async create(@Body() albumDto: AlbumDto) {
        return this.albumService.create(albumDto);
    }

}

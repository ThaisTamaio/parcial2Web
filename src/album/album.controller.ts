import { Controller, Get, Post, Put, Delete, Param, Body, Res, BadRequestException, NotFoundException } from '@nestjs/common';
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

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.albumService.delete(id);
    }

    @Get(':id/performers')
    async findAlbumPerformers(@Param('id') id: string) {
        const album = await this.albumService.findOne(id);
        if (!album) {
            throw new NotFoundException(`Album con ID ${id} no encontrada.`);
        }
        return album.performers;
    }

    @Get(':albumId/performers/:performerId')
    async findSpecificPerformerInAlbum(@Param('albumId') albumId: string, @Param('performerId') performerId: string) {
        const album = await this.albumService.findOne(albumId);
        if (!album) {
            throw new NotFoundException(`Album con ID ${albumId} no encontrado.`);
        }

        const performer = album.performers.find(p => p.id === performerId);
        if (!performer) {
            throw new NotFoundException(`Performer con ID ${performerId} no encontrado en el álbum con ID ${albumId}.`);
        }

        return performer;
    }
}

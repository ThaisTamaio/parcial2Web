import { Controller, Get, Post, Put, Delete, Param, Body, Res, BadRequestException } from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';
import { Response } from 'express';
import { AerolineaDto } from './aerolinea.dto';

@Controller('airlines')
export class AerolineaController {
    constructor(private aerolineaService: AerolineaService) {}

    @Get()
    async findAll() {
        return this.aerolineaService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.aerolineaService.findOne(id);
    }

    @Post()
    async create(@Body() aerolineaDto: AerolineaDto) {
        return this.aerolineaService.create(aerolineaDto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() aerolineaDto: AerolineaDto) {
        return this.aerolineaService.update(id, aerolineaDto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.aerolineaService.delete(id);
    }

    @Post(':aerolineaId/airports/:aeropuertoId')
    async addAirportToAirline(@Param('aerolineaId') aerolineaId: string, @Param('aeropuertoId') aeropuertoId: string, @Res() res: Response) {
        try {
            const updatedAerolinea = await this.aerolineaService.addAirportToAirline(aerolineaId, aeropuertoId);
            res.status(201).json(updatedAerolinea);
        } catch (e) {
            res.status(404).json({ message: e.message });
        }
    }

    @Put(':aerolineaId/airports')
    async updateAirportsFromAirline(
        @Param('aerolineaId') aerolineaId: string, 
        @Body() body: any
    ) {
        const aeropuertosIds = body.aeropuertosIds;
        if (!Array.isArray(aeropuertosIds)) {
            throw new BadRequestException('aeropuertosIds debe ser un array');
        }
        return this.aerolineaService.updateAirportsFromAirline(aerolineaId, aeropuertosIds);
    }


}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AerolineaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aerolinea_entity_1 = require("./aerolinea.entity");
const aeropuerto_entity_1 = require("../aeropuerto/aeropuerto.entity");
let AerolineaService = class AerolineaService {
    constructor(aerolineaRepository, aeropuertoRepository) {
        this.aerolineaRepository = aerolineaRepository;
        this.aeropuertoRepository = aeropuertoRepository;
    }
    async findAll() {
        return await this.aerolineaRepository.find({
            relations: ['aeropuertos']
        });
    }
    async findOne(id) {
        const aerolinea = await this.aerolineaRepository.findOne({
            where: { id },
            relations: ['aeropuertos']
        });
        if (!aerolinea) {
            throw new common_1.NotFoundException(`Aerolinea con ID ${id} no encontrada.`);
        }
        return aerolinea;
    }
    async create(aerolineaDto) {
        if (new Date(aerolineaDto.fechaFundacion) >= new Date()) {
            throw new common_1.BadRequestException('La fecha de fundación debe ser en el pasado.');
        }
        const aerolinea = new aerolinea_entity_1.AerolineaEntity();
        Object.assign(aerolinea, aerolineaDto);
        return await this.aerolineaRepository.save(aerolinea);
    }
    async update(id, aerolineaDto) {
        const existingAerolinea = await this.aerolineaRepository.findOne({ where: { id } });
        if (!existingAerolinea) {
            throw new common_1.NotFoundException(`Aerolinea con ID ${id} no encontrada.`);
        }
        if (aerolineaDto.fechaFundacion && new Date(aerolineaDto.fechaFundacion) >= new Date()) {
            throw new common_1.BadRequestException('La fecha de fundación debe ser en el pasado.');
        }
        Object.assign(existingAerolinea, aerolineaDto);
        return await this.aerolineaRepository.save(existingAerolinea);
    }
    async delete(id) {
        const aerolinea = await this.aerolineaRepository.findOne({ where: { id } });
        if (!aerolinea) {
            throw new common_1.NotFoundException(`Aerolinea con ID ${id} no encontrada.`);
        }
        await this.aerolineaRepository.delete(id);
    }
    async addAirportToAirline(aerolineaId, aeropuertoId) {
        const aerolinea = await this.aerolineaRepository.findOne({
            where: { id: aerolineaId },
            relations: ['aeropuertos']
        });
        if (!aerolinea)
            throw new common_1.NotFoundException('Aerolinea no encontrada.');
        const aeropuerto = await this.aeropuertoRepository.findOne({
            where: { id: aeropuertoId }
        });
        if (!aeropuerto)
            throw new common_1.NotFoundException('Aeropuerto no encontrado.');
        aerolinea.aeropuertos.push(aeropuerto);
        return this.aerolineaRepository.save(aerolinea);
    }
    async findAirportsFromAirline(aerolineaId) {
        const aerolinea = await this.aerolineaRepository.findOne({ where: { id: aerolineaId }, relations: ['aeropuertos'] });
        if (!aerolinea)
            throw new common_1.NotFoundException('Aerolinea no encontrada.');
        return aerolinea.aeropuertos;
    }
    async updateAirportsFromAirline(aerolineaId, aeropuertosIds) {
        const aerolinea = await this.aerolineaRepository.findOne({ where: { id: aerolineaId }, relations: ['aeropuertos'] });
        if (!aerolinea)
            throw new common_1.NotFoundException('Aerolinea no encontrada.');
        const aeropuertos = await this.aeropuertoRepository.findByIds(aeropuertosIds);
        aerolinea.aeropuertos = aeropuertos;
        return this.aerolineaRepository.save(aerolinea);
    }
    async deleteAirportFromAirline(aerolineaId, aeropuertoId) {
        const aerolinea = await this.aerolineaRepository.findOne({ where: { id: aerolineaId }, relations: ['aeropuertos'] });
        if (!aerolinea)
            throw new common_1.NotFoundException('Aerolinea no encontrada.');
        aerolinea.aeropuertos = aerolinea.aeropuertos.filter(aero => aero.id !== aeropuertoId);
        return this.aerolineaRepository.save(aerolinea);
    }
    async findAirportFromAirline(aerolineaId, aeropuertoId) {
        const aerolinea = await this.aerolineaRepository.findOne({
            where: { id: aerolineaId },
            relations: ['aeropuertos']
        });
        if (!aerolinea) {
            throw new common_1.NotFoundException('Aerolinea no encontrada.');
        }
        const aeropuerto = aerolinea.aeropuertos.find(aero => aero.id === aeropuertoId);
        if (!aeropuerto) {
            throw new common_1.NotFoundException('Aeropuerto no encontrado en la aerolínea.');
        }
        return aeropuerto;
    }
};
exports.AerolineaService = AerolineaService;
exports.AerolineaService = AerolineaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aerolinea_entity_1.AerolineaEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(aeropuerto_entity_1.AeropuertoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AerolineaService);
//# sourceMappingURL=aerolinea.service.js.map
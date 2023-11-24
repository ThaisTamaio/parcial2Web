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
exports.AeropuertoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const aeropuerto_entity_1 = require("./aeropuerto.entity");
const aerolinea_entity_1 = require("../aerolinea/aerolinea.entity");
let AeropuertoService = class AeropuertoService {
    constructor(aeropuertoRepository, aerolineaRepository) {
        this.aeropuertoRepository = aeropuertoRepository;
        this.aerolineaRepository = aerolineaRepository;
    }
    async findAll() {
        return await this.aeropuertoRepository.find({ relations: ['aerolineas'] });
    }
    async findOne(id) {
        const aeropuerto = await this.aeropuertoRepository.findOne({
            where: { id },
            relations: ['aerolineas']
        });
        if (!aeropuerto) {
            throw new common_1.NotFoundException(`Aeropuerto con ID ${id} no encontrado.`);
        }
        return aeropuerto;
    }
    async create(aeropuertoDto) {
        if (aeropuertoDto.codigo.length !== 3) {
            throw new common_1.BadRequestException('El código del aeropuerto debe tener exactamente tres caracteres.');
        }
        const aeropuerto = new aeropuerto_entity_1.AeropuertoEntity();
        Object.assign(aeropuerto, aeropuertoDto);
        return await this.aeropuertoRepository.save(aeropuerto);
    }
    async update(id, aeropuertoDto) {
        const existingAeropuerto = await this.aeropuertoRepository.findOne({ where: { id } });
        if (!existingAeropuerto) {
            throw new common_1.NotFoundException(`Aeropuerto con ID ${id} no encontrado.`);
        }
        if (aeropuertoDto.codigo && aeropuertoDto.codigo.length !== 3) {
            throw new common_1.BadRequestException('El código del aeropuerto debe tener exactamente tres caracteres.');
        }
        Object.assign(existingAeropuerto, aeropuertoDto);
        return await this.aeropuertoRepository.save(existingAeropuerto);
    }
    async delete(id) {
        const aeropuerto = await this.aeropuertoRepository.findOne({ where: { id } });
        if (!aeropuerto) {
            throw new common_1.NotFoundException(`Aeropuerto con ID ${id} no encontrado.`);
        }
        await this.aeropuertoRepository.delete(id);
    }
    async findAirportFromAirline(aerolineaId, aeropuertoId) {
        const aerolinea = await this.aerolineaRepository.findOne({ where: { id: aerolineaId }, relations: ['aeropuertos'] });
        if (!aerolinea)
            throw new common_1.NotFoundException('Aerolinea no encontrada.');
        const aeropuerto = aerolinea.aeropuertos.find(aero => aero.id === aeropuertoId);
        if (!aeropuerto)
            throw new common_1.NotFoundException('Aeropuerto no encontrado en la aerolínea.');
        return aeropuerto;
    }
};
exports.AeropuertoService = AeropuertoService;
exports.AeropuertoService = AeropuertoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(aeropuerto_entity_1.AeropuertoEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(aerolinea_entity_1.AerolineaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AeropuertoService);
//# sourceMappingURL=aeropuerto.service.js.map
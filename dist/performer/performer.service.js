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
exports.PerformerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const performer_entity_1 = require("./performer.entity");
const album_entity_1 = require("../album/album.entity");
let PerformerService = class PerformerService {
    constructor(performerRepository, albumRepository) {
        this.performerRepository = performerRepository;
        this.albumRepository = albumRepository;
    }
    async findAll() {
        return await this.performerRepository.find({ relations: ['albumes'] });
    }
    async findOne(id) {
        const performer = await this.performerRepository.findOne({
            where: { id },
            relations: ['albumes']
        });
        if (!performer) {
            throw new common_1.NotFoundException(`Performer con ID ${id} no encontrado.`);
        }
        return performer;
    }
    async create(performerDto) {
        if (performerDto.descripcion && performerDto.descripcion.length > 100) {
            throw new common_1.BadRequestException('La descripción del performer no puede exceder los 100 caracteres.');
        }
        const performer = new performer_entity_1.PerformerEntity();
        Object.assign(performer, performerDto);
        return await this.performerRepository.save(performer);
    }
    async findPerformerFromAlbum(albumId, performerId) {
        const album = await this.albumRepository.findOne({ where: { id: albumId }, relations: ['performers'] });
        if (!album)
            throw new common_1.NotFoundException('Album no encontrada.');
        const performer = album.performers.find(aero => aero.id === performerId);
        if (!performer)
            throw new common_1.NotFoundException('Performer no encontrado en la aerolínea.');
        return performer;
    }
};
exports.PerformerService = PerformerService;
exports.PerformerService = PerformerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(performer_entity_1.PerformerEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(album_entity_1.AlbumEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PerformerService);
//# sourceMappingURL=performer.service.js.map
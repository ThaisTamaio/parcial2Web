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
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const track_entity_1 = require("./track.entity");
const album_entity_1 = require("../album/album.entity");
let TrackService = class TrackService {
    constructor(trackRepository, albumRepository) {
        this.trackRepository = trackRepository;
        this.albumRepository = albumRepository;
    }
    async findAll() {
        return await this.trackRepository.find({ relations: ['albumes'] });
    }
    async findOne(id) {
        const track = await this.trackRepository.findOne({
            where: { id },
            relations: ['albumes']
        });
        if (!track) {
            throw new common_1.NotFoundException(`Track con ID ${id} no encontrado.`);
        }
        return track;
    }
    async create(trackDto) {
        if (trackDto.duracion <= 0) {
            throw new common_1.BadRequestException('La duración del track debe ser un número positivo.');
        }
        const album = await this.albumRepository.findOne({ where: { id: trackDto.albumId } });
        if (!album) {
            throw new common_1.NotFoundException(`Álbum con ID ${trackDto.albumId} no encontrado.`);
        }
        const track = new track_entity_1.TrackEntity();
        track.album = album;
        Object.assign(track, trackDto);
        return await this.trackRepository.save(track);
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(track_entity_1.TrackEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(album_entity_1.AlbumEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TrackService);
//# sourceMappingURL=track.service.js.map
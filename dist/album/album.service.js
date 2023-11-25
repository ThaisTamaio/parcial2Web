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
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const album_entity_1 = require("./album.entity");
const performer_entity_1 = require("../performer/performer.entity");
const track_entity_1 = require("../track/track.entity");
let AlbumService = class AlbumService {
    constructor(albumRepository, performerRepository, trackRepository) {
        this.albumRepository = albumRepository;
        this.performerRepository = performerRepository;
        this.trackRepository = trackRepository;
    }
    async findAll() {
        return await this.albumRepository.find({
            relations: ['performers', 'tracks']
        });
    }
    async findOne(id) {
        const album = await this.albumRepository.findOne({
            where: { id },
            relations: ['performers', 'tracks']
        });
        if (!album) {
            throw new common_1.NotFoundException(`Album con ID ${id} no encontrada.`);
        }
        return album;
    }
    async create(albumDto) {
        if (!albumDto.nombre || albumDto.nombre.trim() === '') {
            throw new common_1.BadRequestException('El nombre del álbum no puede estar vacío.');
        }
        if (!albumDto.descripcion || albumDto.descripcion.trim() === '') {
            throw new common_1.BadRequestException('La descripción del álbum no puede estar vacía.');
        }
        const album = new album_entity_1.AlbumEntity();
        Object.assign(album, albumDto);
        return await this.albumRepository.save(album);
    }
    async delete(id) {
        const album = await this.albumRepository.findOne({
            where: { id },
            relations: ['tracks']
        });
        if (!album) {
            throw new common_1.NotFoundException(`Album con ID ${id} no encontrada.`);
        }
        if (album.tracks && album.tracks.length > 0) {
            throw new common_1.BadRequestException('No se puede eliminar un álbum con tracks asociados.');
        }
        await this.albumRepository.delete(id);
    }
    async updateAlbumTracks(albumId, newTracks) {
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ['tracks']
        });
        if (!album) {
            throw new common_1.NotFoundException(`Album con ID ${albumId} no encontrado.`);
        }
        album.tracks = newTracks;
        return await this.albumRepository.save(album);
    }
    async addPerformerToAlbum(albumId, performerId) {
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ['performers']
        });
        if (!album)
            throw new common_1.NotFoundException('Album no encontrada.');
        const performer = await this.performerRepository.findOne({
            where: { id: performerId }
        });
        if (!performer)
            throw new common_1.NotFoundException('Performer no encontrado.');
        album.performers.push(performer);
        return this.albumRepository.save(album);
    }
};
exports.AlbumService = AlbumService;
exports.AlbumService = AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.AlbumEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(performer_entity_1.PerformerEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(track_entity_1.TrackEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AlbumService);
//# sourceMappingURL=album.service.js.map
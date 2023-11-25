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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const album_dto_1 = require("./album.dto");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    async findAll() {
        return this.albumService.findAll();
    }
    async findOne(id) {
        return this.albumService.findOne(id);
    }
    async create(albumDto) {
        return this.albumService.create(albumDto);
    }
    async delete(id) {
        return this.albumService.delete(id);
    }
    async findAlbumPerformers(id) {
        const album = await this.albumService.findOne(id);
        if (!album) {
            throw new common_1.NotFoundException(`Album con ID ${id} no encontrada.`);
        }
        return album.performers;
    }
    async findSpecificPerformerInAlbum(albumId, performerId) {
        const album = await this.albumService.findOne(albumId);
        if (!album) {
            throw new common_1.NotFoundException(`Album con ID ${albumId} no encontrado.`);
        }
        const performer = album.performers.find(p => p.id === performerId);
        if (!performer) {
            throw new common_1.NotFoundException(`Performer con ID ${performerId} no encontrado en el álbum con ID ${albumId}.`);
        }
        return performer;
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [album_dto_1.AlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/performers'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findAlbumPerformers", null);
__decorate([
    (0, common_1.Get)(':albumId/performers/:performerId'),
    __param(0, (0, common_1.Param)('albumId')),
    __param(1, (0, common_1.Param)('performerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findSpecificPerformerInAlbum", null);
exports.AlbumController = AlbumController = __decorate([
    (0, common_1.Controller)('albumes'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map
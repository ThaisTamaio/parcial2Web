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
exports.AlbumPerformerController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
let AlbumPerformerController = class AlbumPerformerController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    async addPerformerToAlbum(albumId, performerId) {
        return this.albumService.addPerformerToAlbum(albumId, performerId);
    }
};
exports.AlbumPerformerController = AlbumPerformerController;
__decorate([
    (0, common_1.Post)(':albumId/performers/:performerId'),
    __param(0, (0, common_1.Param)('albumId')),
    __param(1, (0, common_1.Param)('performerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AlbumPerformerController.prototype, "addPerformerToAlbum", null);
exports.AlbumPerformerController = AlbumPerformerController = __decorate([
    (0, common_1.Controller)('albumes'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumPerformerController);
//# sourceMappingURL=album-performer.controller.js.map
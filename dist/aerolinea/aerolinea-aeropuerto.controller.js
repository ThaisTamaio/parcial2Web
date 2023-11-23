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
exports.AerolineaAeropuertoController = void 0;
const common_1 = require("@nestjs/common");
const aerolinea_service_1 = require("./aerolinea.service");
let AerolineaAeropuertoController = class AerolineaAeropuertoController {
    constructor(aerolineaService) {
        this.aerolineaService = aerolineaService;
    }
    async addAirportToAirline(aerolineaId, aeropuertoId) {
        return this.aerolineaService.addAirportToAirline(aerolineaId, aeropuertoId);
    }
    async findAirportsFromAirline(aerolineaId) {
        return this.aerolineaService.findAirportsFromAirline(aerolineaId);
    }
    async findAirportFromAirline(aerolineaId, aeropuertoId) {
        return this.aerolineaService.findAirportFromAirline(aerolineaId, aeropuertoId);
    }
    async updateAirportsFromAirline(aerolineaId, aeropuertosIds) {
        return this.aerolineaService.updateAirportsFromAirline(aerolineaId, aeropuertosIds);
    }
    async deleteAirportFromAirline(aerolineaId, aeropuertoId) {
        return this.aerolineaService.deleteAirportFromAirline(aerolineaId, aeropuertoId);
    }
};
exports.AerolineaAeropuertoController = AerolineaAeropuertoController;
__decorate([
    (0, common_1.Post)(':aerolineaId/airports/:aeropuertoId'),
    __param(0, (0, common_1.Param)('aerolineaId')),
    __param(1, (0, common_1.Param)('aeropuertoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AerolineaAeropuertoController.prototype, "addAirportToAirline", null);
__decorate([
    (0, common_1.Get)(':aerolineaId/airports'),
    __param(0, (0, common_1.Param)('aerolineaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AerolineaAeropuertoController.prototype, "findAirportsFromAirline", null);
__decorate([
    (0, common_1.Get)(':aerolineaId/airports/:aeropuertoId'),
    __param(0, (0, common_1.Param)('aerolineaId')),
    __param(1, (0, common_1.Param)('aeropuertoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AerolineaAeropuertoController.prototype, "findAirportFromAirline", null);
__decorate([
    (0, common_1.Put)(':aerolineaId/airports'),
    __param(0, (0, common_1.Param)('aerolineaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], AerolineaAeropuertoController.prototype, "updateAirportsFromAirline", null);
__decorate([
    (0, common_1.Delete)(':aerolineaId/airports/:aeropuertoId'),
    __param(0, (0, common_1.Param)('aerolineaId')),
    __param(1, (0, common_1.Param)('aeropuertoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AerolineaAeropuertoController.prototype, "deleteAirportFromAirline", null);
exports.AerolineaAeropuertoController = AerolineaAeropuertoController = __decorate([
    (0, common_1.Controller)('airlines'),
    __metadata("design:paramtypes", [aerolinea_service_1.AerolineaService])
], AerolineaAeropuertoController);
//# sourceMappingURL=aerolinea-aeropuerto.controller.js.map
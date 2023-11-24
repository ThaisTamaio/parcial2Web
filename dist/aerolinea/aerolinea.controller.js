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
exports.AerolineaController = void 0;
const common_1 = require("@nestjs/common");
const aerolinea_service_1 = require("./aerolinea.service");
const aerolinea_dto_1 = require("./aerolinea.dto");
let AerolineaController = class AerolineaController {
    constructor(aerolineaService) {
        this.aerolineaService = aerolineaService;
    }
    async findAll() {
        return this.aerolineaService.findAll();
    }
    async findOne(id) {
        return this.aerolineaService.findOne(id);
    }
    async create(aerolineaDto) {
        return this.aerolineaService.create(aerolineaDto);
    }
    async update(id, aerolineaDto) {
        return this.aerolineaService.update(id, aerolineaDto);
    }
    async delete(id) {
        return this.aerolineaService.delete(id);
    }
    async addAirportToAirline(aerolineaId, aeropuertoId, res) {
        try {
            const updatedAerolinea = await this.aerolineaService.addAirportToAirline(aerolineaId, aeropuertoId);
            res.status(201).json(updatedAerolinea);
        }
        catch (e) {
            res.status(404).json({ message: e.message });
        }
    }
    async updateAirportsFromAirline(aerolineaId, body) {
        const aeropuertosIds = body.aeropuertosIds;
        if (!Array.isArray(aeropuertosIds)) {
            throw new common_1.BadRequestException('aeropuertosIds debe ser un array');
        }
        return this.aerolineaService.updateAirportsFromAirline(aerolineaId, aeropuertosIds);
    }
};
exports.AerolineaController = AerolineaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [aerolinea_dto_1.AerolineaDto]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, aerolinea_dto_1.AerolineaDto]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':aerolineaId/airports/:aeropuertoId'),
    __param(0, (0, common_1.Param)('aerolineaId')),
    __param(1, (0, common_1.Param)('aeropuertoId')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "addAirportToAirline", null);
__decorate([
    (0, common_1.Put)(':aerolineaId/airports'),
    __param(0, (0, common_1.Param)('aerolineaId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AerolineaController.prototype, "updateAirportsFromAirline", null);
exports.AerolineaController = AerolineaController = __decorate([
    (0, common_1.Controller)('airlines'),
    __metadata("design:paramtypes", [aerolinea_service_1.AerolineaService])
], AerolineaController);
//# sourceMappingURL=aerolinea.controller.js.map
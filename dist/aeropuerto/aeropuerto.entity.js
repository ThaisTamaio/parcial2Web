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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AeropuertoEntity = void 0;
const aerolinea_entity_1 = require("../aerolinea/aerolinea.entity");
const typeorm_1 = require("typeorm");
let AeropuertoEntity = class AeropuertoEntity {
};
exports.AeropuertoEntity = AeropuertoEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AeropuertoEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AeropuertoEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AeropuertoEntity.prototype, "codigo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AeropuertoEntity.prototype, "pais", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AeropuertoEntity.prototype, "ciudad", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(type => aerolinea_entity_1.AerolineaEntity, aerolinea => aerolinea.aeropuertos),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], AeropuertoEntity.prototype, "aerolineas", void 0);
exports.AeropuertoEntity = AeropuertoEntity = __decorate([
    (0, typeorm_1.Entity)()
], AeropuertoEntity);
//# sourceMappingURL=aeropuerto.entity.js.map
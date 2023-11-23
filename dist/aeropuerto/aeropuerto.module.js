"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AeropuertoModule = void 0;
const common_1 = require("@nestjs/common");
const aeropuerto_service_1 = require("./aeropuerto.service");
const typeorm_1 = require("@nestjs/typeorm");
const aeropuerto_entity_1 = require("./aeropuerto.entity");
let AeropuertoModule = class AeropuertoModule {
};
exports.AeropuertoModule = AeropuertoModule;
exports.AeropuertoModule = AeropuertoModule = __decorate([
    (0, common_1.Module)({
        providers: [aeropuerto_service_1.AeropuertoService],
        imports: [typeorm_1.TypeOrmModule.forFeature([aeropuerto_entity_1.AeropuertoEntity])],
    })
], AeropuertoModule);
//# sourceMappingURL=aeropuerto.module.js.map
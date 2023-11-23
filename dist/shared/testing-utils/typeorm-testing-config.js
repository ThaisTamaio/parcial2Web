"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTestingConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const aerolinea_entity_1 = require("../../aerolinea/aerolinea.entity");
const aeropuerto_entity_1 = require("../../aeropuerto/aeropuerto.entity");
const TypeOrmTestingConfig = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [
            aerolinea_entity_1.AerolineaEntity,
            aeropuerto_entity_1.AeropuertoEntity,
        ],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    typeorm_1.TypeOrmModule.forFeature([
        aerolinea_entity_1.AerolineaEntity,
        aeropuerto_entity_1.AeropuertoEntity,
    ]),
];
exports.TypeOrmTestingConfig = TypeOrmTestingConfig;
//# sourceMappingURL=typeorm-testing-config.js.map
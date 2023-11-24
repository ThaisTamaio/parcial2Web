"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmTestingConfig = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const album_entity_1 = require("../../album/album.entity");
const performer_entity_1 = require("../../performer/performer.entity");
const track_entity_1 = require("../../track/track.entity");
const TypeOrmTestingConfig = () => [
    typeorm_1.TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [
            album_entity_1.AlbumEntity,
            performer_entity_1.PerformerEntity,
            track_entity_1.TrackEntity,
        ],
        synchronize: true,
        keepConnectionAlive: true,
    }),
    typeorm_1.TypeOrmModule.forFeature([
        album_entity_1.AlbumEntity,
        performer_entity_1.PerformerEntity,
        track_entity_1.TrackEntity,
    ]),
];
exports.TypeOrmTestingConfig = TypeOrmTestingConfig;
//# sourceMappingURL=typeorm-testing-config.js.map
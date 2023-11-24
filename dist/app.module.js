"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const album_module_1 = require("./album/album.module");
const album_entity_1 = require("./album/album.entity");
const performer_module_1 = require("./performer/performer.module");
const performer_entity_1 = require("./performer/performer.entity");
const album_performer_controller_1 = require("./album/album-performer.controller");
const track_module_1 = require("./track/track.module");
const track_entity_1 = require("./track/track.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            album_module_1.AlbumModule,
            performer_module_1.PerformerModule,
            track_module_1.TrackModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'postgres',
                entities: [
                    album_entity_1.AlbumEntity,
                    performer_entity_1.PerformerEntity,
                    track_entity_1.TrackEntity,
                ],
                dropSchema: true,
                synchronize: true,
                keepConnectionAlive: true,
            }),
            track_module_1.TrackModule,
        ],
        controllers: [app_controller_1.AppController, album_performer_controller_1.AlbumPerformerController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
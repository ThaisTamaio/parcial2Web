import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from './album/album.module';
import { AlbumEntity } from './album/album.entity';
import { PerformerModule } from './performer/performer.module';
import { PerformerEntity } from './performer/performer.entity';
import { AlbumPerformerController } from './album/album-performer.controller';
import { TrackModule } from './track/track.module';
import { TrackEntity } from './track/track.entity';


@Module({
  imports: [
    AlbumModule,
    PerformerModule,
    TrackModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [
        AlbumEntity,
        PerformerEntity,
        TrackEntity,
        //TODO Agregar Entities
      ],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    TrackModule,
  ],
  controllers: [AppController, AlbumPerformerController],
  providers: [AppService],
})
export class AppModule {}

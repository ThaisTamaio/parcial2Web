import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { AlbumEntity } from '../album/album.entity';

describe('TrackService', () => {
  let service: TrackService;
  let trackRepository: Repository<TrackEntity>;
  let albumRepository: Repository<AlbumEntity>;
  let trackList: TrackEntity[];
  let deleteSpy: { calledWithId: string | null };

  beforeEach(async () => {
    const albumTest = new AlbumEntity();
    albumTest.id = faker.datatype.uuid();
    albumTest.nombre = faker.name.findName();
    albumTest.caratula = faker.image.imageUrl();
    albumTest.fechaLanzamiento = faker.date.past();
    albumTest.descripcion = faker.lorem.sentence();

    trackList = Array.from({ length: 5 }).map(() => ({
      id: faker.datatype.uuid(),
      nombre: faker.name.findName(),
      duracion: faker.datatype.number(),
      album: albumTest,
    }));

    deleteSpy = { calledWithId: null };

    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        TrackService,
        {
          provide: getRepositoryToken(TrackEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(trackList),
            findOne: jest.fn().mockImplementation((options) => {
              const id = options.where.id;
              return Promise.resolve(trackList.find(a => a.id === id));
            }),
            save: jest.fn().mockImplementation((aero) => Promise.resolve({ id: faker.datatype.uuid(), ...aero })),
            delete: jest.fn().mockImplementation((id: string) => {
              deleteSpy.calledWithId = id;
              return Promise.resolve({ affected: 1 });
            }),
          },
        },
      ],
    }).compile();

    service = module.get<TrackService>(TrackService);
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all tracks', async () => {
    const result = await service.findAll();
    expect(result).toEqual(trackList);
  });

  it('findOne should return an track by ID', async () => {
    const track = trackList[0];
    const result = await service.findOne(track.id);
    expect(result).toEqual(track);
  });
  
});

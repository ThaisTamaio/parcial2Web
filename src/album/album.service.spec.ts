import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PerformerEntity } from '../performer/performer.entity';
import { TrackEntity } from '../track/track.entity';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let performerRepository: Repository<PerformerEntity>;
  let trackRepository: Repository<TrackEntity>;
  let albumList: AlbumEntity[];
  let deleteSpy: { calledWithId: string | null };

  beforeEach(async () => {
    // Crear un performer de prueba
    const performerTest = new PerformerEntity();
    performerTest.id = faker.datatype.uuid();
    performerTest.nombre = faker.name.findName();
    performerTest.imagen = faker.image.imageUrl();
    performerTest.descripcion = faker.lorem.sentence();

    const trackTest = new TrackEntity();
    trackTest.id = faker.datatype.uuid();
    trackTest.nombre = faker.name.findName();
    trackTest.duracion = faker.datatype.number();
  
    albumList = Array.from({ length: 5 }).map(() => ({
      id: faker.datatype.uuid(),
      nombre: faker.name.findName(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence(),
      fechaLanzamiento: faker.date.past(),
      performers: [performerTest],
      tracks: [trackTest],
    }));

    deleteSpy = { calledWithId: null };

    const mockAlbumRepository = {
      find: jest.fn().mockResolvedValue(albumList),
      findOne: jest.fn().mockImplementation((options) => {
        const id = options.where.id;
        return Promise.resolve(albumList.find(a => a.id === id));
      }),
      save: jest.fn().mockImplementation((aero) => Promise.resolve({ id: faker.datatype.uuid(), ...aero })),
      delete: jest.fn().mockImplementation((id: string) => {
        deleteSpy.calledWithId = id;
        return Promise.resolve({ affected: 1 });
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        AlbumService,
        {
          provide: getRepositoryToken(AlbumEntity),
          useValue: mockAlbumRepository,
        },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all albumes', async () => {
    const result = await service.findAll();
    expect(result).toEqual(albumList);
  });

  it('findOne should return an album by ID', async () => {
    const album = albumList[0];
    const result = await service.findOne(album.id);
    expect(result).toEqual(album);
  });

  it('should create an album successfully', async () => {
    const newAlbum = {
      nombre: faker.name.findName(),
      caratula: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence(),
      fechaLanzamiento: faker.date.past(),
      performers: [],
      tracks: [],
    };

    const savedAlbum = await service.create(newAlbum);
    expect(savedAlbum).toBeDefined();
    expect(savedAlbum.id).toBeDefined();
    expect(savedAlbum.nombre).toEqual(newAlbum.nombre);
    expect(savedAlbum.descripcion).toEqual(newAlbum.descripcion);
  });

  it('should throw an exception when trying to create an album with empty description', async () => {
    const newAlbum = {
      nombre: faker.name.findName(),
      caratula: faker.image.imageUrl(),
      descripcion: '',
      fechaLanzamiento: faker.date.past(),
      performers: [],
      tracks: [],
    };

    await expect(service.create(newAlbum)).rejects.toThrow(BadRequestException);
  });
  
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';
import { AlbumEntity } from '../album/album.entity';

describe('PerformerService', () => {
  let service: PerformerService;
  let performerRepository: Repository<PerformerEntity>;
  let albumRepository: Repository<AlbumEntity>;
  let performerList: PerformerEntity[];
  let deleteSpy: { calledWithId: string | null };

  beforeEach(async () => {
    performerList = Array.from({ length: 5 }).map(() => ({
      id: faker.datatype.uuid(),
      nombre: faker.name.findName(),
      imagen: faker.image.imageUrl(),
      descripcion: faker.lorem.sentence(),
      albumes: [],
    }));

    deleteSpy = { calledWithId: null };

    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        PerformerService,
        {
          provide: getRepositoryToken(PerformerEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(performerList),
            findOne: jest.fn().mockImplementation((options) => {
              const id = options.where.id;
              return Promise.resolve(performerList.find(a => a.id === id));
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

    service = module.get<PerformerService>(PerformerService);
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all performers', async () => {
    const result = await service.findAll();
    expect(result).toEqual(performerList);
  });

  it('findOne should return an performer by ID', async () => {
    const performer = performerList[0];
    const result = await service.findOne(performer.id);
    expect(result).toEqual(performer);
  });
  
});

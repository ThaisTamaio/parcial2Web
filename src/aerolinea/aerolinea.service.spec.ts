import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AerolineaEntity } from './aerolinea.entity';
import { AerolineaService } from './aerolinea.service';
import { faker } from '@faker-js/faker';
import { BadRequestException } from '@nestjs/common';

describe('AerolineaService', () => {
  let service: AerolineaService;
  let repository: Repository<AerolineaEntity>;
  let aerolineaList: AerolineaEntity[];
  let deleteSpy: { calledWithId: string | null };

  beforeEach(async () => {
    aerolineaList = Array.from({ length: 5 }).map(() => ({
      id: faker.datatype.uuid(),
      nombre: faker.company.companyName(),
      descripcion: faker.lorem.sentence(),
      fechaFundacion: faker.date.past(),
      paginaWeb: faker.internet.url(),
      aeropuertos: [],
    }));

    deleteSpy = { calledWithId: null };

    const mockAerolineaRepository = {
      find: jest.fn().mockResolvedValue(aerolineaList),
      findOne: jest.fn().mockImplementation((options) => {
        const id = options.where.id;
        return Promise.resolve(aerolineaList.find(a => a.id === id));
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
        AerolineaService,
        {
          provide: getRepositoryToken(AerolineaEntity),
          useValue: mockAerolineaRepository,
        },
      ],
    }).compile();

    service = module.get<AerolineaService>(AerolineaService);
    repository = module.get<Repository<AerolineaEntity>>(getRepositoryToken(AerolineaEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all aerolineas', async () => {
    const result = await service.findAll();
    expect(result).toEqual(aerolineaList);
  });

  it('findOne should return an aerolinea by ID', async () => {
    const aerolinea = aerolineaList[0];
    const result = await service.findOne(aerolinea.id);
    expect(result).toEqual(aerolinea);
  });

  it('create should fail if the fundation date is in the future', async () => {
    const newAerolinea = {
      ...aerolineaList[0],
      fechaFundacion: new Date(new Date().getTime() + 86400000), // Fecha en el futuro
    };
    try {
      await service.create(newAerolinea as AerolineaEntity);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('create should succeed with a past fundation date', async () => {
    const newAerolinea = {
      ...aerolineaList[0],
      fechaFundacion: new Date(new Date().getTime() - 86400000), // Fecha en el pasado
    };
    const result = await service.create(newAerolinea as AerolineaEntity);
    expect(result).toEqual(newAerolinea);
  });

  it('update should fail if the aerolinea is not found', async () => {
    try {
      await service.update(faker.datatype.uuid(), {});
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('update should fail if the fundation date is in the future', async () => {
    const aerolineaToUpdate = {
      ...aerolineaList[0],
      fechaFundacion: new Date(new Date().getTime() + 86400000), // Fecha en el futuro
    };
    try {
      await service.update(aerolineaList[0].id, aerolineaToUpdate as Partial<AerolineaEntity>);
    } catch (e) {
      expect(e).toBeInstanceOf(BadRequestException);
    }
  });

  it('delete should remove an aerolinea', async () => {
    const aerolineaIdToDelete = aerolineaList[0].id;
    await service.delete(aerolineaIdToDelete);
    expect(deleteSpy.calledWithId).toEqual(aerolineaIdToDelete);
  });
});

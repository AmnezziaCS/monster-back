import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MonsterModule } from '../src/monster.module';
import { PrismaService } from '../src/prisma.service';

describe('MonsterController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MonsterModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        monster: {
          findMany: jest.fn().mockResolvedValue([]),
          findUnique: jest.fn().mockResolvedValue(null),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/monsters (GET)', () => {
    return request(app.getHttpServer())
      .get('/monsters')
      .expect(200)
      .expect([]);
  });

  it('/monsters/123 (GET) - not found', () => {
    return request(app.getHttpServer())
      .get('/monsters/123')
      .expect(404);
  });
});

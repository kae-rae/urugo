import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../apps/api/src/modules/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) should return health JSON', async () => {
    const res = await request(app.getHttpServer()).get('/').expect(200);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(Array.isArray(res.body.endpoints)).toBe(true);
  });
});

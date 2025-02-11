import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CommsModule } from './comms.module';

describe('CommsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [CommsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('getNextDelivery', () => {
    it('should require a user ID in the URL', async () => {
      return request(app.getHttpServer())
        .get('/comms/your-next-delivery/')
        .expect(404);
    });

    it('should return 404 if user not found', async () => {
      return request(app.getHttpServer())
        .get('/comms/your-next-delivery/123')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toStrictEqual('User not found');
        });
    });

    it.todo(
      'should return 401 if authentication fails (and other similar checks)',
    );

    // For the purposes of the exercise I'm hardcoding information in the
    // data.json file. In real life we'd use a test database with mock data
    it.each([
      {
        id: '618f4ed6-1c5b-4993-a149-f64700bf31dd',
        firstName: 'Cordell',
        cats: 'Betsy',
        price: '69.00',
        freeGift: false,
      },
      {
        id: '749cf471-3747-40c6-9a38-f6e94242c4a2',
        firstName: 'Jamarcus',
        cats: 'Ryann and Tina',
        price: '115.00',
        freeGift: false,
      },
      {
        id: '76d6eb8d-5c2e-49f7-b798-d69700dda4c3',
        firstName: 'Dolores',
        cats: 'Destiny, Tiffany and Alexandre',
        price: '186.25',
        freeGift: true,
      },
    ])(
      'should return the expected message',
      async ({ id, firstName, cats, price, freeGift }) => {
        return request(app.getHttpServer())
          .get(`/comms/your-next-delivery/${id}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.title).toStrictEqual(
              `Your next delivery for ${cats}`,
            );
            expect(res.body.message).toStrictEqual(
              `Hey ${firstName}! In two days' time, we'll be charging you for ${cats}'s fresh food.`,
            );
            expect(res.body.totalPrice).toStrictEqual(price);
            expect(res.body.freeGift).toStrictEqual(freeGift);
          });
      },
    );
  });
});

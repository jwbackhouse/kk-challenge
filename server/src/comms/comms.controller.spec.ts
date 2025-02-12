import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
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

    // Have added a user to data.json for this scenario, assuming
    // it could happen in real life
    it('should return 404 if user has no active subscriptions', async () => {
      return request(app.getHttpServer())
        .get('/comms/your-next-delivery/5d44721c-2af4-495b-9c83-d4c31ed73be4')
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toStrictEqual(
            'User has no active subscriptions',
          );
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
        id: '33b449a6-d92b-4609-9910-69a8979a04b2',
        firstName: 'Pete',
        cats: 'Braulio and Georgianna',
        price: '137.25',
        freeGift: true,
      },
      {
        id: 'ea17433d-7527-45a5-acbc-2e2f78f95c6e',
        firstName: 'Santiago',
        cats: 'Cristina, Mariah and Rebekah',
        price: '197.50',
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

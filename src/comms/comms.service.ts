import { Injectable } from '@nestjs/common';
import { concatenateCats } from '../utils/text';
import { Cat, PouchSize, User } from './comms.schema';

@Injectable()
export class CommsService {
  private static prices: Record<PouchSize, number> = {
    A: 55.5,
    B: 59.5,
    C: 62.75,
    D: 66,
    E: 69,
    F: 71.25,
  };

  getTotalPrice(cats: Array<Cat>) {
    let totalPrice = 0;

    cats.forEach((cat) => {
      totalPrice += CommsService.prices[cat.pouchSize];
    });

    return totalPrice;
  }

  getNextDeliveryMessage(user: User, price: number) {
    const { cats, firstName } = user;
    const catNames = concatenateCats(cats);

    // Ideally this text would live in a separate file for ease of editing.
    // Possibly in a CMS so changes can be made without needing a deployment.
    // This would also allow for translations.
    const title = `Your next delivery for ${catNames}`;
    const message = `Hey ${firstName}! In two days' time, we'll be charging you for ${catNames}'s fresh food.`;

    const totalPrice = price.toFixed(2);
    const freeGift = price > 120;

    return {
      title,
      message,
      totalPrice,
      freeGift,
    };
  }
}

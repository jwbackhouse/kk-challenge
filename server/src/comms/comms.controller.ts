import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import { User } from './comms.schema';
import { CommsService } from './comms.service';

const readFile = promisify(fs.readFile);

@Controller('comms')
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  async getNextDelivery(@Param('userId') userId: string) {
    const data = await readFile('data.json', 'utf8');

    const users: Array<User> = JSON.parse(data);
    const user = users.find((user) => user.id === userId);
    if (!user) {
      // We may not want to return a message for security purpooses,
      // but have included here for clarity
      throw new NotFoundException('User not found');
    }

    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);
    if (!activeCats.length) {
      throw new NotFoundException('User has no active subscriptions');
    }

    const price = this.commsService.getTotalPrice(activeCats);
    const result = this.commsService.getNextDeliveryMessage({
      firstName: user.firstName,
      cats: activeCats,
      price,
    });

    return result;
  }
}

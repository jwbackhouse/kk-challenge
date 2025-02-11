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
      throw new NotFoundException('User not found');
    }

    const price = this.commsService.getTotalPrice(user.cats);
    const result = this.commsService.getNextDeliveryMessage(user, price);

    return result;
  }
}

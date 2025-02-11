import { Module } from '@nestjs/common';
import { CommsController } from './comms.controller';

@Module({
  controllers: [CommsController],
})
export class CommsModule {}

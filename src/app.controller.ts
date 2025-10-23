import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Monster } from './types/types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/monsters')
  getHello(): Monster[] {
    return this.appService.getAllMonsters();
  }
}

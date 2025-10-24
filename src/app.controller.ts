import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Monster } from './types/globalTypes';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/monsters')
  @ApiResponse({
    status: 200,
    description: 'List of all monsters successfully retrieved.',
  })
  getHello(): Monster[] {
    return this.appService.getAllMonsters();
  }

  @Get('/monsters/:id')
  getMonsterById(@Param('id') id: string): Monster | undefined {
    return this.appService.getMonsterById(Number(id));
  }
}

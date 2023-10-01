/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { DasboardService } from '../service/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DasboardService) {}

  @Get('/')
  async upload(): Promise<any> {
    return await this.dashboardService.getDashborad();
  }
}

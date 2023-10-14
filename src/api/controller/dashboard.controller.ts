/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { DasboardService } from '../service/dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DasboardService) {}

  @Get('/admin')
  async upload(): Promise<any> {
    return await this.dashboardService.getDashborad();
  }

  @Get('/hr')
  async hrDash(): Promise<any> {
    return await this.dashboardService.getHrDashborad();
  }
  @Get('/brandrep')
  async brandDash(): Promise<any> {
    return await this.dashboardService.getBrandRepDashboard();
  }
  @Get('/management')
  async managementDash(): Promise<any> {
    return await this.dashboardService.getManagementDashboard();
  }
}

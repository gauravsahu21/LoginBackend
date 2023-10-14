/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import HttpResponse from 'src/common/lib/http-response';
import DashboardRepository from 'src/db/repository/dashboard.repository';

@Injectable()
export class DasboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getDashborad() {
    try {
      const response = await this.dashboardRepository.getDashborad();
      return HttpResponse.success(
        response,
        'Admin Dashboard Data Fetched succesfully',
        200,
      );
    } catch (error) {
        return HttpResponse.error(error.message);
    }
  }

  async getHrDashborad() {
    try {
      const response = await this.dashboardRepository.getHrDashboard();
      return HttpResponse.success(
        response,
        'Hr Dashboard Data Fetched succesfully',
        200,
      );
    } catch (error) {
        return HttpResponse.error(error.message);
    }
  }

  async getManagementDashboard() {
    try {
      const response = await this.dashboardRepository.getManagementDashboard();
      return HttpResponse.success(
        response,
        'Management Dashboard Data Fetched succesfully',
        200,
      );
    } catch (error) {
        return HttpResponse.error(error.message);
    }
  }

  async getBrandRepDashboard() {
    try {
      const response = await this.dashboardRepository.getBrandRepDash();
      return HttpResponse.success(
        response,
        'Brand Representative Dashboard Data Fetched succesfully',
        200,
      );
    } catch (error) {
        return HttpResponse.error(error.message);
    }
  }
}

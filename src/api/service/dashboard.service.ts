import { Injectable } from '@nestjs/common';
import HttpResponse from 'src/common/lib/http-response';
import DashboardRepository from 'src/db/repository/dashboard.repository';

@Injectable()
export class DasboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getDashborad() {
    try {
      let response = await this.dashboardRepository.getDashborad();
      return HttpResponse.success(
        response,
        'Dashboard Data Fetched succesfully',
        200,
      );
    } catch (error) {
        return HttpResponse.error(error.message);
    }
  }
}

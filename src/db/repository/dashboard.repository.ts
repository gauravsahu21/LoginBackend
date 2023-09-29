/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DashboardRepository {
  async getDashborad() {
    return {
      horizontalBarChart: {
        SMS: [1, 2, 3, 4, 4],
        call: [2, 3, 4, 5, 6],
        contactForm: [2, 3, 4, 5, 6],
      },
      verticalBarChart: {
        brands: 50,
        catelogues: 60,
        videos: 70,
        certificates: 90,
        aboutUs: 90,
        home: 89,
      },
      queryStatus: {
        addressed: 90,
        pending: 78,
      },
      heatmap: {},
    };
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DashboardRepository {
  async getDashborad() {
    return {
      verticalBarChart: {
        label: ['Jan', 'Feb', 'Mar', 'Apr'],
        sms: [1, 2, 3, 4],
        call: [2, 3, 4, 5],
        contactForm: [2, 3, 4, 5],
      },
      horizontalBarChart: {
        brands: 50,
        catelogues: 60,
        videos: 70,
        certificates: 90,
        aboutus: 90,
        home: 89,
      },
      queryStatus: [90,78],
      heatmap: {},
      visits:{
        week:{
          unique: 100,
          total: 200
        },
        month:{
          unique: 100,
          total: 200
        }
      }
    };
  }
}

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export default class DashboardRepository {
  async getDashborad() {
    return {
      heatmap: [
        ['BLR', 75],
        ['BLZ', 73],
        ['RUS', 120],
        ['RWA', 88],
        ['IND', 100],
        ['AUS', 120],
        ['USA', 120],
      ],
      analytics: {
        last7Days: {
          uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
          totalVistors: { count: 20, percentage: 18, trend: 'up' },
        },
        last30Days: {
          uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
          totalVistors: { count: 20, percentage: 18, trend: 'down' },
        },
        pageUserCount: {
          certificate: 10,
          videos: 20,
          careers: 130,
          brands: 2400,
          aboutus: 55,
          home: 5003,
        },
      },
      queries: {
        overview: { addressed: 80, pending: 20 },
        monthlyCounts: {
          jan: [12, 15, 90],
          feb: [15, 15, 190],
          mar: [12, 150, 90],
          apr: [100, 135, 490],
          may: [12, 135, 190],
          jun: [124, 151, 904],
          jul: [2, 5, 9],
          aug: [122, 115, 490],
          sep: [123, 135, 90],
          oct: [12, 151, 90],
          nov: [12, 15, 90],
          dec: [12, 15, 290],
        },
      },
    };
  }
}

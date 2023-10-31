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

  async getHrDashboard() {
    return {
      positions: { closed: '20', open: 10, publish: 5 },
      departments: {
        dept1: {
          applicants: 10,
          shortlists: 2,
          interview: 1,
          offer: 0,
          rejected: 12,
        },
        dept2: {
          applicants: 10,
          shortlists: 2,
          interview: 1,
          offer: 0,
          rejected: 2,
        },
      },
      recruitmentFunnel: {
        applied: 100,
        shortlist: 10,
        interview: 5,
        hired: 1,
      },
      applicants: [
        {
          jobid: '12345',
          candidateName: 'Rajesh Kumar',
          appliedDate: '23/oct/2023',
          currentStatus: 'Interview',
        },
        {
          jobid: '12345',
          candidateName: 'Suresh Kumar',
          appliedDate: '23/oct/2023',
          currentStatus: 'Hired',
        },
        {
          jobid: '12345',
          candidateName: 'Mahesh Kumar',
          appliedDate: '23/oct/2023',
          currentStatus: 'Shortlisted',
        },
      ],
    };
  }

  async getManagementDashboard() {
    return {
      analytics: [
        {
          last7Days: {
            uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
            totalVistors: { count: 20, percentage: 18, trend: 'up' },
          },
          last30Days: {
            uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
            totalVistors: { count: 20, percentage: 18, trend: 'down' },
          },
          brandLogo: 'https://eu2.contabostorage.com/9dd2a840e58b42c489771172af879655:brand/588df699-579a-4f85-be0c-b81329408d35.png',
          highVisit:{
            "product1":"40",
            "product2":"30",
            "product3":"20",
            "product4":"50",
            "product5":"30",
          
          },
          lowVisit:{
            "product1":"40",
            "product2":"30",
            "product3":"20",
            "product4":"50",
            "product5":"30",
          
          }
        },
        {
          last7Days: {
            uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
            totalVistors: { count: 20, percentage: 18, trend: 'up' },
          },
          last30Days: {
            uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
            totalVistors: { count: 20, percentage: 18, trend: 'down' },
          },
          brandLogo: 'https://eu2.contabostorage.com/9dd2a840e58b42c489771172af879655:brand/686e4e9b-ef54-4144-a2df-5c565903a90d.png',
          highVisit:{
            "product1":"40",
            "product2":"30",
            "product3":"20",
            "product4":"50",
            "product5":"30",
          
          },
          lowVisit:{
            "product1":"40",
            "product2":"30",
            "product3":"20",
            "product4":"50",
            "product5":"30",
          
          }
        },
      ],
      pageUserCount: {
        certificate: 10,
        videos: 20,
        careers: 130,
        brands: 2400,
        aboutus: 55,
        home: 5003,
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

  async getBrandRepDash() {
    return {
      analytics: {
        last7Days: {
          uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
          totalVistors: { count: 20, percentage: 18, trend: 'up' },
        },
        last30Days: {
          uniqueVistors: { count: 20, percentage: 18, trend: 'up' },
          totalVistors: { count: 20, percentage: 18, trend: 'down' },
        },
        brandLogo: 'https://eu2.contabostorage.com/9dd2a840e58b42c489771172af879655:brand/588df699-579a-4f85-be0c-b81329408d35.png',
        highVisit:{
          "product1":"40",
          "product2":"30",
          "product3":"20",
          "product4":"50",
          "product5":"30",        
        },
        lowVisit:{
          "product1":"40",
          "product2":"30",
          "product3":"20",
          "product4":"50",
          "product5":"30",
        }
      },
      pageUserCount: {
        certificate: 10,
        videos: 20,
        careers: 130,
        brands: 2400,
        aboutus: 55,
        home: 5003,
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

/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import HttpResponse from 'src/common/lib/http-response';
import { VideoDto } from 'src/common/dto/videos.dto';
import VideoRepository from 'src/db/repository/videos.repository';
import logger from '../../connections/logger/logger';

@Injectable()
export class VideoService {
  constructor(private readonly videoRepository: VideoRepository) {}

  async getAllVideo() {
    try {
      let response = await this.videoRepository.getAllVideo();
      return HttpResponse.success(
        response,
        'Video All Data Fetched succesfully',
        200,
      );
    } catch (error) {
      logger.info("Error occured in getAllVideo.Service")
      logger.error(error)
        return HttpResponse.error(error.message);
    }
  }

  async createVideo(videoData: VideoDto) {
    try {
      let response = await this.videoRepository.createVideo(videoData);
      if (response) {
        return HttpResponse.success(
          null,
          'Video Data Updated succesfully',
          200,
        );
      } else {
        
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in createVideo.Service")
      logger.error(error)
        return HttpResponse.error(error.message);
    }
  }

  async deleteVideo(videoId: string) {
    try {
       let response = await this.videoRepository.deleteVideo(videoId);
      if (response) {
        return HttpResponse.success(null, 'Video Deleted succesfully', 200);
      } else {
        return HttpResponse.error('Something Went wrong');
      }
    } catch (error) {
      logger.info("Error occured in deleteVideo.Service")
      logger.error(error)
        return HttpResponse.error(error.message);
    }
  }
}

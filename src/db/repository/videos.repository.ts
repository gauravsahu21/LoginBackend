/* eslint-disable prettier/prettier */
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { VideoDto } from 'src/common/dto/videos.dto';
import { VideoEntity } from '../entity/videos.entity';

@Injectable()
export default class VideoRepository {
  async getAllVideo() {
    try {
      const response = await VideoEntity.find();
      return response;
    } catch (error) {
      console.log(VideoEntity,"dasdasdasdasdsadadadadsad")
      console.log(error,"dasdadsadadsa")
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async createVideo(videoData: VideoDto) {
    try {
      
      const { videoId, videoBucketId, description, duration, tags, title,orderId,s3link } =
        videoData;
        console.log(Number(orderId),"!@#")
      const isExited = await VideoEntity.findOne({
        where: { videoId: videoId },
      });
      if (isExited && videoId) {
        
        isExited.title = title;
        isExited.orderId = Number(orderId);
        isExited.duration =duration;
        isExited.description = description;
        isExited.videoBucketId = videoBucketId;
        isExited.s3link = s3link;
        isExited.tags = tags;
        await VideoEntity.save(isExited);
      } else {
        const video = new VideoEntity();
        video.videoId = uuidv4();
        video.orderId =Number(orderId);
        video.title = title;
        video.duration = duration;
        video.description = description;
        video.videoBucketId = videoBucketId;
        video.s3link = s3link;
        video.tags = tags;
        await VideoEntity.save(video);
      }
      return true;
    } catch (error) {
        console.log(error.message)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async deleteVideo(videoId: string) {
    try {
      const isExited = await VideoEntity.findOne({
        where: { videoId: videoId },
      });
      if (isExited) {
        let response = await VideoEntity.delete(videoId);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}

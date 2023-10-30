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
import logger from '../../connections/logger/logger';

@Injectable()
export default class VideoRepository {
  async getAllVideo() {
    try {
      const response = await VideoEntity.find();
      response.sort((a, b) => a.orderId - b.orderId);
      return response;
    } catch (error) {
      logger.info("Error occured in getAllVideo.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async createVideo(videoData: VideoDto) {
    try {
      const {
        videoId,
        videoBucketId,
        description,
        duration,
        tags,
        title,
        orderId,
        s3link,
      } = videoData;
      console.log(Number(orderId), '!@#');
      const isExited = await VideoEntity.findOne({
        where: { videoId: videoId },
      });
      console.log(isExited);
      if (isExited && videoId) {
        if (isExited.orderId != Number(orderId)) {
          if (isExited.orderId > Number(orderId)) {
            console.log('yes its updating');
            const videoIdLower = orderId;
            const videoIdUpper = isExited.orderId;

            await VideoEntity.createQueryBuilder()
              .update(VideoEntity)
              .set({ orderId: () => `orderId+1` })
              .where('orderId >= :videoIdLower  AND orderId < :videoIdUpper', {
                videoIdLower,
                videoIdUpper,
              })
              .execute();
          }

          if (isExited.orderId < Number(orderId)) {
            console.log('yes its updating');
            const videoIdLower = orderId;
            const videoIdUpper = isExited.orderId;

            await VideoEntity.createQueryBuilder()
              .update(VideoEntity)
              .set({ orderId: () => `orderId-1` })
              .where('orderId > :videoIdUpper  AND orderId <= :videoIdLower', {
                videoIdLower,
                videoIdUpper,
              })
              .execute();
          }
        }

        isExited.title = title;
        isExited.orderId = Number(orderId);
        isExited.duration = duration;
        isExited.description = description;
        isExited.videoBucketId = videoBucketId;
        isExited.s3link = s3link;
        isExited.tags = tags;
        await VideoEntity.save(isExited);
      } else {
        const video = new VideoEntity();
        
        video.videoId = uuidv4();
        video.orderId = Number(orderId);
        video.title = title;
        video.duration = duration;
        video.description = description;
        video.videoBucketId = videoBucketId;
        video.s3link = s3link;
        video.tags = tags;
        await VideoEntity.save(video);
        
        await VideoEntity.createQueryBuilder()
        .update(VideoEntity)
        .set({ orderId: () => `orderId+1` })
        .where('orderId > :orderId', {orderId})
        .execute();
      }
      return true;
    } catch (error) {
      logger.info("Error occured in createVideo.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }

  async deleteVideo(videoId: string) {
    try {
      const isExited = await VideoEntity.findOne({
        where: { videoId: videoId },
      });
      if (isExited) {
        const response = await VideoEntity.delete(videoId);
        const videoIdUpper = isExited.orderId;
        await VideoEntity.createQueryBuilder()
          .update(VideoEntity)
          .set({ orderId: () => `orderId-1` })
          .where('orderId >= :videoIdUpper ', { videoIdUpper })
          .execute();

        return true;
      } else {
        return false;
      }
    } catch (error) {
      logger.info("Error occured in deleteVideo.Repo")
      logger.error(error)
      throw new HttpException('Something went wrong!', HttpStatus.NOT_FOUND);
    }
  }
}

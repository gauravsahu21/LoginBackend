import { Controller, Get, Post, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { VideoService } from '../service/videos.service';
import { VideoEntity } from '../../db/entity/videos.entity';
import { VideoDto } from 'src/common/dto/videos.dto';
import { WriteAccess } from '../jwt-auth.guard';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  async getAllVideo() {
    return await this.videoService.getAllVideo();
  }

  @Post()
  @UseGuards(WriteAccess)
  async createVideo(@Body() videoData: VideoDto) {
    return await this.videoService.createVideo(videoData);
  }

  @Delete()
  @UseGuards(WriteAccess)
  async deleteVideo(@Query('id')videoId: string){
    return await this.videoService.deleteVideo(videoId);
  }
}

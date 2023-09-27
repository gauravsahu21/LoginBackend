import { Controller, Get, Post, Delete, Param, Body, UseGuards, Query } from '@nestjs/common';
import { VideoService } from '../service/videos.service';
import { VideoEntity } from '../../db/entity/videos.entity';
import { VideoDto } from 'src/common/dto/videos.dto';
import { PermissionsAuthGuard, WriteAccess } from '../jwt-auth.guard';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @UseGuards(PermissionsAuthGuard)
  async getAllVideo() {
    return await this.videoService.getAllVideo();
  }

  @Post()
  @UseGuards(PermissionsAuthGuard)
  async createVideo(@Body() videoData: VideoDto) {
    return await this.videoService.createVideo(videoData);
  }

  @Delete()
  @UseGuards(PermissionsAuthGuard)
  async deleteVideo(@Query('id')videoId: string){
    return await this.videoService.deleteVideo(videoId);
  }
}

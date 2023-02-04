import { Controller } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body, Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { LocationDto } from './dto/locationDto';

import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
    constructor(private readonly locationService: LocationService) {}

    @Get(':location')
    async findByName(@Param('location') locationDto: string) {
    return await this.locationService.findByName(locationDto);
    }
}

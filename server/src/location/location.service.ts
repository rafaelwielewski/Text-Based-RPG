import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationDto } from './dto/locationDto';
import { Location } from './types/location.entity';

@Injectable()
export class LocationService {
    constructor(@InjectRepository(Location)
    private locationRepository: Repository<Location>,
  ) {}

  async findByName(locationDto: string) {

    return this.locationRepository.findOne({where: {
        name: locationDto,
    },});
  }

}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdeaDTO } from './idea.dto';
import { IdeaEntity } from './idea.entity';

@Injectable()
export class IdeaService {
  constructor(
    //Tell Nestjs and TypeOrm to inject the entity - @InjectRepository
    //inject the entity into the service - ideaRepository
    @InjectRepository(IdeaEntity)
    private ideaRepository: Repository<IdeaEntity>,
  ) {}

  async showAll() {
    return await this.ideaRepository.find();
  }

  async create(data: IdeaDTO) {
    const idea = await this.ideaRepository.create(data);
    await this.ideaRepository.save(data);
    return idea;
  }

  async read(id: string) {
    try {
      const idea = await this.ideaRepository.findOne({ where: { id } });
      return idea;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, data: Partial<IdeaDTO>) {
    try {
      let idea = await this.ideaRepository.findOne({ where: { id } });
      await this.ideaRepository.update({ id }, data);
      return (idea = await this.read(id));
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async destroy(id: string) {
    try {
      const idea = await this.ideaRepository.findOne({ where: { id } });
      await this.ideaRepository.delete({ id });
      return idea;
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }
}

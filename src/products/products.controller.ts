import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { GetProductDTO } from './products.dto';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findOne(id)
  }

  @Get()
  async findAll() {
    return this.service.findAll()
  }

  @Post()
  async create(@Body() createCatDto: GetProductDTO) {
    return this.service.create(createCatDto)
  }
}

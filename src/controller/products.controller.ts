import {
  Controller,
  Get,
  Param,
  Query,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ProductsService } from './../service/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getProducts(
    @Query('brand') brand: string,
    @Query('limit') limit = 100, // eslint-disable-line @typescript-eslint/no-unused-vars
    @Query('offset') offset = 50, // eslint-disable-line @typescript-eslint/no-unused-vars
  ) {
    return this.productService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `yo soy un filtro`,
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return this.productService.findOne(+productId);
  }

  @Post()
  create(@Body() payload: any) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return this.productService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}

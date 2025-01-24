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

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
  ) {
    return {
      message: `products: limit=> ${limit} offset=>${offset}brand=>${brand}`,
    };
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `yo soy un  `,
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return {
      message: `product ${productId}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'acccion de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return id;
  }
}

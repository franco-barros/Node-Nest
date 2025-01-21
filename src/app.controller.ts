import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hola mundo';
  }
  @Get('nuevo')
  nuevoEndpoint() {
    return 'Yo soy nuevo ';
  }
  @Get('/ruta/')
  hello() {
    return 'con /sas/';
  }

  @Get('products')
  getProducts(
    @Query('brand') brand: string,
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
  ) {
    return `products: limit=> ${limit} offset=>${offset} brand=>${brand}`;
  }

  @Get('products/filter')
  getProductFilter() {
    return `yo soy un filter `;
  }

  @Get('products/:productId')
  getProduct(@Param('productId') productId: string) {
    return `product ${productId}`;
  }

  @Get('categories/:id/products/:productId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and category ${id}`;
  }
}

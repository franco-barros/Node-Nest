import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dtos';
import { Product } from './../entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'prueba',
      price: 123,
      stock: 13,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: this.getNextId(),
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  private getNextId(): number {
    return Math.max(0, ...this.products.map((p) => p.id)) + 1;
  }

  update(id: number, payload: UpdateProductDto) {
    const productIndex = this.products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const updatedProduct = {
      ...this.products[productIndex],
      ...payload,
    };

    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  delete(id: number) {
    const productIndex = this.products.findIndex((item) => item.id === id);

    if (productIndex === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    const deletedProduct = this.products.splice(productIndex, 1);
    return {
      message: `Product with ID ${id} has been deleted`,
      deletedProduct,
    };
  }
}

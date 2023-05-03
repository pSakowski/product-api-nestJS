import { Controller, Delete, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  public deleteById(@Param('id') id: string): string {
    return this.productsService.deleteById(id);
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    const newProduct = this.productsService.create(productData);
    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }
}

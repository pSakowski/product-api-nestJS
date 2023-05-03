import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = this.productsService.getById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = this.productsService.deleteById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { success: true };
  }

  @Post('/')
  create(@Body() productData: CreateProductDTO) {
    const newProduct = this.productsService.create(productData);
    return {
      message: 'Product created successfully',
      data: newProduct,
    };
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!this.productsService.getById(id))
      throw new NotFoundException('Product not found');

    this.productsService.updateById(id, productData);
    return { success: true };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  public async getById(id: string): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  public async deleteById(id: string): Promise<string> {
    await this.prismaService.product.delete({
      where: { id },
    });
    return `Product with id ${id} has been deleted`;
  }

  public create(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  }

  public updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData,
    });
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { db, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getById(id: string): Product {
    const product = db.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  public deleteById(id: string): string {
    const index = db.products.findIndex((p) => p.id === id);
    db.products.splice(index, 1);
    return `Product with id ${id} has been deleted`;
  }
}

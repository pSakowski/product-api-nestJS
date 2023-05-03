import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/db';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get()
  getAll(): Order[] {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.ordersService.getById(id);
  }
}

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
import { OrdersService } from './orders.service';
import { Order } from 'src/db';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}
  @Get()
  getAll(): Order[] {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = this.ordersService.getById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  @Delete('/:id')
  deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = this.ordersService.deleteById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return { success: true };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    const newOrder = this.ordersService.create(orderData);
    return {
      message: 'Order created successfully',
      data: newOrder,
    };
  }

  @Put('/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!this.ordersService.getById(id))
      throw new NotFoundException('Order not found');

    this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}

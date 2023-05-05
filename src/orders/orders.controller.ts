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
import { CreateOrderDTO } from './dtos/create-order.dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  async getAll() {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    await this.ordersService.deleteById(id);
    return { message: `Order with id ${id} has been deleted` };
  }

  @Post('/')
  async create(@Body() orderData: CreateOrderDTO) {
    const newOrder = await this.ordersService.create(orderData);
    return {
      message: 'Order created successfully',
      data: newOrder,
    };
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');

    await this.ordersService.updateById(id, orderData);
    return { message: `Order with id ${id} has been updated` };
  }
}

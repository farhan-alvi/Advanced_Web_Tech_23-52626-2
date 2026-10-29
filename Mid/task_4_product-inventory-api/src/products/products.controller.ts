
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
    Query,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Products> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  
@Get('search')
search(@Query('keyword') keyword: string): Promise<Products[]> {
  return this.productsService.search(keyword);
}

@Get('category/:cat')
findByCategory(@Param('cat') category: string): Promise<Products[]> {
  return this.productsService.findByCategory(category);
}


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Products> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: PartialUpdateProductDto,
  ): Promise<Products> {
    return this.productsService.update(id, updateProductDto);
  }

  @Put(':id')
  replace(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    return this.productsService.replace(id, updateProductDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.productsService.remove(id);
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id', ParseIntPipe) id: number): Promise<Products> {
    return this.productsService.toggleActive(id);
  }
}

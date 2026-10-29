
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Products } from './entities/products.entity.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Products> {
    const product = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Products> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(
    id: number,
    updateProductDto: PartialUpdateProductDto,
  ): Promise<Products> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async replace(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Products> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);

    return { message: `Product with ID ${id} deleted successfully` };
  }

  async toggleActive(id: number): Promise<Products> {
    const product = await this.findOne(id);
    product.isActive = !product.isActive;
    return this.productsRepository.save(product);
  }

  
async findByCategory(category: string): Promise<Products[]> {
  return this.productsRepository.find({
    where: { category },
    order: { createdAt: 'DESC' },
  });
}

async search(keyword: string): Promise<Products[]> {
  return this.productsRepository
    .createQueryBuilder('product')
    .where('product.name ILIKE :keyword', {
      keyword: `%${keyword}%`,
    })
    .orderBy('product.createdAt', 'DESC')
    .getMany();
}

}

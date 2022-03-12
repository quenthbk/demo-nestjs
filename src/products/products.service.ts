import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Product } from 'src/interfaces/product.interface';

@Injectable()
export class ProductService {
  private readonly products: Product[] = []

  findAll(): Product[] {
    return this.products
  }

  async create(product: Product): Promise<Product> {
    // JUST FOR TEST
    const prod = {...product, id: this.products.length}
    this.products.push(prod)
    const {data} = await axios.get('http://localhost:3000/')
    prod.name = data
    return prod
  }

  async findOne(id: number): Promise<Product> {
    const {data} = await axios.get('http://localhost:3000/')
    return {
      name: data,
      id: id
    }
  }
}

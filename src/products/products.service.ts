import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model'

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(productId: string): Product {
    const [product] = this.findProductById(productId);
    return { ...product };
  }

  insertProduct(title: string, desc: string, price: number) {
    const prodId = Math.random().toString();
    const newProduct = new Product(prodId, title, desc, price);
    this.products.push(newProduct);
    return prodId;
  }

  updateProduct(
    productId: string,
    title: string,
    description: string,
    price: number,
  ): string {
    const [product, index] = this.findProductById(productId);
    const updatedProduct = { ...product };
    if (title != null) updatedProduct.title = title;
    if (description != null) updatedProduct.description = description;
    if (price != null) updatedProduct.price = price;
    this.products[index] = updatedProduct;
    return productId;
  }

  private findProductById(productId: string): [Product, number] {
    const productIndex = this.products.findIndex(
      (product) => product.id === productId,
    );
    const product = this.products[productIndex];
    if (product == null) {
      throw new NotFoundException('Could not find product.');
    }
    return [product, productIndex];
  }
}
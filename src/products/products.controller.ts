import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Product } from './product.model';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  getAllProducts(): Product[] {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') prodId: string): Product {
    return this.productService.getProductById(prodId);
  }

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,
  ): { id: string } {
    const newProductId = this.productService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice,
    );
    return { id: newProductId };
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateProduct(prodId, prodTitle, prodDesc, prodPrice);
  }
}

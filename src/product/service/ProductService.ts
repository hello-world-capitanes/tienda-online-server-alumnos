export class ProductService {
  private static _productService: ProductService;

  constructor() {}

  public static getInstance() {
    return !!ProductService._productService
      ? ProductService._productService
      : new ProductService();
  }

}
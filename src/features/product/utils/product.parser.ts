import { Product } from "../models/product.model";

export class ProductParser {

    public static parse(productDatabase: Product, productInput: Product): Product {
        const productOutput: Product = ({...productDatabase} as Product);

        productOutput.name = (!productInput?.name || productInput.name?.length <= 0 ? productOutput.name : productInput.name);
        productOutput.image = (!productInput?.image || productInput.image?.length <= 0 ? productOutput.image : productInput.image);
        productOutput.price = (Number.isNaN(productInput?.price) ? productOutput.price : productInput.price);
        
        return productOutput;
    }
}
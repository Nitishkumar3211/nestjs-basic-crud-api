
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {

    products: Product[] = [];

    insertProduct(name: string, productscription: string, price: number){
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, name, productscription, price ) 
        this.products.push(newProduct);
        return prodId;

    }


    getProducts(){
        return [...this.products];
    }

    getProduct(productId: string){
        const product = this.products.find(prod => prod.productId == productId);
        if(!product){
            throw new NotFoundException('Not found such data');
            
        }
        return {...product};

    }

    updateProduct(productId: string, name: string, productscription: string, price: number){
        const [product, index ] = this.findProduct(productId);
        const updateProduct = {...product};
        if(name){
            updateProduct.productName = name;
        }
        if(productscription){
            updateProduct.description = productscription;
        }

         if(price){
            updateProduct.price = price;
        }
        this.products[index] = updateProduct;


    }


    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.productId == id);
        const product = this.products[productIndex]
        if(!product){
            throw new NotFoundException('Not found such data');
            
        }
        return [product, productIndex];
    }


    deleteProduct(productId: string){
        const index = this.findProduct(productId)[1]
        this.products.splice(index,1)
    }




}
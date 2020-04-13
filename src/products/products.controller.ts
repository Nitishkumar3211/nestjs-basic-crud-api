
import { Controller, Post, Get, Body, Param, Patch, Delete } from "@nestjs/common";
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService){}


    @Post()
    addProduct(
        @Body('productName') name: string, 
        @Body('description') productscription: string, 
        @Body('price') price: number) {
        const generatedId = this.productsService.insertProduct(name, productscription, price);
        return {id: generatedId}
    }


    @Get()
    getAllProducts(){

        return {data: this.productsService.getProducts(), status: 200, msg: "Product List"}

    }

    @Get(':id')
    getSpecificProduct(@Param('id') prodId: string) {
        return {data: this.productsService.getProduct(prodId), status: 200, msg: "Product Data"}
    }
    
    @Patch(':id')
    updateProduct(@Param('id') prodId: string, @Body('productName') name: string, @Body('description') productscription: string, @Body('price') price: number ){
        this.productsService.updateProduct(prodId, name, productscription, price)
        return null
    }


    @Delete(':id')
    removeProduct(@Param('id') prodId: string){
        this.productsService.deleteProduct(prodId)
        return null
    }
}
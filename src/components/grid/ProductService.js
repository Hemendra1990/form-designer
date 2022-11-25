
export class ProductService {

    async getProductsSmall() {
        return await fetch('./products.json').then(res => res.json()).then(d => d.data);
    }

    getProducts() {
        return fetch('data/products.json').then(res => res.json()).then(d => d.data);
    }

    async getProductsWithOrdersSmall() {
        return await fetch('data/products-orders-small.json').then(res => res.json()).then(d => d.data);
    }
}
     
import { ProductService } from "../../components/grid/ProductService";
import { UserService } from "../../components/grid/UserService";

export class DataConnector {
    constructor(meta) {
        this.meta = meta;
        this.productService = new ProductService();
        this.userService = new UserService();
    }

    /**
     * 
     * @param {This is for testing} e 
     */
    async handleDatasourceChange(element) {
        const datasource = element.attributes.datasource;
        const responseToUse = element.attributes.responseToUse;
        console.log('Event', datasource);
        let columns = [];
        let rows = [];
        if(datasource === "API-1") {
            await this.productService.getProductsSmall().then((res) => {
                res = resFun(res, responseToUse);
                if(res instanceof Array) {
                    const firstRec = res[0];
                    columns = Object.keys(firstRec).map(tCol => {
                        return {field: tCol, header: tCol[0].toUpperCase() + tCol.slice(1)}
                    });
                }

                rows = [...res];
                
            });
        
        } else if(datasource === "API-2") {
            await this.userService.getUsers().then((res) => {
                res = resFun(res, responseToUse);
                if(res instanceof Array) {
                    const firstRec = res[0];
                    columns = Object.keys(firstRec).map(tCol => {
                        return {field: tCol, header: tCol[0].toUpperCase() + tCol.slice(1)}
                    });
                }
                rows = [...res];
            });
        }
        if(element.ref.current.setResult) {
            element.ref.current.setResult({
                columns: columns,
                rows: rows
            });
        }
    }
}

const resFun = new Function('response', 'responseToUse', `
        if(responseToUse) {
            const key = responseToUse.split("response.")[1];
            return response[key];    
        }

        return [];
    `);
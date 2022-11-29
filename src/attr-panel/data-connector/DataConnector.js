import { ProductService } from "../../components/grid/ProductService";
import { UserService } from "../../components/grid/UserService";
import { createElementId } from "../../utils/Utils";

export class DataConnector {
    static columns = [];
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
        const responseToUse = element.attributes.responseToUse || 'response.data'; // used || 'response.data' for tesint
        console.log('Event', datasource);
        let rows = [];
        if(datasource === "API-1") {
            await this.productService.getProductsSmall().then((res) => {
                res = resFun(res, responseToUse);
                if(res instanceof Array) {
                    const firstRec = res[0];
                    DataConnector.columns = Object.keys(firstRec).map(tCol => {
                        return {field: tCol, header: tCol[0].toUpperCase() + tCol.slice(1), id: createElementId("column-", 7)}
                    });
                }

                rows = [...res];
                
            });
        
        } else if(datasource === "API-2") {
            await this.userService.getUsers().then((res) => {
                res = resFun(res, responseToUse);
                if(res instanceof Array) {
                    const firstRec = res[0];
                    DataConnector.columns = Object.keys(firstRec).map(tCol => {
                        return {field: tCol, header: tCol[0].toUpperCase() + tCol.slice(1), id: createElementId("column-", 7)}
                    });
                }
                rows = [...res];
            });
        }
        if(element.ref.current.setResult) {
            element.ref.current.setResult({
                columns: DataConnector.columns,
                rows: rows
            });
        }
    }

    getColumns() {
        return DataConnector.columns || [];
    }
}

const resFun = new Function('response', 'responseToUse', `
        if(responseToUse) {
            const key = responseToUse.split("response.")[1];
            return response[key];    
        }

        return [];
    `);
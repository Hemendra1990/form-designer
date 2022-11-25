

export class NodeService {

    getTreeTableNodes() {
        
        return fetch('./treetablenodes.json').then(res => res.json())
                .then(d => d.root);
    }

    getTreeNodes() {
        return fetch('./treetablenodes.json').then(res => res.json())
                .then(d => d.root);
    }
}
     
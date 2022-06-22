let nodeList = [];
let edgeList = [];
let list = [];
let level = 0;
let branch = [];

const branchData = function(curNode,curEdge,template,level){
    let outPut = []
    if((curNode && curNode.branchNum) > 1){
        edgeList.forEach(edge => {
            if(curNode.branchNum > 1 && curNode.id === edge.source.cell){
                outPut.push(edge)
            }
        })
        outPut.forEach(edge => {
            nodeList.forEach(node => {
                if(node.id === edge.target.cell){
                    template.branch.push({
                        edge:edge,
                        node:node,
                        branch:[],
                    })
                    level = level + 1;
                    listData(node, edge, branch, level); 
                }
            })
        })
    }
   
}

const listData = function(curNode,edge,branch,level) {
    const template = {
        edge:edge,
        node:curNode,
        branch:branch
    }
    list.push(template);
    const _edge = edgeList.find((val) => {
        if( curNode.id == val.source.cell ) {
            return val
        }
    })
    const _node = nodeList.find((val) => {
        if((_edge && _edge.target.cell) == val.id) {
            return val
        }
    })

    if(level === 0 && _node.branchNum === 1){
        listData(_node, _edge, branch, 0);
    }else{
        branchData(_node, _edge, template, 0);
        // listData(_node, _edge, template.branch, 1);
    }
    
}

const startData = function(graphJson) {
    let cells = graphJson.cells;
    nodeList = cells.filter((item) => {
        return item.shape !== "edge";
    });
    edgeList = cells.filter((item) => {
        return item.shape === "edge";
    });


    nodeList.forEach(node => {
        let num = 0;
        edgeList.forEach(edge => {
            if(node.id === edge.source.cell){
                num++;
                node['branchNum'] = num;
            }
        })
    })

    let startNode = nodeList.find(item => item.data.type === 'Start');

    listData(startNode,null,branch,level);
}

export const evolutionaryChain = function(graphJson) {
    startData(graphJson);
}
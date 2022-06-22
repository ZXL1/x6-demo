<template>
    <div>
        <div class="tool-wrapper">
            <el-button type="primary" @click="saveHandle">保存</el-button>
            <el-button type="primary" @click="clearHandle">清除</el-button>
            <el-button type="primary" @click="drillHandle">脚本演练</el-button>
            <el-color-picker class="default-color" v-model="defaultColor" size="medium" title="选择默认的连接颜色"></el-color-picker>
        </div>
        <div id="container">
            <div class="right-wrapper" v-if="startVisible">
                <div class=top>
                    <div class="title">{{curTitle | curTitleFilter }}</div>
                    <button class="btn" @click="startVisible = false">x</button>
                </div>
                <div class="content">
                    <component
                        :is="curComponent"
                        :myData="myData"
                        @changeChild="changeChild"
                    ></component>
                </div>
            </div>
            <div class="right-menu" :style="style" @click="deleteCell" v-if="isRightMenu">
                删除节点
            </div>
        </div>
    </div>
</template>

<script>
import CreateGraph from '../../utils/graph'
import Start from './components/Start'
import Finish from './components/Finish'
import Connect from './components/Connect'
import Dispose from './components/Dispose'
import Inquiry from './components/Inquiry'
import Risk from './components/Risk'
import Situation from './components/Situation'
import { evolutionaryChain } from './EvolutionaryChain.js'

import insertCss from 'insert-css'

export default {
    components:{Start, Finish, Connect, Dispose, Inquiry, Risk, Situation},
    data() {
        return {
            startVisible:false,
            defaultColor: '#A2B1C3',
            myGraph:{},
            curCell:{},
            curTitle:'',
            curComponent:'Start',
            myData:{},
            isRightMenu: false,
            style: {
                position: 'absolute',
                left:'0px',
                top:'0px'
            },
            nodeList:[],
            edgeList:[],
            list:[]
        }
    },
    filters: {
        curTitleFilter(status) {
            switch (status) {
                case "Start":
                    return '预案开始';
                case "Connect":
                    return '连接';
                case "Dispose":
                    return '处置指令';
                case "Inquiry":
                    return '询问';
                case "Risk":
                    return '风险提醒';
                case "Situation":
                    return '态势演练';
                case "Finish":
                    return '预案结束';
            }
        }
    },
    mounted() {
        this.preWork()
    },
    methods: {
        preWork() {
            // 这里协助演示的代码，在实际项目中根据实际情况进行调整
            const container = document.getElementById('container')
            const stencilContainer = document.createElement('div')
            stencilContainer.id = 'stencil'
            const graphContainer = document.createElement('div')
            graphContainer.id = 'graph-container'
            container.appendChild(stencilContainer)
            container.appendChild(graphContainer)

            insertCss(`
                #container {
                    position: relative;
                    display: flex;
                    height: 100vh;
                    border: 1px solid #dfe3e8;
                }
                #stencil {
                    width: 180px;
                    height: 100vh;
                    position: relative;
                    border-right: 1px solid #dfe3e8;
                }
                #graph-container {
                    width: calc(100% - 180px);
                    height: 100vh;
                }
                .x6-widget-stencil  {
                    background-color: #fff;
                }
                .x6-widget-stencil-title {
                    background-color: #fff;
                }
                .x6-widget-stencil-group-content{
                    padding-left:30px;
                }
                .x6-widget-stencil-group-title {
                    background-color: #fff !important;
                }
                .x6-widget-transform {
                    margin: -1px 0 0 -1px;
                    padding: 0px;
                    border: 1px solid #239edd;
                }
                .x6-widget-transform > div {
                    border: 1px solid #239edd;
                }
                .x6-widget-transform > div:hover {
                    background-color: #3dafe4;
                }
                .x6-widget-transform-active-handle {
                    background-color: #3dafe4;
                }
                .x6-widget-transform-resize {
                    border-radius: 0;
                }
                .x6-widget-selection-inner {
                    border: 1px solid #239edd;
                }
                .x6-widget-selection-box {
                    opacity: 0;
                }
            `)
            this.init();
        },
        init() {
            this.myGraph = CreateGraph();
            let graphJsonStr = localStorage.getItem("graphJson") || '{}';
            let graphJson = JSON.parse(graphJsonStr)
            this.myGraph.fromJSON(graphJson);
            
      
            // 点击事件
            this.myGraph.on('cell:click', ({ cell }) => {
                this.startVisible = true;
                this.isRightMenu = false;
                this.curCell = cell;
                this.curComponent = cell.getData().type;
                this.curTitle = this.curComponent;
                this.myData = cell.getData() || {};
            })

            this.myGraph.on('cell:contextmenu',({ x, y, cell }) => {
                this.curCell = cell;
                this.isRightMenu = true;
                this.style.left = (x + 230) + 'px';
                this.style.top = (y - 20) + 'px';
            })
            this.myGraph.on('blank:click', () => {
                this.isRightMenu = false;
            })

            this.myGraph.on('edge:added', ({ edge }) => {
                edge.setAttrs({line:{stroke: this.defaultColor}})
            })

        },
        saveHandle(){
            const graphJson= this.myGraph.toJSON();
            localStorage.setItem("graphJson",JSON.stringify(graphJson));
            console.log(JSON.stringify(graphJson))
            this.$message({
                type: 'success',
                message: '保存成功!'
            });
        },
        drillHandle() {
            const graphJson= this.myGraph.toJSON();
            evolutionaryChain(graphJson,this.myGraph)
        },
        changeChild(key, value){
            if(key === 'name'){
                this.curCell.setAttrs({
                    label: { text: value },
                });
            }else if(key === 'color') { // 线
                this.curCell.setAttrs({line:{stroke: value}})
            } else if(key === 'isConnect') { // 线
                this.curCell.setLabels([value])
            }
            this.curCell.setData({
                [key]:value,
            });
            
        },
        clearHandle() {
            this.$confirm('此操作将永久清除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.myGraph.clearCells()
                localStorage.setItem("graphJson",JSON.stringify({}));
                this.$message({
                    type: 'success',
                    message: '清除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消清除'
                });          
            });
        },
        deleteCell() {
            this.myGraph.removeNode(this.curCell.id);
            this.isRightMenu = false;
        }
    }
  
}
</script>

<style scoped  lang="less">
    .tool-wrapper{
        display: flex;
        align-items: center;
        text-align: left;
        padding: 10px 0;
        .default-color{
            margin-left: 10px;
        }
    }
    .right-wrapper{
        position: fixed;
        right: 0;
        width: 300px;
        height: 900px;
        border:1px solid #ccc;
        box-shadow: 2px 2px 3px #ccc;
        border-radius: 4px;
        background: #fff;
        z-index:1;
        .top{
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ccc;
            padding: 0 10px;
        }
        .btn{
            cursor: pointer;
        }
        .content{
            height: e('calc(100% - 40px)');
            padding: 10px;
            text-align: left;
            /deep/ .el-form{
                height:100%;
            }
            /deep/ .el-form--label-top .el-form-item__label{
                padding:0px;
        }
    }
    }
    .right-menu{
        display: inline-block;
        padding:10px;
        background: #ccc;
        border:1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        z-index: 1;
    }
</style>

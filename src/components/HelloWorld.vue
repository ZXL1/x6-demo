<template>
<div>
  <div class="tool-wrapper">
    <button @click="saveHandle">保存</button>
    <el-color-picker v-model="color1"></el-color-picker>
  </div>
  <div id="container">
    <div class="right-wrapper" v-if="startVisible">
      <div class=top>
        <div class="title">{{curTitle}}</div>
        <button class="btn" @click="closeHandle">x</button>
      </div>
      <div class="content" v-if="curTitle === '预案开始' || curTitle === '预案结束'">
        节点名称：{{curTitle}}
      </div>
      <div class="content" v-if="curTitle === '处置指令'">
        <el-form :model="ruleCzForm" :rules="rulesCz" ref="ruleCzForm" label-position="top" label-width="100px" class="demo-ruleCzForm">
          <el-form-item label="处置指令" prop="name">
            <el-input v-model="ruleCzForm.name"></el-input>
          </el-form-item>
        <el-form-item label="处置小组" prop="group">
          <el-select v-model="ruleCzForm.group" :value-key="ruleCzForm.group" placeholder="请选择处置小组">
            <el-option label="一组" value="yz"></el-option>
            <el-option label="二组" value="ez"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="处置人员" prop="person">
          <el-select v-model="ruleCzForm.person" :value-key="ruleCzForm.person" placeholder="请选择处置人员">
            <el-option label="组长" value="zz"></el-option>
            <el-option label="队长" value="dz"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="处置过程描述" prop="desc">
            <el-input type="textarea" v-model="ruleCzForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content" v-if="curTitle === '询问'">
        <el-form :model="ruleXwForm" :rules="rulesXw" ref="ruleXwForm" label-position="top" label-width="100px" class="demo-ruleXwForm">
          <el-form-item label="节点描述" prop="name">
            <el-input v-model="ruleXwForm.name"></el-input>
          </el-form-item>
          <el-form-item label="补充描述" prop="desc">
            <el-input type="textarea" v-model="ruleXwForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content" v-if="curTitle === '风险提醒'">
        <el-form :model="ruleFxForm" :rules="rulesFx" ref="ruleFxForm" label-position="top" label-width="100px" class="demo-ruleFxForm">
          <el-form-item label="风险类型" prop="name">
            <el-input v-model="ruleFxForm.name"></el-input>
          </el-form-item>
          <el-form-item label="补充描述" prop="desc">
            <el-input type="textarea" v-model="ruleFxForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content" v-if="curTitle === '态势演变'">
        <el-form :model="ruleTsForm" :rules="rulesTs" ref="ruleTsForm" label-position="top" label-width="100px" class="demo-ruleTsForm">
          <el-form-item label="当前态势" prop="name">
            <el-input v-model="ruleTsForm.name"></el-input>
          </el-form-item>
          <el-form-item label="补充描述" prop="desc">
            <el-input type="textarea" v-model="ruleTsForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="content" v-if="curTitle === '连接'">
        <el-form :model="ruleLjForm" :rules="rulesLj" ref="ruleLjForm" label-position="top" label-width="100px" class="demo-ruleLjForm">
          <el-form-item label="开端是否连接询问" prop="isConnect">
            <el-input v-model="ruleLjForm.isConnect"></el-input>
          </el-form-item>
          <el-form-item label="开端询问情形" prop="situation">
            <el-select v-model="ruleLjForm.situation" :value-key="ruleLjForm.situation" placeholder="请选择开端询问情形">
              <el-option label="是" value="yes"></el-option>
              <el-option label="否" value="no"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="补充描述" prop="desc">
            <el-input type="textarea" v-model="ruleLjForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="连接颜色修改" prop="colorLj">
            <el-color-picker v-model="ruleLjForm.color"></el-color-picker>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</div>
  
  
 
</template>
 
<script>
import { Graph, Shape, Addon } from '@antv/x6'
import insertCss from 'insert-css'
// import riskImg from './risk.png'
export default {
  data() {
    return {
      color1: '#409EFF',
      myGraph:{},
      startVisible:false,
      
      // 询问
      ruleXwForm:{
        name: '',
        desc: ''
      },
      // 风险提醒
      ruleFxForm:{
        name: '',
        desc: ''
      },
      // 当前态势
      ruleTsForm:{
        name: '',
        desc: ''
      },
      ruleLjForm: {
        isConnect: '',
        situation: '',
        desc: '',
        color:'#A2B1C3'
      },
      rulesCz: {
        name: [
          { required: true, message: '请输入处置指令', trigger: 'blur' },
        ],
        group: [
          { required: true, message: '请选择处置小组', trigger: 'change' }
        ],
        person: [
          { required: true, message: '请选择处置人员', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写处置过程描述', trigger: 'blur' }
        ]
      },
      rulesXw: {
        name: [
          { required: true, message: '请输入节点描述', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请填写补充描述', trigger: 'blur' }
        ]
      },
      rulesFx: {
        name: [
          { required: true, message: '请输入风险类型', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请填写补充描述', trigger: 'blur' }
        ]
      },
      rulesTs: {
        name: [
          { required: true, message: '请输入当前态势', trigger: 'blur' },
        ],
        desc: [
          { required: true, message: '请填写补充描述', trigger: 'blur' }
        ]
      },
      rulesLj: {
        isConnect: [
          { required: true, message: '请输入开端是否连接询问', trigger: 'blur' },
        ],
        situation: [
          { required: true, message: '请选择开端询问情形', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写补充描述', trigger: 'blur' }
        ]
      },
      nodeCell:{},
      edgeCell:{},
      curTitle:''
    };
  },
  watch: {

  },
  mounted(){
    this.preWork()
  },
  methods:{
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
      let graphJson = sessionStorage.getItem("graphJson")? sessionStorage.getItem("graphJson"):'{}';
      this.myGraph.fromJSON(JSON.parse(graphJson))
    },
    init() {
      const graph = new Graph({
        container: document.getElementById('graph-container'),
        grid: true,
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.5,
          maxScale: 3,
        },
        connecting: {
          router: {
            name: 'manhattan',
            args: {
              padding: 1,
            },
          },
          connector: {
            name: 'rounded',
            args: {
              radius: 8,
            },
          },
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          snap: {
            radius: 20,
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#A2B1C3',
                  strokeWidth: 2,
                  targetMarker: {
                    name: 'block',
                    width: 12,
                    height: 8,
                  },
                },
              },
              zIndex: 0,
            })
          },
          validateConnection({ targetMagnet }) {
            return !!targetMagnet
          },
        },
        highlighting: {
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              attrs: {
                fill: '#5F95FF',
                stroke: '#5F95FF',
              },
            },
          },
        },
        resizing: true,
        rotating: true,
        selecting: {
          enabled: true,
          rubberband: true,
          showNodeSelectionBox: true,
        },
        snapline: true,
        keyboard: true,
        clipboard: true,
      })
      this.myGraph = graph;
      // #endregion

      // #region 初始化 stencil
      const stencil = new Addon.Stencil({
        title: '流程图',
        target: graph,
        stencilGraphWidth: 100,
        stencilGraphHeight: 500,
        collapsable: true,
        groups: [
          {
            title: '基础流程图',
            name: 'group1',
          }
        ],
        layoutOptions: {
          columns: 1,
          columnWidth: 80,
          rowHeight: 70,
        },
      })
      document.getElementById('stencil').appendChild(stencil.container)
      // #endregion

      // #region 快捷键与事件
      // copy cut paste
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        return false
      })
      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.cut(cells)
        }
        return false
      })
      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        return false
      })

      //undo redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.history.canUndo()) {
          graph.history.undo()
        }
        return false
      })
      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.history.canRedo()) {
          graph.history.redo()
        }
        return false
      })

      // select all
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
          graph.select(nodes)
        }
      })

      //delete
      graph.bindKey('backspace', () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.removeCells(cells)
        }
      })

      // zoom
      graph.bindKey(['ctrl+1', 'meta+1'], () => {
        const zoom = graph.zoom()
        if (zoom < 1.5) {
          graph.zoom(0.1)
        }
      })
      graph.bindKey(['ctrl+2', 'meta+2'], () => {
        const zoom = graph.zoom()
        if (zoom > 0.5) {
          graph.zoom(-0.1)
        }
      })

      // 控制连接桩显示/隐藏
      const showPorts = (ports, show) => {
        for (let i = 0, len = ports.length; i < len; i = i + 1) {
          ports[i].style.visibility = show ? 'visible' : 'hidden'
        }
      }
      graph.on('node:mouseenter', () => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll(
          '.x6-port-body',
        )
        showPorts(ports, true)
      })
      graph.on('node:mouseleave', () => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll(
          '.x6-port-body',
        )
        showPorts(ports, false)
      })

      graph.on('node:click', ({ cell }) => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll(
          '.x6-port-body',
        )
        this.startVisible = true;
        this.nodeCell = cell;
        this.curTitle = cell.getAttrs().text.text;
        if(this.curTitle == '处置指令'){
          this.ruleCzForm.name = cell.getAttrs().text.text;
          this.ruleCzForm.group = cell.getData() ? cell.getData().group : '';
          this.ruleCzForm.person = cell.getData() ? cell.getData().person : '' ;
          this.ruleCzForm.desc = cell.getData() ? cell.getData().desc : '' ;
        } else if(this.curTitle == '询问') {
          this.ruleXwForm.name = cell.getAttrs().text.text;
          this.ruleXwForm.desc = cell.getData() ? cell.getData().desc : '' ;
        } else if(this.curTitle == '风险提醒') {
          this.ruleFxForm.name = cell.getAttrs().text.text;
          this.ruleFxForm.desc = cell.getData() ? cell.getData().desc : '' ;
        } else if(this.curTitle == '态势演变') {
          this.ruleTsForm.name = cell.getAttrs().text.text;
          this.ruleTsForm.desc = cell.getData() ? cell.getData().desc : '' ;
        }
        
        showPorts(ports, false)
      })

      graph.on('edge:click', ({ cell }) => {
        const container = document.getElementById('graph-container')
        const ports = container.querySelectorAll(
          '.x6-port-body',
        )
        this.startVisible = true;
        this.curTitle = '连接';
        this.ruleLjForm.isConnect = cell.getData() ? cell.getData().isConnect : '' ;
        this.ruleLjForm.situation = cell.getData() ? cell.getData().situation : '' ;
        this.ruleLjForm.desc = cell.getData() ? cell.getData().desc : '' ;
        this.ruleLjForm.color = cell.getData() ? cell.getData().color : '' ;
        this.edgeCell = cell;
        showPorts(ports, false)
      })
      // #endregion
      graph.on('edge:added', ({ edge }) => {
        edge.setAttrs({line:{stroke: this.color1}})
      })

      // #region 初始化图形
      const ports = {
        groups: {
          top: {
            position: 'top',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          right: {
            position: 'right',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          bottom: {
            position: 'bottom',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
          left: {
            position: 'left',
            attrs: {
              circle: {
                r: 4,
                magnet: true,
                stroke: '#5F95FF',
                strokeWidth: 1,
                fill: '#fff',
                style: {
                  visibility: 'hidden',
                },
              },
            },
          },
        },
        items: [
          {
            group: 'top',
          },
          {
            group: 'right',
          },
          {
            group: 'bottom',
          },
          {
            group: 'left',
          },
        ],
      }

      Graph.registerNode(
        'custom-rect',
        {
          inherit: 'rect',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
            label: {
              refX: 0.5,
              refY: '100%',
              refY2: 4,
              textAnchor: 'middle',
              textVerticalAnchor: 'top',
            }
          },
          ports: { ...ports },
        },
        true,
      )

      Graph.registerNode(
        'custom-polygon',
        {
          inherit: 'polygon',
          width: 66,
          height: 36,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
            label: {
              refX: 0.5,
              refY: '100%',
              refY2: 4,
              textAnchor: 'middle',
              textVerticalAnchor: 'top',
            }
          },
          ports: {
            ...ports,
            items: [
              {
                group: 'top',
              },
              {
                group: 'bottom',
              },
            ],
          },
        },
        true,
      )

      Graph.registerNode(
        'custom-circle',
        {
          inherit: 'circle',
          width: 45,
          height: 45,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#5F95FF',
              fill: '#EFF4FF',
            },
            text: {
              fontSize: 12,
              fill: '#262626',
            },
            label: {
              refX: 0.5,
              refY: '100%',
              refY2: 4,
              textAnchor: 'middle',
              textVerticalAnchor: 'top',
            }
          },
          ports: { ...ports },
        },
        true,
      )

      Graph.registerNode(
        'custom-image',
        {
          inherit: 'rect',
          width: 52,
          height: 52,
          markup: [
            {
              tagName: 'rect',
              selector: 'body',
            },
            {
              tagName: 'image',
            },
            {
              tagName: 'text',
              selector: 'label',
            },
          ],
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: '#FFF',
              fill: '#FFF',
            },
            image: {
              width: 26,
              height: 26,
              refX: 13,
              refY: 16,
            },
            label: {
              refX: 0.5,
              refY: '100%',
              refY2: 4,
              textAnchor: 'middle',
              textVerticalAnchor: 'top',
            },
          },
          ports: { ...ports },
        },
        true,
      )

      
      // Graph.createEdge(Edge)
      const r1 = graph.createNode({
        shape: 'custom-circle',
        width: 30,
        height: 30,
        label: '预案开始',
        attrs: {
          body: {
            stroke: '#000',
            fill: '#000',
          }
        },
      })

      const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '处置指令'
      })
      const r3 = graph.createNode({
        shape: 'custom-polygon',
        label: '询问',
        attrs: {
          body: {
            refPoints: '0,10 10,0 20,10 10,20',
          }
        }
      })
      
      const r4 = graph.createNode({
        shape: 'custom-image',
        label: '风险提醒',
        attrs: {
          image: {
            // 'xlink:href': riskImg,
          },
        },
      })
      const r5 = graph.createNode({
        shape: 'custom-circle',
        width: 30,
        height: 30,
        label: '态势演变',
        attrs: {
          body: {
            strokeWidth:1,
            stroke: '#67a409',
            fill: 'rgb(239, 244, 255)',
          }
        }
      })
      const r6 = graph.createNode({
        shape: 'custom-circle',
        width: 30,
        height: 30,
        label: '预案结束',
        attrs: {
          body: {
            strokeWidth:3,
            stroke: '#000',
            fill: 'rgb(239, 244, 255)',
          }
        }
      })
      stencil.load([r1, r2, r3, r4, r5, r6], 'group1')

    },
    saveHandle(){
      const graphJson= this.myGraph.toJSON();
      sessionStorage.setItem("graphJson",JSON.stringify(graphJson));
      alert('保存成功');
    },
    closeHandle() {
      if(this.curTitle == '处置指令'){
        this.nodeCell.setAttrs({
          label: { text: this.ruleCzForm.name },
        });
        this.nodeCell.setData({
          name:this.ruleCzForm.name,
          group:this.ruleCzForm.group,
          person:this.ruleCzForm.person,
          desc:this.ruleCzForm.desc
        });
      } else if(this.curTitle == '询问') {
        this.nodeCell.setAttrs({
          label: { text: this.ruleXwForm.name },
        });
        this.nodeCell.setData({
          name:this.ruleXwForm.name,
          desc:this.ruleXwForm.desc
        });
      } else if(this.curTitle == '风险提醒') {
        this.nodeCell.setAttrs({
          label: { text: this.ruleFxForm.name },
        });
        this.nodeCell.setData({
          name:this.ruleFxForm.name,
          desc:this.ruleFxForm.desc
        });
      } else if(this.curTitle == '态势演变') {
        this.nodeCell.setAttrs({
          label: { text: this.ruleTsForm.name },
        });
        this.nodeCell.setData({
          name:this.ruleTsForm.name,
          desc:this.ruleTsForm.desc
        });
      } else {
        this.edgeCell.setAttrs({line:{stroke: this.ruleLjForm.color}})
        // this.edgeCell.setLabels([this.ruleLjForm.isConnect]);
        this.edgeCell.setLabels({label: this.ruleLjForm.isConnect})
        this.edgeCell.setData({
          isConnect:this.ruleLjForm.isConnect,
          situation:this.ruleLjForm.situation,
          desc:this.ruleLjForm.desc,
          color:this.ruleLjForm.color
        });
      }
      
      this.startVisible = false
    }
  }
}

</script>
<style scoped  lang="less">
  .tool-wrapper{
    text-align: left;
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
</style>

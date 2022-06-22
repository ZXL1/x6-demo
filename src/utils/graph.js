import { Graph, Shape, Addon } from '@antv/x6'
import riskImg from './risk.png'

const CreateGraph = function(){
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
                        }
                    }
                },
                data: {
                    type:'Connect'
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
    // Graph.createEdge(Edge)
    const r1 = graph.createNode({
        shape: 'custom-circle',
        width: 30,
        height: 30,
        label: '预案开始',
        data: {
            type:'Start'
        },
        attrs: {
            body: {
                stroke: '#000',
                fill: '#000',
            }
        }
    })

    const r2 = graph.createNode({
        shape: 'custom-rect',
        label: '处置指令',
        data: {
            type:'Dispose'
        }
    })
    const r3 = graph.createNode({
        shape: 'custom-polygon',
        label: '询问',
        data: {
            type:'Inquiry'
        },
        attrs: {
            body: {
                refPoints: '0,10 10,0 20,10 10,20',
            }
        }
    })
    
    const r4 = graph.createNode({
        shape: 'custom-image',
        label: '风险提醒',
        data: {
            type:'Risk'
        },
        attrs: {
            image: {
                'xlink:href': riskImg,
            }
        }
    })
    const r5 = graph.createNode({
        shape: 'custom-circle',
        width: 30,
        height: 30,
        label: '态势演变',
        data: {
            type:'Situation'
        },
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
        data: {
            type:'Finish'
        },
        attrs: {
            body: {
                strokeWidth:3,
                stroke: '#000',
                fill: 'rgb(239, 244, 255)',
            }
        }
    })
    stencil.load([r1, r2, r3, r4, r5, r6], 'group1')
    return graph
}

export default CreateGraph


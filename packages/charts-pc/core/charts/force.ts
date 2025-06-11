import { CommConfig } from '../comm';
import { cloneDeep, merge } from 'lodash';
import { ForceChartsProps } from '../types';

class Model {
  public commConfig: any;
  public initOption: Omit<ForceChartsProps, 'data'>;

  constructor() {
    this.commConfig = new CommConfig();
    this.initOption = {};
  }

  init(props) {
    const { commConfig } = this;
    // 用户传入的option
    const userOption = cloneDeep(props.data);
    const userOptionCopy = cloneDeep(userOption);
    // 图表库本身的option
    const sysOption = {
      color: commConfig.get_color().colorWheelMultiple,
      tooltip: commConfig.get_tooltips(),
      animationDurationUpdate: 1500,
      label: {
        show: true,
        fontSize: 12,
      },
    };
    const sysOptionCopy: any = cloneDeep(sysOption);

    sysOptionCopy.series = userOptionCopy.series.forEach((sery) => {
      sery.data.forEach((item) => {
        item.draggable = true;
      });
      sery = merge(sery, {
        type: 'graph',
        layout: 'force', // 采用力引导布局
        symbolSize: 65,
        legendHoverLink: true, // 启用图例 hover 时的联动高亮
        emphasis: {
          focus: 'adjacency', // 在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
        },
        roam: true,
        label: {
          show: true,
          position: 'inside',
          fontSize: 12,
        },
        force: {
          repulsion: 1000,
        },
        edgeSymbolSize: [4, 50],
        links: [
          {
            source: 0,
            target: 1,
          },
          {
            source: 1,
            target: 2,
          },
          {
            source: 1,
            target: 3,
          },
          {
            source: 1,
            target: 4,
          },
          {
            source: 0,
            target: 5,
          },
          {
            source: 5,
            target: 6,
          },
          {
            source: 5,
            target: 7,
          },
          {
            source: 5,
            target: 8,
          },
          {
            source: 0,
            target: 9,
          },
          {
            source: 9,
            target: 10,
          },
          {
            source: 9,
            target: 11,
          },
          {
            source: 9,
            target: 12,
          },
        ],
        lineStyle: {
          opacity: 0.9,
          width: 1,
          curveness: 0,
        },
      });
    });

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);
    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

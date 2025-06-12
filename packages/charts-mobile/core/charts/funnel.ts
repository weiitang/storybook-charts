import { CommConfig } from '../comm';
import { FunnelChartsProps } from '../types';
import { cloneDeep, merge } from 'lodash';

class Model {
  private commConfig: CommConfig;
  private initOption: Omit<FunnelChartsProps, 'data'>;

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
      color: ['#BFE2FE', '#69BAFB', '#1F8EFF', '#1162B3', '#073B6E'],
      legend: merge(commConfig.get_legend(), {
        top: 'auto',
        bottom: 0,
        left: 'center',
      }),
      tooltip: merge(commConfig.get_tooltips(), {
        position: function (point) {
          return point;
        },
      }),
    };
    const sysOptionCopy = cloneDeep(sysOption);

    // 漏斗形状
    if (props.shape) {
      const shape = props.shape;
      if (shape === 'sharp') {
        userOptionCopy.series.map((item) => {
          item.minSize = 0;
        });
      }
    }

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);
    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

import { cloneDeep, merge } from 'lodash';

import { CommConfig, handleSeriesWithType } from '../comm';
import { HeatChartsProps } from '../types';
class Model {
  private commConfig: CommConfig;
  private initOption: Omit<HeatChartsProps, 'data'>;

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
      tooltip: commConfig.get_tooltips(),
    };

    let sysOptionCopy = cloneDeep(sysOption);
    // 图表库本身的option
    sysOptionCopy = merge(sysOptionCopy, {
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 80,
        containLabel: true,
      },
      visualMap: {
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: 10,
      },
      series: [
        {
          type: 'heatmap',
        },
      ],
    });

    if (userOptionCopy.xAxis || userOptionCopy.yAxis) {
      sysOptionCopy = merge(sysOptionCopy, {
        xAxis: commConfig.get_yAxis(),
        yAxis: commConfig.get_xAxis(),
      });
    }

    // 合并后的option
    this.initOption = handleSeriesWithType(
      merge(sysOptionCopy, userOptionCopy),
      {},
      {}
    );

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

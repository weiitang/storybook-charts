import { merge, cloneDeep } from 'lodash';

import { CommConfig, handleSeriesWithType } from '../comm';
import { BarChartsProps } from '../types';
class Model {
  private commConfig: CommConfig;
  private initOption: Omit<BarChartsProps, 'data'>;

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
      xAxis: commConfig.get_xAxis(),
      yAxis: commConfig.get_yAxis(),
    };
    let sysOptionCopy = cloneDeep(sysOption);

    sysOptionCopy = merge(sysOptionCopy, {
      grid: {
        top: 1,
        bottom: 1,
        left: 1,
        right: 1,
        containLabel: false,
      },
      tooltip: {
        show: false,
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        show: false,
      },
    });

    // 合并后的option
    this.initOption = handleSeriesWithType(
      merge(sysOptionCopy, userOptionCopy),
      { type: 'bar' },
      {}
    );

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

import { cloneDeep, merge } from 'lodash';

import { CommConfig, handleSeriesWithType } from '../comm';
import { ScatterChartsProps } from '../types';

class Model {
  private commConfig: CommConfig;
  private initOption: Omit<ScatterChartsProps, 'data'>;

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
      grid: commConfig.get_grid(),
      title: commConfig.get_title(),
      tooltip: commConfig.get_tooltips(),
      xAxis: commConfig.get_xAxis(),
      yAxis: commConfig.get_yAxis(),
    };
    let sysOptionCopy = cloneDeep(sysOption);

    sysOptionCopy = merge(sysOptionCopy, {
      xAxis: {
        axisLabel: {
          interval: 'auto',
        },
      },
      tooltip: {
        formatter: function (param) {
          return [
            'Date: ' + param.data[0] + '<hr size=1 style="margin: 3px 0">',
            'Company: ' + param.data[2] + '<br/>',
            'Amount: ' + param.data[1] + '<br/>',
          ].join('');
        },
      },
    });

    // 合并后的option
    this.initOption = handleSeriesWithType(
      merge(sysOptionCopy, userOptionCopy),
      { type: 'scatter' },
      {}
    );

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

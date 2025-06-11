import { cloneDeep, merge } from 'lodash';

import { CommConfig, handleSeriesWithType } from '../comm';
import { KChartsProps } from '../types';
class Model {
  private commConfig: CommConfig;
  private initOption: Omit<KChartsProps, 'data'>;

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
      yAxis: {
        min: 'dataMin',
        max: 'dataMax',
      },
      xAxis: {
        axisLabel: {
          interval: 'auto',
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'dashed',
            color: commConfig.g_colors.axis,
          },
        },
        formatter: function (param) {
          param = param[0];
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>',
          ].join('');
        },
      },
    });

    // 合并后的option
    this.initOption = handleSeriesWithType(
      merge(sysOptionCopy, userOptionCopy),
      { type: 'candlestick' },
      {}
    );

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

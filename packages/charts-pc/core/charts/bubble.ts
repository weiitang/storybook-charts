import { CommConfig, handleSeriesWithType } from '../comm';
import { cloneDeep, merge } from 'lodash';
import { BubbleChartsProps } from '../types';

class Model {
  private commConfig: CommConfig;
  private initOption: Omit<BubbleChartsProps, 'data'>;

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
      legend: commConfig.get_legend(),
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
    });

    // 合并后的option
    this.initOption = handleSeriesWithType(
      merge(sysOptionCopy, userOptionCopy),
      { type: 'scatter' },
      {
        symbolSize: (data) => {
          // 控制圆的大小
          return data[1] / 8;
        },
        label: {
          show: true,
          position: 'top',
          formatter: function (param) {
            return param.data[2];
          },
        },
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(25, 100, 150, 0.5)',
          shadowOffsetY: 5,
        },
      }
    );

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

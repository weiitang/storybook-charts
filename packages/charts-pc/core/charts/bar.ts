import { CommConfig, handleSeriesWithType } from '../comm';
import { cloneDeep, merge } from 'lodash';
import type { BarChartsProps } from '../types';

class Model {
  private commConfig: CommConfig;
  private initOption: Omit<BarChartsProps, 'data'>;

  constructor() {
    this.commConfig = new CommConfig();
    this.initOption = {};
  }

  init(props: BarChartsProps) {
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
      xAxis: commConfig.get_yAxis(),
      yAxis: commConfig.get_xAxis(),
    };
    let sysOptionCopy = cloneDeep(sysOption);

    // 对于该类型的图表的通用处理
    sysOptionCopy = merge(sysOptionCopy, {
      grid: {
        right: '4%',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0,0,0,0.1)',
          },
        },
      },
    });

    const defaultSery = {
      type: 'bar',
    };
    this.initOption = handleSeriesWithType(
      merge(sysOptionCopy, userOptionCopy),
      defaultSery,
      {
        barMaxWidth: commConfig.g_sets.barWidth,
      }
    );

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

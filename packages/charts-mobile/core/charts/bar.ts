import { CommConfig } from '../comm';
import { cloneDeep, merge, isNil, isEmpty } from 'lodash';
import type { BarChartsProps } from '../types';

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
      grid: commConfig.get_grid(),
      legend: commConfig.get_legend(),
      tooltip: commConfig.get_tooltips(),
      xAxis: commConfig.get_yAxis(),
      yAxis: commConfig.get_xAxis(),
    };
    let sysOptionCopy = cloneDeep(sysOption);

    // 对于该类型的图表的通用处理
    sysOptionCopy = merge(sysOptionCopy, {
      grid: {
        top: 40,
        bottom: 0,
        left: 80,
        right: 0,
        containLabel: false,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0,0,0,0.1)',
          },
        },
        position: function (point) {
          return point;
        },
      },
      xAxis: {
        show: false,
      },
      yAxis: {
        inverse: true, // 反向y轴保证数据按data顺序展示
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          width: 70,
          overflow: 'truncate',
        },
      },
    });
    if (!isNil(userOptionCopy) && !isEmpty(userOptionCopy.series)) {
      userOptionCopy.series.map((item) => {
        item.barMaxWidth = commConfig.g_sets.barWidth;
        return item;
      });
    }

    // 与用户option合并
    this.initOption = merge(sysOptionCopy, userOptionCopy);

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

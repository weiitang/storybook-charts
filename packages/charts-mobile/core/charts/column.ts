import { CommConfig } from '../comm';
import type { ColumnChartsProps } from '../types';
import { cloneDeep, merge, isNil, isEmpty, isArrayLikeObject } from 'lodash';

class Model {
  private commConfig: CommConfig;
  private initOption: Omit<ColumnChartsProps, 'data'>;

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
      xAxis: commConfig.get_xAxis(),
      yAxis: commConfig.get_yAxis(),
    };
    let sysOptionCopy = cloneDeep(sysOption);

    sysOptionCopy = merge(sysOptionCopy, {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: 'rgba(0,0,0,0.05)',
          },
        },
      },
    });

    if (!isNil(userOptionCopy) && !isEmpty(userOptionCopy.series)) {
      if (isArrayLikeObject(userOptionCopy.xAxis)) {
        userOptionCopy.xAxis = userOptionCopy.xAxis.map((item) => {
          return {
            ...commConfig.get_xAxis(),
            ...item,
          };
        });
      }
      if (isArrayLikeObject(userOptionCopy.yAxis)) {
        userOptionCopy.yAxis = userOptionCopy.yAxis.map((item) => {
          return {
            ...commConfig.get_yAxis(),
            ...item,
          };
        });
      }
      userOptionCopy.series = userOptionCopy.series.map((item) => {
        item.barWidth = commConfig.g_sets.barWidth;
        return item;
      });
    }

    // 用户是否开启 dataZoom
    if (props.dataZoom) {
      sysOptionCopy = merge(sysOptionCopy, {
        dataZoom: commConfig.get_dataZoom(),
        xAxis: {
          axisLabel: {
            interval: 'auto',
          },
        },
      });
    }

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

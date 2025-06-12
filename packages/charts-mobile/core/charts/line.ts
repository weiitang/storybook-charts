import { CommConfig, getLineShadowOption } from '../comm';
import { LineChartsProps } from '../types';
import { cloneDeep, merge, isNil, isEmpty } from 'lodash';

class Model {
  public commConfig: any;
  public initOption: Omit<LineChartsProps, 'data'>;
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
          type: 'line',
          lineStyle: {
            type: 'dashed',
            color: commConfig.g_colors.axis,
          },
        },
      },
    });

    if (!isNil(userOptionCopy) && !isEmpty(userOptionCopy.series)) {
      userOptionCopy.series.map((item) => {
        item.symbol = 'circle';
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

    // 用户是否开启内置阴影
    if (props.shadow) {
      const colors = isEmpty(userOptionCopy.color)
        ? sysOptionCopy.color
        : userOptionCopy.color;
      userOptionCopy.series.map((item, index) => {
        if (index > colors.length - 1) {
          index = index % colors.length;
        }
        item.areaStyle = getLineShadowOption(colors[index]);
      });
    }

    // 用户是否选择了线段形状
    if (props.shape) {
      const shape = props.shape;
      if (shape === 'smooth') {
        userOptionCopy.series.map((item) => {
          item.smooth = true;
        });
      } else if (shape === 'step') {
        userOptionCopy.series.map((item) => {
          item.step = true;
        });
      }
    }

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

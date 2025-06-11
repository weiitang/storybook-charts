import { CommConfig, getLineShadowOption, handleSeriesWithType } from '../comm';
import { cloneDeep, merge, isEmpty, isArray } from 'lodash';
import type { LineChartsProps } from '../types';
import { EChartsOption, LineSeriesOption } from 'echarts/types/dist/shared';

class Model {
  public commConfig: any;
  public initOption: EChartsOption;

  constructor() {
    this.commConfig = new CommConfig();
    this.initOption = {};
  }

  init(props: LineChartsProps) {
    const { commConfig } = this;
    // 用户传入的option
    const userOption = cloneDeep(props.data);
    let userOptionCopy = cloneDeep(userOption);
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

    // 用户是否开启 dataZoom
    if (props.dataZoom) {
      sysOptionCopy = merge(sysOptionCopy, {
        legend: {
          show: false,
        },
        dataZoom: commConfig.get_dataZoom(),
        xAxis: {
          axisLabel: {
            interval: 'auto',
          },
        },
      });
    }

    const defaultSery = {
      type: 'line',
    };
    userOptionCopy = handleSeriesWithType(userOptionCopy, defaultSery, {
      symbol: 'circle',
    });

    const { shadow = false, shape = 'line' } = props;

    // 用户是否开启内置阴影
    if (shadow) {
      const colors = isEmpty(userOptionCopy.color)
        ? sysOptionCopy.color
        : userOptionCopy.color;
      const { series } = userOptionCopy;
      const seriesArray = isArray(series)
        ? (series as LineSeriesOption[])
        : [series as LineSeriesOption];
      seriesArray.map((item: LineSeriesOption, index) => {
        if (index > colors.length - 1) {
          index = index % colors.length;
        }
        item.areaStyle = getLineShadowOption(colors[index]);
      });
      userOptionCopy.series = seriesArray;
    }

    // 用户是否选择了线段形状
    if (shape) {
      const { series } = userOptionCopy;
      const seriesArray = isArray(series)
        ? (series as LineSeriesOption[])
        : [series as LineSeriesOption];
      if (shape === 'smooth') {
        seriesArray.map((item: LineSeriesOption) => {
          item.smooth = true;
        });
      } else if (shape === 'step') {
        seriesArray.map((item: LineSeriesOption) => {
          item.step = 'start';
        });
      } else {
        seriesArray.map((item: LineSeriesOption) => {
          item.smooth = false;
          item.step = false;
        });
      }
    }

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

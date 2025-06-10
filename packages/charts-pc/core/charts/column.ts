import { CommConfig, handleSeriesWithType } from '../comm';
import { cloneDeep, merge, isEmpty } from 'lodash';

class Model {
  public commConfig: any;
  public initOption: any;

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

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);

    const defaultSery = {
      type: 'bar',
    };

    this.initOption = handleSeriesWithType(this.initOption, defaultSery);

    if (!isEmpty(this.initOption?.series)) {
      this.initOption.series.map((item) => {
        item.barMaxWidth = commConfig.g_sets.barWidth;
        return item;
      });
    }

    // // 是否开启自动旋转x轴Lable
    // if (props.autoRotateLabel) {
    //     this.initOption = merge(this.initOption, autoRotateLabel(props.chartDom, userOptionCopy))
    // }

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

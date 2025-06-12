import { CommConfig } from '../comm';
import { PieChartsProps } from '../types';
import { cloneDeep, merge, isNil, isEmpty } from 'lodash';

class Model {
  private commConfig: CommConfig;
  private initOption: Omit<PieChartsProps, 'data'>;
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
      tooltip: { ...commConfig.get_tooltips(), axisPointer: {} },
    };
    const sysOptionCopy = cloneDeep(sysOption);

    if (!isNil(userOptionCopy) && !isEmpty(userOptionCopy.series)) {
      userOptionCopy.series.map((item) => {
        return item;
      });
    }

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);
    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

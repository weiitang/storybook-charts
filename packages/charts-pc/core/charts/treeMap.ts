import { CommConfig } from '../comm';
import { cloneDeep, merge } from 'lodash';

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
      // color: commConfig.get_color().corlorWheelSingle,
      tooltip: commConfig.get_tooltips(),
    };

    let sysOptionCopy = cloneDeep(sysOption);
    // 图表库本身的option
    sysOptionCopy = merge(sysOptionCopy, {
      tooltip: {
        position: 'top',
      },
    });
    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);
    if (this.initOption.series) {
      const defaultSery = {
        type: 'treemap',
        height: '100%',
        width: '100%',
        roam: true,
        scaleLimit: {
          min: 1,
        },
        nodeClick: false,
        itemStyle: {
          borderColor: '#fff',
        },
        breadcrumb: {
          show: false,
        },
      };
      this.initOption.series = this.initOption.series.map((sery) => {
        return { ...defaultSery, ...sery };
      });
    }
    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

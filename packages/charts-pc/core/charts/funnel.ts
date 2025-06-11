import { cloneDeep, merge, isNil, isEmpty } from 'lodash';

import { CommConfig, handleSeriesWithType } from '../comm';
import { FunnelChartsProps } from '../types';
class Model {
  private commConfig: CommConfig;
  private initOption: Omit<FunnelChartsProps, 'data'>;

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
      color: ['#BFE2FE', '#69BAFB', '#1F8EFF', '#1162B3', '#073B6E'],
      legend: commConfig.get_legend(),
      tooltip: commConfig.get_tooltips(),
    };
    const sysOptionCopy = cloneDeep(sysOption);

    if (!isNil(userOptionCopy)) {
      if (isEmpty(userOptionCopy.series)) {
        // 需要至少一个自定义series
        userOptionCopy.series = [{}];
      }

      userOptionCopy.series.map((item) => {
        item = merge(item, {
          top: 60,
          bottom: 60,
          minSize: '10%',
          maxSize: '100%',
          sort: 'descending',
          gap: 2,
          label: {
            show: true,
            position: 'inside',
          },
          labelLine: {
            length: 10,
            lineStyle: {
              width: 1,
              type: 'solid',
            },
          },
          itemStyle: {
            borderColor: '#fff',
            borderWidth: 1,
          },
        });
        return item;
      });
    }

    // 尖漏斗形状
    if (props.shape) {
      const shape = props.shape;
      if (shape === 'sharp') {
        userOptionCopy?.series?.map((item) => {
          item.minSize = 0;
        });
      }
    }

    // 合并后的option
    this.initOption = handleSeriesWithType(
      merge(sysOptionCopy, userOptionCopy),
      { type: 'funnel' },
      {}
    );

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

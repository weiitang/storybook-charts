import { CommConfig } from '../comm';
import { cloneDeep, merge, isNil, isEmpty } from 'lodash';
import { WordCloudChartsProps } from '../types';
class Model {
  private commConfig: CommConfig;
  private initOption: any;

  constructor() {
    this.commConfig = new CommConfig();
    this.initOption = {};
  }

  init(props: WordCloudChartsProps) {
    const { commConfig } = this;
    // 用户传入的option
    const userOption = cloneDeep(props.data);
    const userOptionCopy = cloneDeep(userOption);
    // 图表库本身的option
    const colorList = commConfig.get_color().corlorWheelSingle;
    const sysOption = {
      color: commConfig.get_color().corlorWheelSingle,
      tooltip: commConfig.get_tooltips(),
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '70%',
          height: '80%',
          right: null,
          bottom: null,
          sizeRange: [16, 46],
          rotationRange: [0, 0],
          gridSize: 16,
          drawOutOfBound: false,
          textStyle: {
            fontFamily: 'sans-serif',
            color: function () {
              const index = Math.floor(Math.random() * colorList.length);
              return colorList[index];
            },
            emphasis: {
              fontWeight: 'bold',
            },
          },
        },
      ],
    };
    const sysOptionCopy = cloneDeep(sysOption);

    if (!isNil(userOptionCopy) && !isEmpty(userOptionCopy.series)) {
      sysOptionCopy.series[0] = merge(
        sysOptionCopy.series[0],
        userOptionCopy.series[0]
      );
    }

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);
    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

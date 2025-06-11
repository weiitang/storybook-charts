import { CommConfig } from '../comm';
import { cloneDeep, merge } from 'lodash';
import { EChartsOption, ScatterSeriesOption } from 'echarts/types/dist/shared';
import { GeoMapChartsProps } from '../types';
class Model {
  public commConfig: any;
  public initOption: EChartsOption;

  constructor() {
    this.commConfig = new CommConfig();
    this.initOption = {};
  }

  init(props: GeoMapChartsProps) {
    const { commConfig } = this;
    // 用户传入的option
    const userOption = cloneDeep(props.data);
    const userOptionCopy = cloneDeep(userOption);

    // 图表库本身的option
    const sysOption: EChartsOption = {
      tooltip: commConfig.get_tooltips(),
      geo: {
        map: 'china',
        layoutCenter: ['50%', '50%'],
        layoutSize: '130%',
        scaleLimit: {
          min: 1,
        },
        roam: true,
        label: {
          show: false,
        },
        itemStyle: {
          borderColor: '#ffffff',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            color: commConfig.get_color().normal,
          },
          itemStyle: {
            color: commConfig.get_color().yellow,
            areaColor: undefined,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      visualMap: {
        min: 0,
        max: 1500,
        left: 'left',
        top: 'bottom',
        text: ['最多', '最少'],
        seriesIndex: 0,
        inRange: {
          color: ['#e0ffff', '#006edd'],
        },
        calculable: true,
      },
      series: [
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
        },
      ],
    };
    const { bubble = false } = props;
    if (bubble) {
      const bubbleSeriesOption: ScatterSeriesOption = {
        type: 'scatter',
        coordinateSystem: 'geo',
        // rippleEffect: {
        //     brushType: 'stroke'
        // },
        // showEffectOn: 'render',
        itemStyle: {
          color: '#459AF0',
          borderWidth: 1,
          borderColor: '#0052d9',
        },
        label: {
          show: true,
          color: '#fff',
          position: 'inside',
          formatter: function (params) {
            if (params?.value?.[2] > 450) {
              return params.name;
            } else {
              return '';
            }
          },
        },
        symbol: 'circle',
        symbolSize: function (val) {
          return val[2] / 15;
        },
        zlevel: 3,
      };
      const { series } = sysOption;
      (series as ScatterSeriesOption[]).unshift(bubbleSeriesOption);
    }
    const sysOptionCopy = cloneDeep(sysOption);

    // 合并后的option
    this.initOption = merge(sysOptionCopy, userOptionCopy);

    return { ...props, ...{ option: this.initOption } };
  }
}

export { Model };

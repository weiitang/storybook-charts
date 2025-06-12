import { TreeMap, EChartsInstance, TreeMapChartsProps } from '@charts';
import type { Meta } from '@storybook/react';
import icon from './../assets/chevron-right.svg';
import iconWhite from './../assets/chevron-right-white.svg';
import '../chart.css';

export default {
  title: 'Charts/TreeMap 矩形树图',
  tags: ['autodocs'],
  component: TreeMap,
} satisfies Meta<typeof TreeMap>;

const Json = [
  {
    name: '金融',
    value: 2271.66,
    children: [
      {
        name: '美团',
        value: 247.84,
        percentage: 2.1,
      },
      {
        name: '京东云',
        value: 198.84,
        percentage: 3.96,
      },
      {
        name: '滴滴出行',
        value: 147.84,
        percentage: 1.3,
      },
      {
        name: 'bilibili',
        value: 188.47,
        percentage: 1.27,
      },
      {
        name: '拼多多',
        value: 297.84,
        percentage: 1.07,
      },
      {
        name: '快手',
        value: 370.84,
        percentage: 1.09,
      },
      {
        name: '喜马拉雅',
        value: 195,
        percentage: -1.95,
      },
      {
        name: '知乎',
        value: 81,
        percentage: 0.81,
      },
      {
        name: '蔚来',
        value: 192,
        percentage: -2.92,
      },
      {
        name: '好未来',
        value: 88.99,
        percentage: -3.8,
      },
      {
        name: '新氧',
        value: 17,
        percentage: -2.7,
      },
      {
        name: '有道',
        value: 26,
        percentage: 0.6,
      },
      {
        name: '乐信',
        value: 55,
        percentage: 0.55,
      },
      {
        name: '蘑菇街',
        value: 52,
        percentage: 0.52,
      },
      {
        name: '雾芯科技',
        value: 18,
        percentage: 0.1,
      },
      {
        name: '名创优品',
        value: 48,
        percentage: 0.48,
      },
      {
        name: '医美国际',
        value: 47,
        percentage: 0.47,
      },
    ],
  },
  {
    name: '医疗',
    value: 1071.66,
    children: [
      {
        name: '美团',
        value: 247.84,
        percentage: 2.1,
      },
      {
        name: '京东云',
        value: 198.84,
        percentage: 3.96,
      },
      {
        name: '滴滴出行',
        value: 147.84,
        percentage: 1.3,
      },
      {
        name: 'bilibili',
        value: 188.47,
        percentage: 1.27,
      },
      {
        name: '拼多多',
        value: 297.84,
        percentage: 1.07,
      },
      {
        name: '快手',
        value: 370.84,
        percentage: 1.09,
      },
      {
        name: '喜马拉雅',
        value: 195,
        percentage: -1.95,
      },
      {
        name: '知乎',
        value: 81,
        percentage: 0.81,
      },
      {
        name: '蔚来',
        value: 192,
        percentage: -2.92,
      },
      {
        name: '好未来',
        value: 88.99,
        percentage: -3.8,
      },
      {
        name: '新氧',
        value: 17,
        percentage: -2.7,
      },
      {
        name: '有道',
        value: 26,
        percentage: 0.6,
      },
      {
        name: '乐信',
        value: 55,
        percentage: 0.55,
      },
      {
        name: '蘑菇街',
        value: 52,
        percentage: 0.52,
      },
      {
        name: '雾芯科技',
        value: 18,
        percentage: 0.1,
      },
      {
        name: '名创优品',
        value: 48,
        percentage: 0.48,
      },
      {
        name: '医美国际',
        value: 47,
        percentage: 0.47,
      },
    ],
  },
  {
    name: '科技',
    value: 1871.66,
    children: [
      {
        name: '美团',
        value: 247.84,
        percentage: 2.1,
      },
      {
        name: '京东云',
        value: 198.84,
        percentage: 3.96,
      },
      {
        name: '滴滴出行',
        value: 147.84,
        percentage: 1.3,
      },
      {
        name: 'bilibili',
        value: 188.47,
        percentage: 1.27,
      },
      {
        name: '拼多多',
        value: 297.84,
        percentage: 1.07,
      },
      {
        name: '快手',
        value: 370.84,
        percentage: 1.09,
      },
      {
        name: '喜马拉雅',
        value: 195,
        percentage: -1.95,
      },
      {
        name: '知乎',
        value: 81,
        percentage: 0.81,
      },
      {
        name: '蔚来',
        value: 192,
        percentage: -2.92,
      },
      {
        name: '好未来',
        value: 88.99,
        percentage: -3.8,
      },
      {
        name: '新氧',
        value: 17,
        percentage: -2.7,
      },
      {
        name: '有道',
        value: 26,
        percentage: 0.6,
      },
      {
        name: '乐信',
        value: 55,
        percentage: 0.55,
      },
      {
        name: '蘑菇街',
        value: 52,
        percentage: 0.52,
      },
      {
        name: '雾芯科技',
        value: 18,
        percentage: 0.1,
      },
      {
        name: '名创优品',
        value: 48,
        percentage: 0.48,
      },
      {
        name: '医美国际',
        value: 47,
        percentage: 0.47,
      },
    ],
  },
];

const dataHandler = (itemData) => {
  const { children } = itemData;
  const newChildren = children.map((item) => {
    // 计算块的颜色
    const percentage = item.percentage;
    if (percentage >= 3) {
      item.id = 'greenDark';
    }
    if (percentage < 3 && percentage >= 2) {
      item.id = 'green';
    }
    if (percentage < 2 && percentage >= 1) {
      item.id = 'greenLight';
    }
    if (percentage < 1 && percentage >= 0) {
      item.id = 'gray';
    }
    if (percentage < 0 && percentage >= -1) {
      item.id = 'redLight';
    }
    if (percentage < -1 && percentage >= -2) {
      item.id = 'red';
    }
    if (percentage < -2 && percentage >= -3) {
      item.id = 'redDark';
    }
    // 根据块的面积计算字体大小
    item.label = {
      // fontSize: calcFontSize(value, item.value)
    };
    // 计算
    return item;
  });

  return {
    ...itemData,
    children: newChildren,
  };
};

const parseData = (data) => {
  return data.map((item) => {
    return dataHandler(item);
  });
};

const dataJson = parseData(Json);

const defaultOpt = {
  series: [
    {
      label: {
        show: true,
        formatter: (params) => {
          // console.log(params);
          return `${params.data.name}\n${params.data.percentage}%\n${params.data.value}`;
        },
      },
      labelLayout: function (params) {
        if (params.rect.width < 50 || params.rect.height < 50) {
          return {
            fontSize: 0,
          };
        }
        return {
          fontSize: Math.min(
            Math.sqrt(params.rect.width * params.rect.height) / 8,
            20
          ),
        };
      },
      levels: [
        {
          itemStyle: {
            borderWidth: 0,
            gapWidth: 4,
          },
        },
        {
          color: [
            // light green
            '#67B984',
            // green
            '#449657',
            // dark green
            '#2C643B',
            // light red
            '#E78383',
            // red
            '#DF484C',
            // red dark
            '#8D2B2D',
            // gray
            '#C2C4CC',
          ],
          colorMappingBy: 'id',
          upperLabel: {
            show: true,
            fontSize: 14,
            lineHeight: 20,
            color: '#307AF2',
            rich: {
              icon: {
                backgroundColor: {
                  image: icon,
                },
                height: 16,
                width: 16,
              },
            },
            formatter: (val) => {
              if (val.name) {
                return `${val.name} {icon|}`;
              }
            },
          },
          itemStyle: {
            gapWidth: 1.5,
            borderRadius: 4,
            borderWidth: 4,
            borderColor: 'transparent',
          },
          emphasis: {
            upperLabel: {
              color: '#ffffff',
              rich: {
                iconWhite: {
                  backgroundColor: {
                    image: iconWhite,
                  },
                  height: 16,
                  width: 16,
                },
              },
              formatter: (val) => {
                if (val.name) {
                  return `${val.name} {iconWhite|}`;
                }
              },
            },
            itemStyle: {
              gapWidth: 1.5,
              borderRadius: 4,
              borderWidth: 4,
              borderColor: '#307AF2',
            },
          },
        },
        {},
      ],
      data: dataJson,
    },
  ],
};

// TreeMap（矩形树图）
export const TreeMapChart = (args: TreeMapChartsProps): React.ReactNode => {
  let chartInstance: EChartsInstance = {} as EChartsInstance;
  // let scaleSize = 1;

  const getChartInstance = (chart: EChartsInstance) => {
    chartInstance = chart;
  };

  const zoom = (scale) => {
    const originXCenter = chartInstance.getWidth() / 2;
    const originYCenter = chartInstance.getHeight() / 2;
    if (scale) {
      // scaleSize = scaleSize * 2;
      // chartInstance._chartsViews[0]._onZoom({
      chartInstance.dispatchAction({
        type: 'dataZoom',
        originX: originXCenter,
        originY: originYCenter,
        scale: 2,
      });
    } else {
      // if (scaleSize === 1) {
      //   return;
      // }
      // scaleSize = scaleSize * 0.5;
      chartInstance.dispatchAction({
        type: 'dataZoom',
        originX: originXCenter,
        originY: originYCenter,
        scale: 0.5,
      });
    }
  };

  const reset = () => {
    chartInstance.dispatchAction({
      type: 'restore',
    });
  };

  return (
    <div className="charts">
      <TreeMap {...args} onChartReady={(chart) => getChartInstance(chart)} />
      <button onClick={() => zoom(true)}>+</button>
      <button onClick={() => zoom(false)}>-</button>
      <button onClick={() => reset()}>reset</button>
    </div>
  );
};

TreeMapChart.args = {
  data: defaultOpt,
  // 鼠标事件触发父级的高亮
  onEvents: {
    mouseover: (params, chart) => {
      chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        name: params?.treeAncestors?.[1]?.name,
      });
    },
    mouseout: (_, chart) => {
      chart.dispatchAction({
        type: 'downplay',
      });
    },
    click: (params) => {
      if (params.treeAncestors[1]) {
        const dataIndex = dataJson.findIndex(
          (sery) => sery.name === params.treeAncestors[1].name
        );
        // eslint-disable-next-line no-console
        console.log('展开节点', dataIndex);
      }
    },
  },
  showLoading: false,
};
TreeMapChart.storyName = 'TreeMap（矩形树图）';

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Bar, BarChartsProps } from '@charts';
import './chart.css';

// storybook根据export出来的component自动生成props，下面定义的组件会被meta里的component顺序掉，所以props生成的有问题
const BarChartTemplate = (props: BarChartsProps) => (
  <div className="charts">
    <Bar {...props} />
  </div>
);

const meta = {
  title: 'Charts/Bar 条形图',
  tags: ['autodocs'],
  component: Bar,
} satisfies Meta<typeof Bar>;

export default meta;
type Story = StoryObj<typeof Bar>;

// BasicBar（条形图）
export const BasicBar: Story = {
  render: BarChartTemplate,
};
BasicBar.args = {
  data: {
    dataset: {
      source: [
        ['', '总数'],
        ['游戏', '433'],
        ['动漫', '100'],
        ['金融', '831'],
        ['教育', '864'],
        ['汽车交通', '724'],
        ['本地生活', '124'],
        ['企业服务', '224'],
        ['零售', '324'],
        ['前沿科技', '124'],
        ['在线视频', '88'],
      ],
    },
  },
};
BasicBar.storyName = 'BasicBar（条形图）';

// GroupedBar（分组条形图）
export const GroupedBar: Story = {
  render: BarChartTemplate,
};
GroupedBar.args = {
  data: {
    yAxis: {
      data: ['消费', '文创', '新农业', '物流'],
    },
    series: [
      {
        name: '投前',
        type: 'bar',
        data: [320, 332, 301, 334, 380],
      },
      {
        name: '上会',
        type: 'bar',
        data: [220, 182, 191, 234, 290],
      },
      {
        name: '投资',
        type: 'bar',
        data: [150, 232, 201, 154, 190],
      },
    ],
  },
};
GroupedBar.storyName = 'GroupedBar（分组条形图）';

// StackedBar（堆叠条形图）
export const StackedBar: Story = {
  render: BarChartTemplate,
};
StackedBar.args = {
  data: {
    yAxis: {
      data: [
        '星海互娱',
        '破晓互动',
        '玄星网络',
        '番糖游戏',
        '朝露科技',
        '云图动漫',
        '灵刃网络',
        '东极六感',
        '菜鸡游戏',
      ],
    },
    series: [
      {
        name: '男性',
        stack: 'Company',
        data: ['25', '17', '18', '12', '20', '12', '16', '19', '29'],
      },
      {
        name: '女性',
        stack: 'Company',
        data: ['15', '10', '8', '9', '12', '11', '7', '8', '6'],
      },
      {
        name: '未知',
        stack: 'Company',
        color: '#ccc',
        data: ['5', '1', '4', '2', '3', '6', '8', '6', '7'],
      },
    ],
  },
};
StackedBar.storyName = 'StackedBar（堆叠条形图）';

// PercentageBar（百分比的条形图）
export const PercentageBar: Story = {
  render: BarChartTemplate,
};
PercentageBar.args = {
  data: {
    xAxis: {
      max: 100,
      min: 0,
      axisLabel: {
        formatter: (val) => {
          return `${val}%`;
        },
      },
    },
    yAxis: {
      data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    },
    tooltip: {
      formatter: '{b0}: {c0}%',
    },
    series: [
      {
        showBackground: true,
        data: ['22', '55', '24', '43', '83', '86', '72', '42'],
      },
    ],
  },
};
PercentageBar.storyName = 'PercentageBar（百分比的条形图）';

/**
 *
 * BarRace（动态叙事）
 *
 * 柱状图系列的 realtimeSort 设为 true，表示开启该系列的动态排序效果
 * yAxis.inverse 设为 true，表示 Y 轴从下往上是从小到大的排列
 * yAxis.animationDuration 建议设为 300，表示第一次柱条排序动画的时长
 * yAxis.animationDurationUpdate 建议设为 300，表示第一次后柱条排序动画的时长
 * 如果想只显示前 n 名，将 yAxis.max 设为 n - 1，否则显示所有柱条
 * xAxis.max 建议设为 'dataMax' 表示用数据的最大值作为 X 轴最大值，视觉效果更好
 * 如果想要实时改变标签，需要将 series.label.valueAnimation 设为 true
 * animationDuration 设为 0，表示第一份数据不需要从 0 开始动画（如果希望从 0 开始则设为和 animationDurationUpdate 相同的值）
 * animationDurationUpdate 建议设为 3000 表示每次更新动画时长，这一数值应与调用 setOption 改变数据的频率相同
 * 以 animationDurationUpdate 的频率调用 setInterval，更新数据值，显示下一个时间点对应的柱条排序
 */

// bar race 可以用在各组收益率、个人收益率，by 时间的动态展示--；

const colors = {
  金融内容组: '#459AF0',
  消费零售组: '#38C3B0',
  技术企业组: '#86CA5A',
  医疗健康组: '#BFD44F',
  文教娱乐组: '#FCE448',
  海外市场组: '#FCC248',
  基金投资组: '#F58B41',
};

const dataByYear = [
  {
    year: '2005',
    data: [22, 55, 24, 43, 83, 86, 72],
  },
  {
    year: '2006',
    data: [27, 63, 28, 37, 74, 84, 77],
  },
  {
    year: '2007',
    data: [34, 72, 33, 35, 77, 81, 72],
  },
  {
    year: '2008',
    data: [26, 77, 31, 40, 73, 81, 76],
  },
  {
    year: '2009',
    data: [25, 79, 40, 42, 70, 75, 77],
  },
  {
    year: '2010',
    data: [29, 71, 49, 34, 62, 66, 80],
  },
  {
    year: '2011',
    data: [30, 66, 54, 36, 63, 72, 80],
  },
  {
    year: '2012',
    data: [31, 72, 49, 29, 70, 80, 90],
  },
  {
    year: '2013',
    data: [27, 72, 53, 37, 72, 87, 91],
  },
  {
    year: '2014',
    data: [37, 65, 61, 35, 64, 85, 90],
  },
  {
    year: '2015',
    data: [37, 71, 63, 36, 65, 86, 93],
  },
  {
    year: '2016',
    data: [44, 67, 71, 35, 74, 76, 103],
  },
  {
    year: '2017',
    data: [37, 69, 64, 39, 66, 83, 106],
  },
  {
    year: '2018',
    data: [38, 68, 70, 43, 67, 76, 70],
  },
  {
    year: '2019',
    data: [45, 60, 64, 52, 73, 70, 90],
  },
  {
    year: '2020',
    data: [41, 58, 63, 58, 68, 69, 98],
  },
  {
    year: '2021',
    data: [51, 62, 64, 53, 74, 70, 110],
  },
  {
    year: '2022',
    data: [47, 67, 71, 48, 78, 73, 111],
  },
  {
    year: '2023',
    data: [38, 59, 66, 43, 72, 72, 107],
  },
  {
    year: '2024',
    data: [43, 52, 65, 42, 76, 69, 103],
  },
];

const barRaceOption = {
  xAxis: {
    max: 'dataMax',
    axisLabel: {
      formatter: (val) => {
        return `${val}%`;
      },
    },
  },
  yAxis: {
    inverse: true,
    data: [
      '金融内容组',
      '消费零售组',
      '技术企业组',
      '医疗健康组',
      '文教娱乐组',
      '海外市场组',
      '基金投资组',
    ],
  },
  tooltip: {
    show: false,
  },
  series: [
    {
      realtimeSort: true,
      itemStyle: {
        color: (params) => {
          return colors[params.name];
        },
      },
      data: [22, 55, 24, 43, 83, 86, 72],
      label: {
        show: true,
        position: 'right',
        valueAnimation: true,
        formatter: '{c}%',
      },
    },
  ],
  animationDuration: 3000,
  animationDurationUpdate: 3000,
  animationEasing: 'linear',
  animationEasingUpdate: 'linear',
  graphic: {
    elements: [
      {
        type: 'text',
        right: 40,
        bottom: 60,
        style: {
          text: '2005',
          font: 'bolder 80px monospace',
          fill: 'rgba(100, 100, 100, 0.25)',
        },
        z: 100,
      },
    ],
  },
};

export const BarRace = () => {
  const option = barRaceOption;
  let chartInstance = { setOption: (o) => o };
  let index = 0;

  const getChartInstance = (chart) => {
    chartInstance = chart;
  };

  const update = () => {
    const optionCopy = option;
    if (index < dataByYear.length) {
      optionCopy.graphic.elements[0].style.text = dataByYear[index].year;
      optionCopy.series[0].data = dataByYear[index].data;
      index = index + 1;
      chartInstance.setOption(optionCopy);
    } else {
      return;
    }
  };

  const reset = () => {
    index = 0;
  };

  React.useEffect(() => {
    const intervalId = setInterval(function () {
      update();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="charts">
      <Bar
        data={option as BarChartsProps['data']}
        onChartReady={getChartInstance}
      />
      <button onClick={() => reset()}>play</button>
    </div>
  );
};

BarRace.storyName = 'BarRace（动态叙事）';

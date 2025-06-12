import { Bar, BarChartsProps } from '@charts-mobile';
import type { Meta } from '@storybook/react';
import { Mobile } from './mobile';

export default {
  title: 'Charts-Mobile/Bar 条形图',
  tags: ['autodocs'],
  component: Bar,
} satisfies Meta<typeof Bar>;

// BasicBar（条形图）
export const BasicBar = () => {
  const basic: BarChartsProps['data'] = {
    dataset: {
      source: [
        ['', '总数'],
        ['游戏', '433'],
        ['动漫', '100'],
        ['金融', '831'],
        ['教育', '864'],
        ['汽车交通交通交通交通', '724'],
        ['本地生活', '124'],
        ['企业服务', '224'],
        ['零售', '324'],
        ['前沿科技', '124'],
        ['在线视频', '88'],
      ],
    },
    series: [
      {
        type: 'bar',
      },
    ],
  };

  return (
    <Mobile>
      <Bar data={basic} />
    </Mobile>
  );
};
BasicBar.storyName = 'BasicBar（条形图）';

// GroupedBar（分组条形图）
export const GroupedBar = () => {
  const opt: BarChartsProps['data'] = {
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
  };

  return (
    <Mobile>
      <Bar data={opt} />
    </Mobile>
  );
};
GroupedBar.storyName = 'GroupedBar（分组条形图）';

// StackedBar（堆叠条形图）
export const StackedBar = () => {
  const opt: BarChartsProps['data'] = {
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
        type: 'bar',
        name: '男性',
        stack: 'Company',
        data: ['25', '17', '18', '12', '20', '12', '16', '19', '29'],
      },
      {
        type: 'bar',
        name: '女性',
        stack: 'Company',
        data: ['15', '10', '8', '9', '12', '11', '7', '8', '6'],
      },
      {
        type: 'bar',
        name: '未知',
        stack: 'Company',
        color: '#ccc',
        data: ['5', '1', '4', '2', '3', '6', '8', '6', '7'],
      },
    ],
  };

  return (
    <Mobile>
      <Bar data={opt} />
    </Mobile>
  );
};
StackedBar.storyName = 'StackedBar（堆叠条形图）';

// PercentageBar（百分比的条形图）
export const PercentageBar = () => {
  const opt: BarChartsProps['data'] = {
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
        name: '退出项目占比',
        type: 'bar',
        showBackground: true,
        data: ['22', '55', '24', '43', '83', '86', '72', '42'],
      },
    ],
  };

  return (
    <Mobile>
      <Bar data={opt} />
    </Mobile>
  );
};
PercentageBar.storyName = 'PercentageBar（百分比的条形图）';

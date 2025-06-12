import { Column, ColumnChartsProps } from '@charts-mobile';
import { Mobile } from './mobile';

export default {
  title: 'Charts-Mobile/Column 柱状图',
  tags: ['autodocs'],
  component: Column,
};

// BasicColumn（柱状图）
export const BasicColumn = () => {
  const basic: ColumnChartsProps['data'] = {
    xAxis: {
      data: ['投前', '投中', '上会', '投后', '退出'],
    },
    series: [
      {
        name: '项目数',
        type: 'bar',
        data: ['433', '831', '864', '724', '124'],
      },
    ],
  };

  return (
    <Mobile>
      <Column data={basic} />
    </Mobile>
  );
};
BasicColumn.storyName = 'BasicColumn（柱状图）';

// GroupedColumn（分组柱状图）
export const GroupedColumn = () => {
  const opt: ColumnChartsProps['data'] = {
    xAxis: {
      data: ['投前', '上会', '投资'],
    },
    series: [
      {
        name: '消费',
        type: 'bar',
        data: [320, 332, 301, 334, 390],
      },
      {
        name: '文创',
        type: 'bar',
        data: [220, 182, 191, 234, 290],
      },
      {
        name: '新农业',
        type: 'bar',
        data: [150, 232, 201, 154, 190],
      },
      {
        name: '物流',
        type: 'bar',
        data: [98, 77, 101, 99, 40],
      },
    ],
  };

  return (
    <Mobile>
      <Column data={opt} />
    </Mobile>
  );
};
GroupedColumn.storyName = 'GroupedColumn（分组柱状图）';

// StackedColumn（堆叠柱状图）
export const StackedColumn = () => {
  const opt: ColumnChartsProps['data'] = {
    xAxis: {
      data: ['2015', '2016', '2017', '2018'],
    },
    series: [
      {
        type: 'bar',
        name: 'pro-rata',
        stack: 'Company',
        data: ['25', '17', '8', '12'],
      },
      {
        type: 'bar',
        name: 'super pro-rata',
        stack: 'Company',
        data: ['30', '25', '10', '7'],
      },
      {
        type: 'bar',
        name: 'under pro-rata',
        stack: 'Company',
        data: ['35', '30', '20', '10'],
      },
      {
        type: 'bar',
        name: '不跟投',
        stack: 'Company',
        data: ['10', '20', '25', '5'],
      },
    ],
  };

  return (
    <Mobile>
      <Column data={opt} />
    </Mobile>
  );
};
StackedColumn.storyName = 'StackedColumn（堆叠柱状图）';

// ZoomColumn（支持数据缩放）
export const ZoomColumn = () => {
  const basic: ColumnChartsProps['data'] = {
    xAxis: {
      data: [
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
      ],
    },
    series: [
      {
        name: '项目数',
        type: 'bar',
        data: [
          '133',
          '231',
          '64',
          '74',
          '124',
          '77',
          '234',
          '55',
          '64',
          '133',
          '231',
          '64',
          '74',
          '124',
          '77',
          '234',
          '55',
          '64',
          '74',
        ],
      },
    ],
  };

  return (
    <Mobile>
      <Column dataZoom data={basic} />
    </Mobile>
  );
};
ZoomColumn.storyName = 'ZoomColumn（支持数据缩放）';

// MixColumnLine（柱线混合双轴图）
export const MixColumnLine = () => {
  const opt: ColumnChartsProps['data'] = {
    legend: {
      data: ['投资项目数量', '平均投资规模'],
    },
    xAxis: [
      {
        type: 'category',
        data: ['2014', '2015', '2016', '2017', '2018', '2019', '2020'],
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '数量/个',
        max: 50,
        interval: 10,
      },
      {
        type: 'value',
        name: '金额/bn',
        max: 50,
        interval: 10,
        axisLabel: {
          formatter: '{value} bn',
        },
      },
    ],
    series: [
      {
        name: '投资项目数量',
        type: 'bar',
        yAxisIndex: 0,
        data: [40, 40, 50, 26.4, 30, 40, 50, 20, 30],
      },
      {
        name: '平均投资规模',
        type: 'line' as any,
        yAxisIndex: 1,
        data: [30, 20, 40, 20, 30, 40, 20, 20],
      },
    ],
  };

  return (
    <Mobile>
      <Column dataZoom data={opt} />
    </Mobile>
  );
};
MixColumnLine.storyName = 'MixColumnLine（柱线混合双轴图）';

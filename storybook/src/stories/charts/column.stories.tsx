import { Column } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import './chart.css';

type Story = StoryObj<typeof Column>;

const chartTemplate = (args) => (
  <div className="charts">
    <Column {...args} />
  </div>
);

export default {
  title: 'Charts/Column 柱状图',
  component: Column,
} satisfies Meta<typeof Column>;

// BasicColumn（柱状图）
export const BasicColumn: Story = {
  name: 'BasicColumn（柱状图）',
  args: {
    data: {
      xAxis: {
        data: ['投前', '投中', '上会', '投后', '退出'],
      },
      series: [
        {
          data: ['433', '831', '864', '724', '124'],
        },
      ],
    },
  },
  render: chartTemplate,
};

// GroupedColumn（分组柱状图）
export const GroupedColumn: Story = {
  name: 'GroupedColumn（分组柱状图）',
  args: {
    data: {
      xAxis: {
        data: ['投前', '上会', '投资'],
      },
      series: [
        {
          name: '消费',
          data: [320, 332, 301, 334, 390],
        },
        {
          name: '文创',
          data: [220, 182, 191, 234, 290],
        },
        {
          name: '新农业',
          data: [150, 232, 201, 154, 190],
        },
        {
          name: '物流',
          data: [98, 77, 101, 99, 40],
        },
      ],
    },
    render: chartTemplate,
  },
};

// StackedColumn（堆叠柱状图）
export const StackedColumn: Story = {
  name: 'StackedColumn（堆叠柱状图）',
  args: {
    data: {
      xAxis: {
        data: ['2015', '2016', '2017', '2018'],
      },
      series: [
        { name: 'pro-rata', stack: 'Company', data: ['25', '17', '8', '12'] },
        {
          name: 'super pro-rata',
          stack: 'Company',
          data: ['30', '25', '10', '7'],
        },
        {
          name: 'under pro-rata',
          stack: 'Company',
          data: ['35', '30', '20', '10'],
        },
        { name: '不跟投', stack: 'Company', data: ['10', '20', '25', '5'] },
      ],
    },
  },
  render: chartTemplate,
};

// PercentageColumn（百分比的柱状图）
export const PercentageColumn: Story = {
  name: 'PercentageColumn（百分比的柱状图）',
  args: {
    data: {
      yAxis: {
        max: 100,
        min: 0,
        axisLabel: {
          formatter: (val) => {
            return `${val}%`;
          },
        },
      },
      xAxis: {
        data: ['2017', '2018', '2019', '2020', '2021'],
      },
      tooltip: {
        formatter: '{b0}: {c0}%',
      },
      series: [
        {
          showBackground: true,
          data: ['43', '83', '86', '72', '12'],
        },
      ],
    },
  },
  render: chartTemplate,
};

// ZoomColumn（支持数据缩放）
export const ZoomColumn: Story = {
  name: 'ZoomColumn（支持数据缩放）',
  args: {
    data: {
      xAxis: {
        data: [
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
        ],
      },
      series: [
        {
          data: [
            '20',
            '23',
            '23',
            '33',
            '43',
            '40',
            '33',
            '44',
            '46',
            '83',
            '86',
            '72',
          ],
        },
        {
          data: [
            '15',
            '18',
            '25',
            '35',
            '25',
            '45',
            '55',
            '65',
            '60',
            '73',
            '65',
            '53',
          ],
        },
      ],
    },
    dataZoom: true,
  },
  render: chartTemplate,
};

// RotateColumn（横轴label旋转）
// export const RotateColumn = () => {
//   const opt = {
//     grid: {
//       right: '10%'
//     },
//     xAxis: {
//       data: [
//         '2008 long long long long',
//         '2009 long long long long',
//         '2010 long long long long',
//         '2011 long long long long',
//         '2012 long long long long',
//         '2013 long long long long',
//         '2014 long long long long',
//         '2015 long long long long',
//         '2016 long long long long',
//         '2017 long long long long',
//         '2018 long long long long',
//         '2019 long long long long'
//       ]
//     },
//     series: [
//       {
//         type: 'bar',
//         data: ['20', '23', '23', '33', '43', '40', '33', '44', '46', '83', '86', '72']
//       }
//     ]
//   }

//   return (
//     <div className="charts">
//       <Column autoRotateLabel data={opt}/>
//     </div>
//   )
// }
// RotateColumn.name = 'RotateColumn（横轴label旋转）'

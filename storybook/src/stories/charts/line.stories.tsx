import React from 'react';
import { Line, LineChartsProps, EChartsInstance } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import './chart.css';

export default {
  title: 'Charts/Line 折线图',
  component: Line,
} satisfies Meta<typeof Line>;
type Story = StoryObj<typeof Line>;

const LineChartTemplate = (args: LineChartsProps) => (
  <div className="charts">
    <Line {...args} />
  </div>
);

// BasicLine（折线图）
export const BasicLine: Story = {
  render: LineChartTemplate,
};
BasicLine.args = {
  data: {
    xAxis: {
      // 5.5 New feature
      axisLabel: {
        alignMinLabel: 'left',
        alignMaxLabel: 'right',
      },
      data: ['2016', '2017', '2018', '2019'],
    },
    series: [
      {
        name: '新投资',
        data: ['42', '83', '86', '72'],
        // markLine: { silent: true, data: [{ type: 'average', name: 'Avg' },] }
      },
      {
        name: '再融资',
        data: ['85', '73', '65', '53'],
      },
    ],
  },
  // 以上data等价于
  // {
  //   dataset: {
  //     source: [
  //       ['', '新投资', '再融资'],
  //       ['2016', '43', '85'],
  //       ['2017', '83', '73'],
  //       ['2018', '86', '65'],
  //       ['2019', '72', '53']
  //     ]
  //   }
  // }
};
BasicLine.storyName = 'BasicLine（折线图）';

// SmoothLine（平滑曲线折线图）
export const SmoothLineChart: Story = {
  render: LineChartTemplate,
};
SmoothLineChart.args = {
  data: {
    dataset: {
      source: [
        ['', '个数'],
        ['2016', '23'],
        ['2017', '55'],
        ['2018', '86'],
        ['2019', '72'],
        ['2020', '42'],
      ],
    },
  },
  shape: 'smooth',
};
SmoothLineChart.storyName = 'SmoothLine（平滑曲线图）';

// ShadowLine（阴影平滑曲线折线图）
export const ShadowLineChart: Story = {
  render: LineChartTemplate,
};
ShadowLineChart.args = {
  data: {
    dataset: {
      source: [
        ['', '新投资', '再融资'],
        ['2016', '23', '65'],
        ['2017', '55', '43'],
        ['2018', '86', '75'],
        ['2019', '72', '53'],
        ['2020', '42', '33'],
      ],
    },
  },
  shape: 'smooth',
  shadow: true,
};
ShadowLineChart.storyName = 'ShadowLine（渐变阴影线图）';

// StepLine（阶梯折线图）
export const StepLineChart: Story = {
  render: LineChartTemplate,
};
StepLineChart.args = {
  data: {
    dataset: {
      source: [
        ['', 'USD', 'EUR'],
        ['Jan', '6.8', '7.7'],
        ['Feb', '6.5', '7.6'],
        ['Mar', '6.7', '7.5'],
        ['Apr', '6.8', '7.7'],
      ],
    },
    yAxis: {
      min: 'dataMin',
      max: 'dataMax',
    },
  },
  shape: 'step',
};
StepLineChart.storyName = 'StepLine（阶梯折线图）';

// ZoomLine（支持横轴数据缩放）
export const ZoomLineChart: Story = {
  render: LineChartTemplate,
};
ZoomLineChart.args = {
  data: {
    xAxis: {
      data: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'],
    },
    series: [
      {
        name: '新投资',
        data: ['42', '83', '86', '72', '43', '56', '90'],
      },
      {
        name: '再融资',
        data: ['85', '73', '65', '53', '88', '55', '78'],
      },
    ],
  },
  dataZoom: true,
};
ZoomLineChart.storyName = 'ZoomLine（支持数据缩放）';

// 生成正态分布数组
function generateReturnArray() {
  const arr: number[] = [];
  let base = 0;
  for (let i = 0; i < 100; i++) {
    // 生成正态分布的随机数
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); // 不能为0
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.05; // 缩放和移动随机数
    if (num > 1 || num < -1) continue; // 如果不在我们想要的范围内，就重新生成

    // 确保整体趋势是上涨的
    base += num;
    if (base < 0) {
      base = 0;
      num = 0;
    }
    base = parseFloat(base.toFixed(2));
    arr.push(base);
  }
  return arr;
}

// 生成日期数组
function generateDateArray() {
  const arr: string[] = [];
  const currentDate = new Date('2019-01-01');
  for (let i = 0; i < 100; i++) {
    const dateString = currentDate.toISOString().slice(0, 10);
    arr.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return arr;
}

const jsonData = new Array(5).fill(null).map((_, i) => ({
  name: `模拟仓${i + 1}`,
  data: generateReturnArray(),
}));

const seriesList: any[] = [];
jsonData.forEach((item) => {
  seriesList.push({
    showSymbol: false,
    endLabel: {
      show: true,
      valueAnimation: true,
      formatter: '{a}: {c}',
    },
    labelLayout: {
      moveOverlap: 'shiftY',
    },
    ...item,
  });
});

// LineRace（动态叙事）
export const LineRace = (args) => {
  let chartInstance: EChartsInstance = {} as EChartsInstance;

  const getChartInstance = (chart) => {
    chartInstance = chart;
  };

  const reset = () => {
    const opts = chartInstance?.getOption?.();
    chartInstance.clear();
    chartInstance.setOption(opts);
  };

  React.useEffect(() => {
    setTimeout(() => {
      reset();
    }, 500);
  });

  return (
    <div className="charts">
      <Line {...args} onChartReady={(chart) => getChartInstance(chart)} />
      <button onClick={() => reset()}>play</button>
    </div>
  );
};

LineRace.args = {
  data: {
    grid: {
      right: 120,
    },
    xAxis: {
      // 5.5 New feature
      axisLabel: {
        interval: 'auto',
        alignMinLabel: 'left',
        alignMaxLabel: 'right',
      },
      data: generateDateArray(),
    },
    animationDuration: 15000,
    series: seriesList,
  },
};

LineRace.storyName = 'LineRace（动态叙事）';

/**
 * 已废弃
 */
// RotateBasicLine（支持横轴label旋转缩放）
// export const RotateBasicLine = () => {
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
//         type: 'line',
//         data: ['20', '23', '23', '33', '43', '40', '33', '44', '46', '83', '86', '72']
//       }
//     ]
//   }

//   return (
//   <div className="charts">
//     <Line data={opt} autoRotateLabel/>
//   </div>
//   )
// }
// RotateBasicLine.storyName = 'RotateBasicLine（横轴label旋转）'

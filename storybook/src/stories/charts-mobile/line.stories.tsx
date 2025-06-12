import { Line, LineChartsProps } from '@charts-mobile';
import { Mobile } from './mobile';

export default {
  title: 'Charts-Mobile/line 折线图',
  tags: ['autodocs'],
  component: Line,
};

// BasicLine（折线图）
export const BasicLine = () => {
  const basic: LineChartsProps['data'] = {
    dataset: {
      source: [
        ['', '新投资', '再融资'],
        ['2016', '43', '85'],
        ['2017', '83', '73'],
        ['2018', '86', '65'],
        ['2019', '72', '53'],
      ],
    },
    series: [{ type: 'line' }, { type: 'line' }],
  };

  return (
    <Mobile>
      <Line data={basic} />
    </Mobile>
  );
};
BasicLine.storyName = 'BasicLine（折线图）';

// SmoothLine（平滑曲线折线图）
export const SmoothLineChart = () => {
  const opt: LineChartsProps['data'] = {
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
    series: [{ type: 'line' }],
  };

  return (
    <Mobile>
      <Line data={opt} shape="smooth" />
    </Mobile>
  );
};
SmoothLineChart.storyName = 'SmoothLine（平滑曲线图）';

// ShadowLine（阴影平滑曲线折线图）
export const ShadowLineChart = () => {
  const opt: LineChartsProps['data'] = {
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
    series: [
      {
        type: 'line',
        smooth: true,
      },
      {
        type: 'line',
        smooth: true,
      },
    ],
  };

  return (
    <Mobile>
      <Line data={opt} shadow />
    </Mobile>
  );
};
ShadowLineChart.storyName = 'ShadowLine（渐变阴影线图）';

// ZoomLine（支持横轴数据缩放）
export const ZoomLineChart = () => {
  const zoomLine: LineChartsProps['data'] = {
    dataset: {
      source: [
        ['', '新投资', '再融资'],
        ['2008', '20', '15'],
        ['2009', '23', '18'],
        ['2010', '23', '25'],
        ['2011', '33', '35'],
        ['2012', '43', '25'],
        ['2013', '40', '45'],
        ['2014', '33', '55'],
        ['2015', '44', '65'],
        ['2016', '46', '60'],
        ['2017', '83', '73'],
        ['2018', '86', '65'],
        ['2019', '72', '53'],
      ],
    },
    series: [{ type: 'line' }, { type: 'line' }],
  };

  return (
    <Mobile>
      <Line dataZoom data={zoomLine} />
    </Mobile>
  );
};
ZoomLineChart.storyName = 'ZoomLine（支持数据缩放）';

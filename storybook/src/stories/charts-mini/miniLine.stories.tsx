import { MiniLine, LineChartsProps } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import '../chart.css';

export default {
  title: 'Charts-Mini/Line 迷你折线图',
  tags: ['autodocs'],
  component: MiniLine,
} satisfies Meta<typeof MiniLine>;
type Story = StoryObj<typeof MiniLine>;

function randomValue() {
  return Math.round(Math.random() * 1000);
}

const MiniLineChartTemplate = ({ ...rest }: LineChartsProps) => {
  const { data: opt } = { ...rest };

  return (
    <div>
      <table className="demo-table">
        <thead>
          <tr>
            <td>机构</td>
            {(opt?.dataset as any)?.source
              ?.slice(6, 11)
              .map((item) => <td key={item.time}>{item.time}</td>)}
            <td>趋势</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>公司投资</td>
            {(opt.dataset as any)?.source
              ?.slice(6, 11)
              .map((item) => <td key={item.time}>{item.value}</td>)}
            <td>
              <div className="mini-charts">
                <MiniLine {...rest} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="demo-tooltips">
        <div className="mini-charts">
          <MiniLine {...rest} />
        </div>
      </div>
    </div>
  );
};

// BasicMiniLine（迷你折线图）
export const BasicMiniLine: Story = {
  render: MiniLineChartTemplate,
};

BasicMiniLine.args = {
  data: {
    dataset: {
      source: [
        { time: '2010', value: randomValue() },
        { time: '2011', value: randomValue() },
        { time: '2012', value: randomValue() },
        { time: '2013', value: randomValue() },
        { time: '2014', value: randomValue() },
        { time: '2015', value: randomValue() },
        { time: '2016', value: randomValue() },
        { time: '2017', value: randomValue() },
        { time: '2018', value: randomValue() },
        { time: '2019', value: randomValue() },
        { time: '2020', value: randomValue() },
        { time: '2021', value: randomValue() },
      ],
    },
    series: [
      {
        markLine: { silent: true, symbol: 'none', data: [{ yAxis: 500 }] },
      },
    ],
  },
};
BasicMiniLine.storyName = 'BasicMiniLine（迷你折线图）';

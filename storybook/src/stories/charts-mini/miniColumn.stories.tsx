import { MiniColumn, ColumnChartsProps } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import '../chart.css';

export default {
  title: 'Charts-Mini/Column 迷你柱状图图',
  tags: ['autodocs'],
  component: MiniColumn,
} satisfies Meta<typeof MiniColumn>;
type Story = StoryObj<typeof MiniColumn>;

function randomValue() {
  return Math.round(Math.random() * 1000);
}

const MiniColumChartTemplate = ({ ...rest }: ColumnChartsProps) => {
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
            <td>近10年</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>公司投资</td>
            {(opt?.dataset as any)?.source
              ?.slice(6, 11)
              .map((item) => <td key={item.time}>{item.value}</td>)}
            <td>
              <div className="mini-charts">
                <MiniColumn {...rest} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="demo-tooltips">
        <div className="mini-charts">
          <MiniColumn {...rest} />
        </div>
      </div>
    </div>
  );
};

// BasicMiniBar（迷你柱状图图）
export const BasicMiniColumn: Story = {
  render: MiniColumChartTemplate,
};

BasicMiniColumn.args = {
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
  },
};
BasicMiniColumn.storyName = 'BasicMiniBar（迷你柱状图）';

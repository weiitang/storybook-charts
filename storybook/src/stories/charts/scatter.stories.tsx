import { Scatter, ScatterChartsProps } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import '../chart.css';

export default {
  title: 'Charts/Scatter 散点图',
  tags: ['autodocs'],
  argTypes: {
    showLoading: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
  component: Scatter,
} satisfies Meta<typeof Scatter>;
type Story = StoryObj<typeof Scatter>;

const ScatterChartTemplate = ({ ...rest }: ScatterChartsProps) => (
  <div className="charts">
    <Scatter {...rest} />
  </div>
);

// Scatter（散点图）
export const BasicScatter: Story = {
  render: ScatterChartTemplate,
};

BasicScatter.storyName = 'Scatter（散点图）';
BasicScatter.args = {
  data: {
    dataset: {
      source: [
        ['time', 'amount', 'name'],
        ['2020-05-04', '3293', 'Fluree'],
        ['2020-05-05', '1303', 'NextBillion AI'],
        ['2020-05-06', '309', '海管家'],
        ['2020-05-07', '4317', '时谛智能'],
        ['2020-05-08', '6317', 'Aye Finance	'],
        ['2020-05-09', '437', 'ClickUp'],
        ['2020-05-10', '533', '京东数科'],
        ['2020-05-11', '1822', 'Hunter Boot'],
        ['2020-05-12', '953', '和黄中国医药'],
        ['2020-05-13', '2551', 'Braintrust'],
        ['2020-05-14', '630', '狮尾智能'],
        ['2020-05-15', '410', '弹钱吧'],
        ['2020-05-16', '292', 'Yulu'],
        ['2020-05-17', '8882', 'Tara Biosystems'],
        ['2020-05-18', '399', '贝纯'],
        ['2020-05-19', '402', '星异象'],
        ['2020-05-20', '3429', 'CoClean众清科技'],
      ],
    },
  },
};

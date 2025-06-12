import { Pie, PieChartsProps } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import '../chart.css';

export default {
  title: 'Charts/Pie 饼图',
  tags: ['autodocs'],
  // https://storybook.js.org/docs/react/essentials/controls
  argTypes: {
    showLoading: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
  component: Pie,
} satisfies Meta<typeof Pie>;
type Story = StoryObj<typeof Pie>;

const PieChartTemplate = ({ ...rest }: PieChartsProps) => (
  <div className="charts">
    <Pie {...rest} />
  </div>
);

// Pie（饼图）
export const BasicPie: Story = {
  render: PieChartTemplate,
};

BasicPie.storyName = 'Pie（饼图）';
BasicPie.args = {
  data: {
    dataset: {
      source: [
        ['', '公司数'],
        ['天使轮', '125'],
        ['A轮', '85'],
        ['B轮', '40'],
        ['C轮', '20'],
        ['D轮', '15'],
        ['E轮', '13'],
      ],
    },
    series: [
      {
        radius: '50%',
        center: ['50%', '50%'],
      },
    ],
  },
};

// Donut（环形图）
export const Donut: Story = {
  render: PieChartTemplate,
};

Donut.storyName = 'Donut（环形图）';
Donut.args = {
  data: {
    dataset: {
      source: [
        ['', '公司数'],
        ['天使轮', '125'],
        ['A轮', '85'],
        ['B轮', '40'],
        ['C轮', '20'],
        ['D轮', '15'],
        ['E轮', '13'],
      ],
    },
    series: [
      {
        radius: ['40%', '55%'],
        center: ['50%', '50%'],
      },
    ],
  },
};

// HalfDonut（半圆饼图）
export const HalfDonut: Story = {
  render: PieChartTemplate,
};

HalfDonut.storyName = 'HalfDonut（半圆饼图）';
HalfDonut.args = {
  data: {
    dataset: {
      source: [
        ['', '公司数'],
        ['天使轮', '125'],
        ['A轮', '85'],
        ['B轮', '40'],
        ['C轮', '20'],
        ['D轮', '15'],
        ['E轮', '13'],
      ],
    },
    series: [
      {
        // https://echarts.apache.org/handbook/zh/basics/release-note/5-5-0 支持结束角度
        startAngle: 180,
        endAngle: 360,
        radius: ['40%', '55%'],
        center: ['50%', '50%'],
      },
    ],
  },
};

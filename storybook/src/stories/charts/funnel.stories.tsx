import { Funnel, FunnelChartsProps } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import '../chart.css';

const FunnelChartTemplate = ({ ...rest }: FunnelChartsProps) => {
  return (
    <div className="charts">
      <Funnel {...rest} />
    </div>
  );
};

export default {
  title: 'Charts/Funnel 漏斗图',
  tags: ['autodocs'],
  argTypes: {
    shape: {
      options: ['无', 'sharp'],
      control: { type: 'select' },
    },
  },
  component: Funnel,
} satisfies Meta<typeof Funnel>;
type Story = StoryObj<typeof Funnel>;

// Funnel（漏斗图）
export const BasicFunnel: Story = {
  render: FunnelChartTemplate,
};

BasicFunnel.args = {
  data: {
    dataset: {
      source: [
        ['', '总数'],
        ['投前', '433'],
        ['投中', '331'],
        ['上会', '264'],
        ['投后', '124'],
        ['退出', '94'],
      ],
    },
  },
};
BasicFunnel.storyName = 'Funnel（漏斗图）';

// SharpFunnel（尖底漏斗图）
export const SharpFunnel: Story = {
  render: FunnelChartTemplate,
};

SharpFunnel.args = {
  data: {
    dataset: {
      source: [
        ['', '总数'],
        ['C轮', '60'],
        ['C+轮', '40'],
        ['D轮', '20'],
        ['B轮', '80'],
        ['A轮', '100'],
      ],
    },
  },
  shape: 'sharp',
};
SharpFunnel.storyName = 'SharpFunnel（尖底漏斗图）';

// CompareFunnel（对比漏斗图）
export const CompareFunnel: Story = {
  render: FunnelChartTemplate,
};

CompareFunnel.args = {
  data: {
    series: [
      {
        name: '全部',
        left: '10%',
        top: 0,
        width: '40%',
        height: '75%',
        funnelAlign: 'right',
        label: {
          position: 'insideRight',
        },
        data: [
          {
            value: 433,
            name: '投前',
          },
          {
            value: 311,
            name: '投中',
          },
          {
            value: 264,
            name: '投后',
          },
          {
            value: 94,
            name: '退出',
          },
        ],
      },
      {
        name: '今年',
        left: '50%',
        top: 0,
        width: '40%',
        height: '75%',
        funnelAlign: 'left',
        label: {
          position: 'insideLeft',
        },
        data: [
          {
            value: 88,
            name: '投前',
          },
          {
            value: 78,
            name: '投中',
          },
          {
            value: 68,
            name: '投后',
          },
          {
            value: 28,
            name: '退出',
          },
        ],
      },
    ],
  },
};
CompareFunnel.storyName = 'CompareFunnel（对比漏斗图）';

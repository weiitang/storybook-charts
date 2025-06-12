import { Funnel, FunnelChartsProps } from '@charts-mobile';
import { Mobile } from './mobile';

export default {
  title: 'Charts-Mobile/Funnel 漏斗图',
  component: Funnel,
};

// Funnel（漏斗图）
export const BasicFunnel = () => {
  const opt: FunnelChartsProps['data'] = {
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
    series: [
      {
        type: 'funnel',
      },
    ],
  };

  return (
    <Mobile>
      <Funnel data={opt} />
    </Mobile>
  );
};
BasicFunnel.storyName = 'Funnel（漏斗图）';

// SharpFunnel（尖底漏斗图）
export const SharpFunnel = () => {
  const opt: FunnelChartsProps['data'] = {
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
    series: [
      {
        type: 'funnel',
      },
    ],
  };

  return (
    <Mobile>
      <Funnel data={opt} shape="sharp" />
    </Mobile>
  );
};
SharpFunnel.storyName = 'SharpFunnel（尖底漏斗图）';

// CompareFunnel（对比漏斗图）
export const CompareFunnel = () => {
  const opt: FunnelChartsProps['data'] = {
    series: [
      {
        name: '全部',
        type: 'funnel',
        left: '10%',
        top: '10%',
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
        type: 'funnel',
        left: '50%',
        top: '10%',
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
  };

  return (
    <Mobile>
      <Funnel data={opt} />
    </Mobile>
  );
};
CompareFunnel.storyName = 'CompareFunnel（对比漏斗图）';

import { Pie, PieChartsProps } from '@charts-mobile';
import { Mobile } from './mobile';

export default {
  title: 'Charts-Mobile/Pie 饼图',
  component: Pie,
};

// Pie（饼图）
export const BasicPie = () => {
  const opt: PieChartsProps['data'] = {
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
        type: 'pie',
        radius: '50%',
        center: ['50%', '50%'],
      },
    ],
  };

  return (
    <Mobile>
      <Pie data={opt} />
    </Mobile>
  );
};
BasicPie.storyName = 'Pie（饼图）';

// Donut（环形图）
export const Donut = () => {
  const opt: PieChartsProps['data'] = {
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
        type: 'pie',
        radius: ['40%', '55%'],
        center: ['50%', '50%'],
      },
    ],
  };

  return (
    <Mobile>
      <Pie data={opt} />
    </Mobile>
  );
};
Donut.storyName = 'Donut（环形图）';

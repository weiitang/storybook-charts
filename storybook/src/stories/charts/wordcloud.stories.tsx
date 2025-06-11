import { WordCloud, WordCloudChartsProps } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import './chart.css';

export default {
  title: 'Charts/WordCloud 词云',
  tags: ['autodocs'],
  component: WordCloud,
} satisfies Meta<typeof WordCloud>;
type Story = StoryObj<typeof WordCloud>;

const WordCloudChartTemplate = (args: WordCloudChartsProps) => (
  <div className="charts">
    <WordCloud {...args} />
  </div>
);
// WordCloud（词云）
export const BasicWordCloud: Story = {
  render: WordCloudChartTemplate,
};
BasicWordCloud.args = {
  data: {
    series: [
      {
        data: [
          {
            name: '游戏',
            value: 833,
          },
          {
            name: '动漫',
            value: 100,
          },
          {
            name: '金融',
            value: 1831,
          },
          {
            name: '教育',
            value: 864,
          },
          {
            name: '汽车交通',
            value: 43,
          },
          {
            name: '本地生活',
            value: 124,
          },
          {
            name: '企业服务',
            value: 2224,
          },
          {
            name: '零售',
            value: 524,
          },
          {
            name: '前沿科技',
            value: 24,
          },
          {
            name: '在线视频',
            value: 188,
          },
          {
            name: '文娱传媒',
            value: 433,
          },
          {
            name: '垂直媒体',
            value: 130,
          },
          {
            name: '母婴社区',
            value: 331,
          },
          {
            name: '新媒体',
            value: 864,
          },
          {
            name: '新媒体',
            value: 43,
          },
          {
            name: '智能装备',
            value: 124,
          },
          {
            name: '智能汽车',
            value: 224,
          },
          {
            name: 'ADAS辅助驾驶',
            value: 324,
          },
          {
            name: '车载及出行',
            value: 124,
          },
          {
            name: '化学化工',
            value: 8,
          },
        ],
      },
    ],
  },
};
BasicWordCloud.storyName = 'WordCloud（词云）';

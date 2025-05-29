import { Bubble } from '../../../../packages/charts-pc/react';
import type { Meta, StoryObj } from '@storybook/react';
import './chart.css';

export default {
  title: 'Charts/Bubble',
  component: (args) => (
    <div className="charts">
      <Bubble {...args} />
    </div>
  ),
} satisfies Meta<typeof Bubble>;
type Story = StoryObj<typeof Bubble>;

const TemplateChart = (args) => (
  <div className="charts">
    <Bubble {...args} />
  </div>
);
// Bubble（气泡图）
export const BasicBubble: Story = {
  args: {
    data: {
      dataset: {
        source: [
          ['', '总数'],
          ['天使轮 - A轮', '564'],
          ['A+轮 - B轮', '211'],
          ['B+轮 - C轮', '522'],
          ['C+轮 - F轮', '831'],
          ['上市轮', '168'],
          ['收购/并购', '68'],
        ],
      },
    },
  },
  render: TemplateChart,
};
BasicBubble.storyName = 'Bubble（气泡图）';

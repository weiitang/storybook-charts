import { Geo, GeoMapChartsProps } from '@charts';
import type { Meta, StoryObj } from '@storybook/react';
import '../chart.css';

export default {
  title: 'Charts/Map 地图',
  tags: ['autodocs'],
  component: Geo,
} satisfies Meta<typeof Geo>;
type Story = StoryObj<typeof Geo>;

function randomValue() {
  return Math.round(Math.random() * 1000);
}

const GeoChartTemplate = (args: GeoMapChartsProps) => (
  <div className="charts">
    <Geo {...args} />
  </div>
);

// Map（热力地图）
export const BasicMap: Story = {
  render: GeoChartTemplate,
};
BasicMap.args = {
  data: {
    series: [
      {
        name: 'xx超市 - 门店数量',
        data: [
          { name: '北京', value: randomValue() },
          { name: '天津', value: randomValue() },
          { name: '上海', value: randomValue() },
          { name: '重庆', value: randomValue() },
          { name: '河北', value: randomValue() },
          { name: '河南', value: randomValue() },
          { name: '云南', value: randomValue() },
          { name: '辽宁', value: randomValue() },
          { name: '黑龙江', value: randomValue() },
          { name: '湖南', value: randomValue() },
          { name: '安徽', value: randomValue() },
          { name: '山东', value: randomValue() },
          { name: '新疆', value: randomValue() },
          { name: '江苏', value: randomValue() },
          { name: '浙江', value: randomValue() },
          { name: '江西', value: randomValue() },
          { name: '湖北', value: randomValue() },
          { name: '广西', value: randomValue() },
          { name: '甘肃', value: randomValue() },
          { name: '山西', value: randomValue() },
          { name: '内蒙古', value: randomValue() },
          { name: '陕西', value: randomValue() },
          { name: '吉林', value: randomValue() },
          { name: '福建', value: randomValue() },
          { name: '贵州', value: randomValue() },
          { name: '广东', value: randomValue() },
          { name: '青海', value: randomValue() },
          { name: '西藏', value: randomValue() },
          { name: '四川', value: randomValue() },
          { name: '宁夏', value: randomValue() },
          { name: '海南', value: randomValue() },
          { name: '台湾', value: randomValue() },
          { name: '香港', value: randomValue() },
          { name: '澳门', value: randomValue() },
        ],
      },
    ],
  },
};
BasicMap.storyName = 'Map (热力地图)';

// BubbleMap（气泡地图）
export const BasicBubbleMap: Story = {
  render: GeoChartTemplate,
};
BasicBubbleMap.args = {
  data: {
    series: [
      {
        data: [
          { name: '深圳', value: [114.066112, 22.548515, 755] },
          { name: '上海', value: [121.480237, 31.236305, 655] },
          { name: '北京', value: [116.413554, 39.911013, 955] },
        ],
      },
    ],
  },
  bubble: true,
};
BasicBubbleMap.storyName = 'BubbleMap (气泡地图)';

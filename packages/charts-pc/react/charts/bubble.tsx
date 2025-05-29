import { Component } from 'react';
import { Chart } from '../charts';
import { Model } from '../../core/charts/bubble';

import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { BubbleChartsProps } from '../../core/types';

echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  LegendComponent,
  ScatterChart,
  CanvasRenderer,
]);
class Bubble extends Component<BubbleChartsProps> {
  private model: any;

  constructor(props) {
    super(props);
    this.model = new Model();
  }

  render() {
    const chartModel = this.model.init(this.props);

    return (
      <Chart echarts={echarts} option={chartModel?.option} {...this.props} />
    );
  }
}

export { Bubble };

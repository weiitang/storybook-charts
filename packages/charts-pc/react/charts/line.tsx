import { Component } from 'react';

import { Chart } from '../charts';
import { Model } from '../../core/charts/line';
import type { LineChartsProps } from '../../core/types';

import { LineChart } from 'echarts/charts';
import * as echarts from 'echarts/core';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  LegendComponent,
  DataZoomComponent,
  MarkLineComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  CanvasRenderer,
  MarkLineComponent,
  LegendComponent,
  DataZoomComponent,
]);

class Line extends Component<LineChartsProps> {
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

export { Line };

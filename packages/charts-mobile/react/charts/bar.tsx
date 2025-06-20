import { Component } from 'react';
import { Chart } from '../chart';
import { Model } from '../../core/charts/bar';

import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { BarChartsProps } from '../../core/types';

echarts.use([
  GridComponent,
  TooltipComponent,
  TitleComponent,
  AxisPointerComponent,
  DatasetComponent,
  LegendComponent,
  DataZoomComponent,
  CanvasRenderer,
  BarChart,
]);
class Bar extends Component<BarChartsProps> {
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

export { Bar };

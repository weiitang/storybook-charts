import { PureComponent } from 'react';

import * as echarts from 'echarts/core';
import { ScatterChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

import type { ScatterChartsProps } from '..';

import { Chart } from '../charts';
import { Model } from '../../core/charts/scatter';

echarts.use([
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  CanvasRenderer,
]);

class Scatter extends PureComponent<ScatterChartsProps> {
  private model: Model;

  constructor(props: ScatterChartsProps) {
    super(props);
    this.model = new Model();
  }

  render() {
    const scatterModel = this.model.init(this.props);

    return (
      <Chart {...this.props} echarts={echarts} option={scatterModel?.option} />
    );
  }
}

export { Scatter };

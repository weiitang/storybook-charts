import { PureComponent } from 'react';

import * as echarts from 'echarts/core';
import { CandlestickChart } from 'echarts/charts';

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import type { KChartsProps } from '..';

import { Chart } from '../charts';
import { Model } from '../../core/charts/k';

echarts.use([
  CandlestickChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  CanvasRenderer,
]);

class K extends PureComponent<KChartsProps> {
  private model: Model;

  constructor(props) {
    super(props);
    this.model = new Model();
  }

  render() {
    const kModel = this.model.init(this.props);

    return <Chart {...this.props} echarts={echarts} option={kModel?.option} />;
  }
}

export { K };

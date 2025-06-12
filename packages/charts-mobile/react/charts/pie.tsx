import { PureComponent } from 'react';

import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

import type { PieChartsProps } from '../../core/types';

import { Chart } from '../chart';
import { Model } from '../../core/charts/pie';

echarts.use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  CanvasRenderer,
]);

class Pie extends PureComponent<PieChartsProps> {
  private model: Model;

  constructor(props) {
    super(props);
    this.model = new Model();
  }

  render() {
    const pieModel = this.model.init(this.props);

    return (
      <Chart {...this.props} echarts={echarts} option={pieModel?.option} />
    );
  }
}

export { Pie };

import { PureComponent } from 'react';

import * as echarts from 'echarts/core';
import { FunnelChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { Chart } from '../charts';
import { Model } from '../../core/charts/funnel';
import { FunnelChartsProps } from '../../core/types';

echarts.use([
  FunnelChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  CanvasRenderer,
]);

class Funnel extends PureComponent<FunnelChartsProps> {
  private model: Model;

  constructor(props: FunnelChartsProps) {
    super(props);
    this.model = new Model();
  }

  render() {
    const funnelModel = this.model.init(this.props);

    return (
      <Chart {...this.props} echarts={echarts} option={funnelModel?.option} />
    );
  }
}

export { Funnel };

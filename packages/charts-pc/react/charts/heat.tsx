import { PureComponent } from 'react';

import * as echarts from 'echarts/core';
import { HeatmapChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  CalendarComponent,
  VisualMapComponent,
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';

import { Chart } from '../charts';
import { Model } from '../../core/charts/heat';
import { HeatChartsProps } from '..';

echarts.use([
  HeatmapChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  CalendarComponent,
  VisualMapComponent,
  CanvasRenderer,
]);

class Heat extends PureComponent<HeatChartsProps> {
  private model: Model;

  constructor(props: HeatChartsProps) {
    super(props);
    this.model = new Model();
  }

  render() {
    const heatModel = this.model.init(this.props);

    return (
      <Chart {...this.props} echarts={echarts} option={heatModel?.option} />
    );
  }
}

export { Heat };

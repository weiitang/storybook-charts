import { PureComponent } from 'react';

import * as echarts from 'echarts/core';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  MarkLineComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { Chart } from '../charts';
import { Model } from '../../core/charts-mini/miniLine';
import { LineChartsProps } from '..';

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  MarkLineComponent,
  CanvasRenderer,
]);

class MiniLine extends PureComponent<LineChartsProps> {
  private model: Model;
  protected onSizeChange: (dom: any) => void;

  constructor(props: LineChartsProps) {
    super(props);
    this.model = new Model();
    this.state = {
      chartDom: null,
    };
    this.onSizeChange = (dom) => {
      this.setState({
        chartDom: dom,
      });
    };
  }

  render() {
    const miniLineModel = this.model.init({ ...this.props });

    return (
      <Chart {...this.props} echarts={echarts} option={miniLineModel?.option} />
    );
  }
}

export { MiniLine };

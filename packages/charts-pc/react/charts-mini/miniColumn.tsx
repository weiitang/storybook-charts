import { PureComponent } from 'react';
import * as echarts from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { Chart } from '../charts';
import { Model } from '../../core/charts-mini/miniBar';
import { BarChartsProps } from '..';

echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  AxisPointerComponent,
  CanvasRenderer,
]);

class MiniColumn extends PureComponent<BarChartsProps> {
  private model: Model;
  protected onSizeChange: (dom: any) => void;

  constructor(props: BarChartsProps) {
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
    const miniColumnModel = this.model.init({ ...this.props });

    return (
      <Chart
        {...this.props}
        echarts={echarts}
        option={miniColumnModel?.option}
      />
    );
  }
}

export { MiniColumn };

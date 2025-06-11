import { Component } from 'react';
import { Chart } from '../charts';
import { Model } from '../../core/charts/treeMap';

import * as echarts from 'echarts/core';
import { TreemapChart } from 'echarts/charts';
import { ToolboxComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

import { TreeMapChartsProps } from '../../core/types';

echarts.use([TooltipComponent, CanvasRenderer, TreemapChart, ToolboxComponent]);

class TreeMap extends Component<TreeMapChartsProps> {
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

export { TreeMap };

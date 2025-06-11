import { Component } from 'react';

import { Chart } from '../charts';
import { Model } from '../../core/charts/force';

import * as echarts from 'echarts/core';
import { GraphChart } from 'echarts/charts';
import { ForceChartsProps } from '../../core/types';

echarts.use([GraphChart]);

class Force extends Component<ForceChartsProps> {
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

export { Force };

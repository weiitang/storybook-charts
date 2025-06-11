import { Component } from 'react';

import { Chart } from '../charts';
import { Model } from '../../core/charts/map';

import * as echarts from 'echarts/core';
import { GeoComponent, VisualMapComponent } from 'echarts/components';
import { MapChart, ScatterChart } from 'echarts/charts';
import { GeoMapChartsProps } from '../../core/types';
import { ChinaJson } from '../../core/geo/china';

echarts.use([VisualMapComponent, GeoComponent, MapChart, ScatterChart]);

echarts.registerMap('china', ChinaJson);

class Geo extends Component<GeoMapChartsProps> {
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

export { Geo };

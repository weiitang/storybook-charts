import { Component } from 'react';

import { Chart } from '../charts';
import { Model } from '../../core/charts/wordCloud';
import * as echarts from 'echarts/core';
import 'echarts-wordcloud';
import type { WordCloudChartsProps } from '../../core/types';

class WordCloud extends Component<WordCloudChartsProps> {
  private model: any;

  constructor(props: WordCloudChartsProps) {
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

export { WordCloud };

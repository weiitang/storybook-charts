import { CSSProperties } from 'react';

import * as echarts from 'echarts/core';
import type {
  LineSeriesOption,
  BarSeriesOption,
  PieSeriesOption,
  MapSeriesOption,
  CandlestickSeriesOption,
  ScatterSeriesOption,
  TreemapSeriesOption,
  GraphSeriesOption,
  FunnelSeriesOption,
  HeatmapSeriesOption,
} from 'echarts/charts';

// import type { WordCloudSeriesOption } from 'echarts/types/dist/echarts';

import type {
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
  AxisPointerComponentOption,
  LegendComponentOption,
  DataZoomComponentOption,
  GeoComponentOption,
  VisualMapComponentOption,
} from 'echarts/components';

import type { EChartsOption } from 'echarts';

export type EChartsInstance = echarts.ECharts;

export type Opts = {
  readonly devicePixelRatio?: number;
  readonly renderer?: 'canvas' | 'svg';
  readonly width?: number | null | undefined | 'auto';
  readonly height?: number | null | undefined | 'auto';
  readonly locale?: string;
};

export type MAChartsProps = {
  /**
   * 图表容器的`className`
   */
  readonly className?: string;
  /**
   * 图表容器的`style`
   */
  readonly style?: CSSProperties;
  /**
   * echarts 主体配置，接受:
   * 1. theme 名称字符串
   * 2. theme 对象
   */
  readonly theme?: string | Record<string, any>;
  /**
   * 是否合并新的参数和数据，然后刷新图表；默认合并以实现过渡时数据变化
   * @default false
   */
  readonly notMerge?: boolean;
  /**
   * option变化是否不立即更新图表，默认同步立即更新
   * @default false
   */
  readonly lazyUpdate?: boolean;
  /**
   * 控制显示加载动画效果
   */
  readonly showLoading?: boolean;
  /**
   * 自定义的图标加载动画配置
   */
  readonly loadingOption?: EChartsOption;
  /**
   * echarts 图表附加参数
   * @default {}
   */
  readonly opts?: echarts.EChartsInitOpts;
  /**
   * 图表渲染后的callback，返回当前图标的实例
   */
  readonly onChartReady?: (instance: EChartsInstance) => void;
  /**
   * 图表事件绑定
   * @default {}
   */
  readonly onEvents?: Record<string, Function>;
  /**
   * 控制是否更新图表配置
   */
  readonly shouldSetOption?: (
    prevProps: MAChartsProps,
    props: MAChartsProps
  ) => boolean;
  /**
   * window resize 时是否自动resize图表
   * @default true
   */
  readonly autoResize?: boolean;
};

/**
 * Line
 */
export interface LineChartsProps extends MAChartsProps {
  /**
   * 传入的数据，包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | LineSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | AxisPointerComponentOption
    | LegendComponentOption
    | DataZoomComponentOption
  >;
  /**
   * 是否开启 dataZoom 对图表进行缩放操作
   * @default false
   */
  dataZoom?: boolean;
  /**
   * 是否开启折线的内阴影
   * @default false
   */
  shadow?: boolean;
  /**
   * 选择线段形状,
   * 1. line 折线
   * 2. step: 阶梯折线,
   * 3. smooth: 平滑曲线
   */
  shape?: 'line' | 'smooth' | 'step';
}

/**
 * Column
 */
export interface ColumnChartsProps extends MAChartsProps {
  /**
   * 传入的数据，包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | BarSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | AxisPointerComponentOption
    | LegendComponentOption
    | DataZoomComponentOption
  >;
  /**
   * 是否开启 dataZoom 对图表进行缩放操作
   * @default false
   */
  dataZoom?: boolean;
}

/**
 * Bar
 */
export interface BarChartsProps extends MAChartsProps {
  /** 传入的数据，包含Echarts的相应系列的options */
  data: echarts.ComposeOption<
    | BarSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
    | AxisPointerComponentOption
    | LegendComponentOption
  >;
}

/**
 * Pie
 */
export interface PieChartsProps extends MAChartsProps {
  /**
   * 包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | PieSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
  >;
}

/**
 * K
 */
export interface KChartsProps extends MAChartsProps {
  /**
   * 包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | CandlestickSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
  >;
}

/**
 * Scatter
 */
export interface ScatterChartsProps extends MAChartsProps {
  /**
   * 包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | ScatterSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
  >;
}

/**
 * Bubble
 */
export interface BubbleChartsProps extends MAChartsProps {
  /**
   * 包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | ScatterSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
  >;
}

/**
 * GeoMap
 */
export interface GeoMapChartsProps extends MAChartsProps {
  /**
   * 传入的数据，包含Echarts的所有options
   */
  data: echarts.ComposeOption<
    | MapSeriesOption
    | GeoComponentOption
    | VisualMapComponentOption
    | ScatterSeriesOption
  >;
  /**
   * 是否气泡地图（需要汽泡经纬度坐标）
   * @default false
   */
  bubble?: boolean;
}

/**
 * TreeMap
 */
export interface TreeMapChartsProps extends MAChartsProps {
  /**
   * 传入的数据，包含Echarts的所有options
   */
  data: echarts.ComposeOption<TooltipComponentOption | TreemapSeriesOption>;
}

/**
 * Force
 */
export interface ForceChartsProps extends MAChartsProps {
  /**
   * 传入的数据，包含Echarts的所有options
   */
  data: echarts.ComposeOption<TooltipComponentOption | GraphSeriesOption>;
}

/**
 * WordCloud
 */
// export interface WordCloudChartsProps extends MAChartsProps {
//   /**
//    * 传入的数据，包含Echarts的所有options
//    */
//   data: echarts.ComposeOption<TooltipComponentOption | WordCloudSeriesOption>;
// }

/**
 * Funnel
 */

export interface FunnelChartsProps extends MAChartsProps {
  /**
   * 包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | FunnelSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
  >;

  /**
   * 选择线段形状,
   * 1. sharp 尖漏斗
   */
  shape?: 'sharp';
}

/**
 * HeatMap
 */

export interface HeatChartsProps extends MAChartsProps {
  /**
   * 包含Echarts的相应系列的options
   */
  data: echarts.ComposeOption<
    | HeatmapSeriesOption
    | TitleComponentOption
    | TooltipComponentOption
    | GridComponentOption
    | DatasetComponentOption
  >;
}

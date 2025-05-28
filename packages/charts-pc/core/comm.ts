import { G_COLORS, G_SETS } from './config';
import * as echarts from 'echarts/core';
import { isEmpty } from 'lodash';

/**
 * 获取文字渲染在canvas上的宽度
 * @param {*} text
 * @param {*} width
 * @param {*} fontSize
 */
const getTextWidth = (text) => {
  const canvas =
    (getTextWidth as any).canvas ||
    ((getTextWidth as any).canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = `${G_SETS.fontAxis}px Microsoft YaHei`;
  const metrics = context.measureText(text);
  return Math.ceil(metrics.width);
};

/**
 * HEX=>RGBA色值转换
 * @param {*} hex
 * @param {*} opacity
 */
const hexToRgba = (hex, opacity) => {
  let rgbaColor = '';
  const reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(
				${parseInt(`0x${hex.slice(1, 3)}`, 16)},
				${parseInt(`0x${hex.slice(3, 5)}`, 16)},
				${parseInt(`0x${hex.slice(5, 7)}`, 16)},
				${opacity}
				)`;
  }
  return rgbaColor;
};

/**
 * 获取通用的折线图阴影配置
 * @param {*} rgba
 */
const getLineShadowOption = (
  color
): {
  color: echarts.graphic.LinearGradient;
  shadowColor: string;
  shadowBlur: number;
} => {
  return {
    color: new echarts.graphic.LinearGradient(
      0,
      0,
      0,
      1,
      [
        {
          offset: 0,
          color: hexToRgba(color, 0.3),
        },
        {
          offset: 1,
          color: hexToRgba(color, 0.1),
        },
      ],
      false
    ),
    shadowColor: hexToRgba(color, 0.1),
    shadowBlur: 10,
  };
};

/**
 * 类[text-overflow: ellipsis]方式显示文字的formatter
 * @param {string} text - 渲染的文字
 * @param {string} width - 最大显示长度
 * @param {number} fontSize - 文字字体大小
 * @return {string} formatter后的文字
 */
const truncateText = (text, width, fontSize) => {
  return echarts.format.truncateText(
    text,
    width,
    `${fontSize}px sans-serif`,
    '…'
  );
};

/**
 * 横轴label自动旋转
 * @param {*} node
 * @param {*} option
 */
const autoRotateLabel = (dom, option) => {
  if (!option.xAxis || !dom) return;
  if (!option.xAxis.data || option.xAxis.data.length === 0) return;

  // 用户传入 label formatter 时不处理
  if (option.xAxis.axisLabel && option.xAxis.axisLabel.formatter) return;

  const currentOption = option;
  const xDataLength = currentOption.xAxis.data.length;

  if (xDataLength === 0) return;

  const maxLengthLabel = currentOption.xAxis.data.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  });

  let seriesData = [];
  let maxLengthData = 0;
  currentOption.series.forEach((sery) => {
    seriesData = seriesData.concat(sery.data);
  });
  if (seriesData.length !== 0) {
    maxLengthData = seriesData.reduce(function (a, b) {
      return String(a).length > String(b).length ? a : b;
    });
  }

  const yDataWidth = getTextWidth(maxLengthData) + 10;

  // 全部为最长字符时需要的轴长度
  const maxLabelNeedWidth = getTextWidth(maxLengthLabel) * xDataLength;
  // 当前轴长
  const xAxisLineWidth = dom.width - yDataWidth;
  if (xAxisLineWidth < maxLabelNeedWidth) {
    return {
      xAxis: {
        axisLabel: {
          rotate: G_SETS.xAxisLabelRotate,
        },
      },
    };
  } else {
    return;
  }
};

/**
 * 公共配置&&方法
 * @property g_sets - 全局设置
 * @property g_colors - 全局颜色设置
 * @method get_title - 获取title配置
 * @method get_legend - 获取legend基础配置
 * @method get_tooltips - 获取tooltips基础配置
 * @method get_xAxis - 获取X轴基础配置
 * @method get_yAxis - 获取Y轴基础配置
 */
class CommConfig {
  g_sets: typeof G_SETS;
  g_colors: typeof G_COLORS;
  constructor() {
    this.g_sets = G_SETS;
    this.g_colors = G_COLORS;
  }

  get_color() {
    return this.g_colors;
  }

  get_grid() {
    return {
      left: 0,
      right: 0,
      top: 20,
      bottom: 50,
      containLabel: true,
    };
  }
  /**
   * @param {object} title - title设置
   * @return {object}
   */
  get_title() {
    const { g_sets, g_colors } = this;
    return {
      top: g_sets.titleMargin[0],
      left: 0,
      padding: 0,
      itemGap: 0,
      textStyle: {
        color: g_colors.normal,
        fontSize: g_sets.fontTitle,
        fontWeight: 500,
      },
    };
  }

  /**
   * @param {object} legend - legend设置
   * @return {object}
   */
  get_legend() {
    const { g_sets, g_colors } = this;
    const comm = {
      show: true,
      type: 'scroll',
      icon: 'circle',
      itemWidth: g_sets.legendDotWidth,
      itemHeight: g_sets.legendDotWidth,
      borderWidth: 0,
      textStyle: {
        color: g_colors.light,
        fontSize: g_sets.fontLegend,
        padding: [1, 0, 0, 0], // 用以解决Windows系统上legend出现滚动时，顶部的1像素偏差问题
      },
      itemGap: g_sets.legendItemGap[0],
      bottom: g_sets.boxPadding[0],
      left: 'center',
      padding: [0, g_sets.boxPadding[1]],
      formatter: function (name) {
        return truncateText(
          name,
          g_sets.fontLegend * (g_sets.legendLabelMaxNum + 1),
          g_sets.fontLegend
        );
      },
    };
    return { ...comm };
  }

  /**
   * @return {object}
   */
  get_tooltips() {
    const { g_sets, g_colors } = this;
    return {
      padding: 10,
      backgroundColor: g_colors.toolTipBackground,
      textStyle: {
        color: g_colors.toolTipColor,
        fontSize: g_sets.fontTooltip,
      },
      extraCssText: 'box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2)',
    };
  }

  /**
   * @param {object} xAxis - xAxis设置
   * @return {object}
   */
  get_xAxis() {
    const { g_sets, g_colors } = this;
    const _formatter = null;

    const axis = {
      type: 'category',
      boundaryGap: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: g_colors.axis,
        },
      },
      axisTick: {
        show: true,
        length: 6,
        alignWithLabel: true,
      },
      axisLabel: {
        formatter: _formatter,
        margin: g_sets.xAxisLabelGap,
        color: g_colors.normal,
        fontSize: g_sets.fontAxis,
        interval: 0,
      },
    };
    return axis;
  }

  /**
   * @param {object} yAxis - yAxis设置
   * @return {object}
   */
  get_yAxis() {
    const { g_sets, g_colors } = this;
    const _formatter = null;

    const axis = {
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: g_colors.grid,
        },
      },
      axisLabel: {
        show: true,
        formatter: _formatter,
        color: g_colors.normal,
        fontSize: g_sets.fontAxis,
      },
    };
    return axis;
  }
  /**
   * @param {object} dataZoom - dataZoom设置
   * @return {array}
   */
  get_dataZoom() {
    // const { g_sets, g_colors } = this
    const dataZoom = [
      {
        type: 'inside',
        show: false,
        start: 0,
        end: 20,
      },
      {
        start: 0,
        end: 20,
        // handleIcon: g_sets.zoomIcon,
        // handleSize: '80%',
      },
    ];
    return dataZoom;
  }
}

/**
 * 处理series方法
 * @param options 图表配置项
 * @param defaultTypeOptions 图表类型配置
 * @param addonSeriesOptions 需要增加在seriesItem中的其他配置
 */
const handleSeriesWithType = (
  options,
  defaultTypeOptions,
  addonSeriesOptions = {}
) => {
  if (!isEmpty(options?.series)) {
    const series = options.series.map((sery) => {
      return { ...defaultTypeOptions, ...addonSeriesOptions, ...sery };
    });
    return {
      ...options,
      series: series,
    };
  } else {
    const seriesLength = options?.dataset?.source[0]?.length - 1 || 1;
    const seryArrayAlpha = new Array(seriesLength).fill({
      ...defaultTypeOptions,
      ...addonSeriesOptions,
    });
    return {
      ...options,
      series: seryArrayAlpha,
    };
  }
};

export {
  CommConfig,
  getTextWidth,
  autoRotateLabel,
  getLineShadowOption,
  handleSeriesWithType,
};

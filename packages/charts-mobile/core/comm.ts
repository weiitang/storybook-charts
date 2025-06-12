import { G_COLORS, G_SETS } from './config';
import * as echarts from 'echarts/core';

/**
 * 类[text-overflow: ellipsis]方式显示文字的formatter
 * @param {string} text - 渲染的文字
 * @param {string} width - 最大显示长度
 * @param {number} fontSize - 文字字体大小
 * @return {string} formatter后的文字
 */
// const truncateText = (text, width, fontSize) => {
// 	return echarts.format.truncateText(text, width, `${fontSize}px sans-serif`, '…');
// };

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
      top: 70,
      bottom: 5,
      left: 0,
      right: 0,
      containLabel: true,
    };
  }

  /**
   * @param {object} legend - legend设置
   * @return {object}
   */
  get_legend() {
    const { g_sets, g_colors } = this;
    const comm = {
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
      top: 10,
      left: 0,
      padding: 0,
      // formatter: function (name) {
      // 	return truncateText(name, g_sets.fontLegend * (g_sets.legendLabelMaxNum + 1), g_sets.fontLegend)
      // }
    };
    return { ...comm };
  }

  /**
   * @return {object}
   */
  get_tooltips() {
    const { g_sets, g_colors } = this;
    return {
      confine: true,
      padding: 8,
      borderWidth: 0,
      backgroundColor: g_colors.toolTipBackground,
      textStyle: {
        color: g_colors.toolTipColor,
        fontSize: g_sets.fontTooltip,
      },
      extraCssText: 'border-radius: 0;',
      position: function (point) {
        return [point[0] * 0.7, '10%'];
      },
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
        id: 'dataZoomX',
        type: 'inside',
        xAxisIndex: 0,
        filterMode: 'weakFilter',
        height: 20,
        bottom: 0,
        zoomLock: true,
        minValueSpan: 5,
        maxValueSpan: 5,
        start: 100,
      },
    ];
    return dataZoom;
  }
}

export { getLineShadowOption, CommConfig };

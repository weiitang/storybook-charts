// 全局颜色配置
const G_COLORS = {
  normal: '#4A4A4A', // 正常文字
  light: '#929CA7', // 浅色文字
  red: '#FF3741', // 红色警告文字
  blue: '#459AF0', // 蓝色提示文字
  yellow: '#FFD940', // 黄色提示文字
  grid: '#D8D8D8', // 网格颜色
  axis: '#BFBFBF', // 坐标轴颜色
  toolTipColor: '#333333', // tooltip文字颜色
  toolTipBackground: 'rgba(255,255,255,.9)', // tooltip背景色
  zoomShadowColor: 'rgba(0, 0, 0, 0.6)', // dataZoom 阴影部分颜色
  labelOuterBorder: '#FFFFFF', // 图形外label边框色
  labelInnerFont: '#FFFFFF', // 图形内label文字颜色
  stackLine: '#FFFFFF', // 堆叠图分割线颜色
  lineWithColumn: 'rgba(153,153,153,1)', // 折柱混合图中折线图的颜色
  colorWheelMultiple: [
    '#459AF0',
    '#38C3B0',
    '#86CA5A',
    '#BFD44F',
    '#FCE448',
    '#FCC248',
    '#F58B41',
    '#F7765B',
    '#525ECD',
    '#547FDB',
  ], // 多色彩 - 类目色
  corlorWheelSingle: [
    '#073B6E',
    '#0A4076',
    '#0E4C8B',
    '#0F5499',
    '#1162B3',
    '#0880E1',
    '#329DF3',
    '#69BAFB',
    '#97D1FF',
    '#BFE2FE',
  ], // 单色彩 - 类比色
  colorDouble: ['#459AF0', '#38C3B0'], // 当图表只有两种对比颜色时
};

// 全局参数配置
const G_SETS = {
  // ---------- 全局 ----------
  fontTitle: 16, // 标题大小
  fontAxis: 14, // 坐标轴文字大小
  fontLegend: 14, // 图例文字大小
  fontTooltip: 14, // tooltip文字大小
  fontSeriesLabel: 10, // 图形label大小
  boxPadding: [20, 20], // 画布边距：[上下，左右]
  titleMargin: [1, 15], // 标题上下边距：[上，下]
  xAxisLabelGap: 20, // x轴label和坐标轴间距
  yAxisLabelGap: 12, // y轴label和坐标轴间距
  xAxisNameGap: 14, // x轴name和label的间距
  yAxisNameGap: 20, // y轴name和label的间距
  xAxisLabelRotate: -45, // X轴文字旋转角度
  xAxisLabelRotateMaxNum: 15, // X轴文字旋转后可显示的最大字数
  legendLabelMaxNum: 10, // 图例文字最大中文字数
  legendGapV: 24, // 水平图例的上间距
  legendDotWidth: 10, // 图例圆点直径
  legendItemGap: [10, 10], // 图例item边距：[水平，垂直]
  labelGap: 3, // label的间距
  hoverShadowOffset: [4, 4], // 图形hover时，图形阴影偏移，[x偏移, y偏移]
  hoverShadowOpacity: 0.3, // 图形hover时，图形阴影透明度
  hoverShadowBlur: 10, // 图形hover时，图形阴影的模糊大小

  // ---------- 柱图&条图 ----------
  barWidth: 60, // 柱宽度
  barGroupInnerGap: 2, // 分组内间隔
  barGroupMinGap: 30, // 相邻分组最小间隔
  barMinGap: 20, // 相邻最小间隔
  barRadius: 2, // 柱、条圆角

  // ---------- 折线图 ----------
  lineSymbolSize: 5, // 折线图原点大小
  lineSymbolBorder: 2, // 折线图原点边框

  // ---------- 饼图&环图 ----------
  pieDonutWidth: 16, // 环形图环的宽度

  // --------- 散点&气泡图 -------- //
  scatterSymbolSize: 12, // 散点图点尺寸
  maxScatterSymbolSize: 90, // 气泡最大尺寸
  minScatterSymbolSize: 18, // 气泡最小尺寸

  // -------- 气泡词云 ---------- //
  maxRadius: 80, // 文字气泡最大半径
  minRadius: 14, // 文字气泡最小半径

  // -------- 缩放组件 -------- //
  zoomIcon:
    'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
};

export { G_COLORS, G_SETS };

import React, { PureComponent } from 'react';
import * as echarts from 'echarts/core';
import ResizeObserver from 'resize-observer-polyfill';
import { pick, isFunction, isString, isEqual } from 'lodash';
import type { MAChartsProps } from '../core/types';
import type { EChartOption, EChartsLoadingOption } from 'echarts/lib/echarts';

interface ChartProps extends MAChartsProps {
  /**
   * echarts 配置项
   */
  readonly option: EChartOption;
  readonly resizeObserver?: ResizeObserver;
  readonly echarts?: typeof echarts;
}
/**
 * core component for echarts binding
 */
class Chart extends PureComponent<ChartProps> {
  /**
   * echarts render container
   */
  public ele: HTMLElement;

  /**
   * resizeObserver
   */
  private resizeObserver: ResizeObserver;

  /**
   * echarts library entry
   */
  protected echarts: typeof echarts;

  constructor(props: ChartProps) {
    super(props);

    this.resizeObserver = null as unknown as ResizeObserver;
    this.echarts = props.echarts as typeof echarts;
    this.ele = null as unknown as HTMLElement;
  }

  componentDidMount() {
    this.renderNewEcharts();
  }

  // update
  componentDidUpdate(prevProps: MAChartsProps) {
    /**
     * if shouldSetOption return false, then return, not update echarts options
     * default is true
     */
    const { shouldSetOption } = this.props;
    if (
      isFunction(shouldSetOption) &&
      !shouldSetOption?.(prevProps, this.props)
    ) {
      return;
    }

    // 以下属性修改的时候，需要 dispose 之后再新建
    // 1. 切换 theme 的时候
    // 2. 修改 opts 的时候
    // 3. 修改 onEvents 的时候
    if (
      !isEqual(prevProps.theme, this.props.theme) ||
      !isEqual(prevProps.opts, this.props.opts) ||
      !isEqual(prevProps.onEvents, this.props.onEvents)
    ) {
      this.dispose();

      this.renderNewEcharts(); // 重建
      return;
    }

    // when these props are not isEqual, update echarts
    const pickKeys = [
      'option',
      'notMerge',
      'lazyUpdate',
      'showLoading',
      'loadingOption',
    ];
    if (!isEqual(pick(this.props, pickKeys), pick(prevProps, pickKeys))) {
      this.updateEChartsOption();
    }

    /**
     * when style or class name updated, change size.
     */
    if (
      !isEqual(prevProps.style, this.props.style) ||
      !isEqual(prevProps.className, this.props.className)
    ) {
      this.resize();
    }
  }

  componentWillUnmount() {
    this.dispose();
  }

  /*
   * initialise an echarts instance
   */
  public async initEchartsInstance(): Promise<echarts.ECharts> {
    return new Promise((resolve) => {
      // create temporary echart instance
      this.echarts.init(this.ele, this.props.theme, this.props.opts);
      const echartsInstance = this.getEchartsInstance();

      echartsInstance?.on('finished', () => {
        // get final width and height
        const width = this.ele?.clientWidth;
        const height = this.ele?.clientHeight;

        // dispose temporary echart instance
        this.echarts.dispose(this.ele);

        // recreate echart instance
        // we use final width and height only if not originally provided as opts
        const opts = {
          width,
          height,
          ...this.props.opts,
        };
        resolve(this.echarts.init(this.ele, this.props.theme, opts));
      });
    });
  }

  /**
   * return the existing echart object
   */
  public getEchartsInstance(): echarts.ECharts | undefined {
    return this.echarts.getInstanceByDom(this.ele);
  }

  /**
   * dispose echarts and clear size-sensor
   */
  private dispose() {
    if (this.ele) {
      try {
        this.resizeObserver?.disconnect();
      } catch (e) {
        console.warn(e);
      }
      // dispose echarts instance
      this.echarts.dispose(this.ele);
    }
  }

  /**
   * render a new echarts instance
   */
  private async renderNewEcharts() {
    const { onEvents, onChartReady, autoResize = true } = this.props;

    // 1. init echarts instance
    await this.initEchartsInstance();

    // 2. update echarts instance
    const echartsInstance = this.updateEChartsOption();

    // 3. bind events
    this.bindEvents(echartsInstance, onEvents || {});

    // 4. on chart ready
    if (isFunction(onChartReady)) onChartReady?.(echartsInstance!);

    // 5. on resize
    if (this.ele && autoResize) {
      // const parentNode = this.ele.parentNode;
      this.resizeObserver = new ResizeObserver(() => {
        // for (const entry of entries) {
        //     const { width, height } = entry.contentRect;
        //     console.log(width, height);
        // }

        this.resize();
      });
      if (!this.resizeObserver) {
        return;
      } else {
        this.resizeObserver.observe?.(this.ele);
      }
    }
  }

  // bind the events
  private bindEvents(instance, events: MAChartsProps['onEvents']) {
    function _bindEvent(eventName: string, func: Function) {
      // ignore the event config which not satisfy
      if (isString(eventName) && isFunction(func)) {
        // binding event
        instance.on(eventName, (param) => {
          func(param, instance);
        });
      }
    }

    // loop and bind
    for (const eventName in events) {
      if (Object.prototype.hasOwnProperty.call(events, eventName)) {
        _bindEvent(eventName, events[eventName]);
      }
    }
  }

  private defaultLoadingOption: EChartsLoadingOption = {
    text: '',
    color: '#307AF2',
  };

  /**
   * render the echarts
   */
  private updateEChartsOption(): echarts.ECharts | undefined {
    const {
      option,
      notMerge = false,
      lazyUpdate = false,
      showLoading,
      loadingOption = this.defaultLoadingOption,
    } = this.props;
    // 1. get or initial the echarts object
    const echartInstance = this.getEchartsInstance();
    // 2. set the echarts option
    echartInstance?.setOption(option, notMerge, lazyUpdate);
    // 3. set loading mask
    if (showLoading) echartInstance?.showLoading('default', loadingOption);
    else echartInstance?.hideLoading();

    return echartInstance;
  }

  /**
   * resize wrapper
   */
  private resize() {
    // 1. get the echarts instance
    const echartsInstance = this.getEchartsInstance();

    // 2. resize echarts instance
    try {
      echartsInstance?.resize({
        width: 'auto',
        height: 'auto',
      });
    } catch (e) {
      console.warn(e);
    }
  }

  render(): React.JSX.Element {
    const { style, className = '' } = this.props;
    const newStyle = { height: '100%', width: '100%', ...style };

    return (
      <div
        ref={(e: HTMLDivElement) => {
          this.ele = e;
        }}
        style={newStyle}
        className={className}
      />
    );
  }
}

export { Chart };

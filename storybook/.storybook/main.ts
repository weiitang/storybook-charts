import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  // 需要将默认配置结构...c，不然只配置了resolve会导致cors(因为vite默认允许跨域)
  async viteFinal(c) {
    return {
      ...c,
      resolve: {
        alias: {
          '@charts': path.resolve(__dirname, '../../packages/charts-pc/react'),
        },
      },
    };
  },
};
export default config;

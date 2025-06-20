import { addons } from '@storybook/manager-api';
import theme from './theme';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: false,
  panelPosition: 'bottom',
  sidebarAnimations: true,
  enableShortcuts: true,
  isToolshown: true,
  theme: theme,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
  },
  // layoutCustomisations: {
  //   showToolbar() {
  //     return false;
  //   },
  //   showSidebar() {
  //     return false;
  //   },
  // },
  toolbar: {},
});

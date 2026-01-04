declare module 'react-virtualized-auto-sizer' {
    import { PureComponent, ReactNode } from 'react';
    
    export interface AutoSizerProps {
      children: (props: { height: number; width: number }) => ReactNode;
      defaultHeight?: number;
      defaultWidth?: number;
      disableHeight?: boolean;
      disableWidth?: boolean;
      onResize?: (info: { height: number; width: number }) => void;
      style?: React.CSSProperties;
    }
  
    export default class AutoSizer extends PureComponent<AutoSizerProps> {}
  }
  
  declare module 'react-window';
// theme.d.ts or any other .d.ts file in your project
import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    yellowChip: Palette['primary'];
  }

  interface PaletteOptions {
    yellowChip?: PaletteOptions['primary'];
  }

  interface PaletteColor {
    main: string;
    light?: string;
  }
}
declare module '*.less' {
    const resource: {[key: string]: string};
    export = resource;
}
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
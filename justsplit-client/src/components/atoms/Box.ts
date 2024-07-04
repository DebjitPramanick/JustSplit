import styled from "styled-components";

import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  background,
  border,
  color,
  flexbox,
  layout,
  position,
  space,
  grid,
  BackgroundProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
  GridProps,
} from "styled-system";

export interface BoxProps
  extends BackgroundProps,
    BorderProps,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    GridProps {
  children: React.ReactNode;
}

const Box = styled.div.withConfig({
  shouldForwardProp,
})<BoxProps>`
  ${layout}
  ${flexbox}
    ${position}
    ${space}
    ${color}
    ${background}
    ${border}
    ${grid}
`;

export default Box;

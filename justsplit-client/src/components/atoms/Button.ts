import styled from "styled-components";

import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  background,
  border,
  color,
  flexbox,
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

export interface ButtonProps
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

const Button = styled.button.withConfig({
  shouldForwardProp,
})<ButtonProps>`
  height: 32px;
  padding: 0 16px;
  font-size: 16px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid grey;
  cursor: pointer;
  ${flexbox};
  ${position};
  ${space};
  ${color};
  ${background};
  ${border};
  ${grid}
`;

export default Button;

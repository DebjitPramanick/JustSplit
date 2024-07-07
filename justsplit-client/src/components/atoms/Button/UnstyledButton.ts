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

export interface UnstyledButtonProps
  extends BackgroundProps,
    BorderProps,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    PositionProps,
    SpaceProps,
    GridProps {
  children?: React.ReactNode;
}

const UnstyledButton = styled.button.withConfig({
  shouldForwardProp,
})<UnstyledButtonProps>`
  display: block;
  cursor: pointer;
  ${flexbox};
  ${position};
  ${space};
  ${color};
  ${background};
  ${border};
  ${grid}
`;

export default UnstyledButton;

import styled from "styled-components";

import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  background,
  border,
  color,
  position,
  space,
  BackgroundProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from "styled-system";

export interface InputProps
  extends BackgroundProps,
    BorderProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    SpaceProps {}

const Input = styled.input.withConfig({
  shouldForwardProp,
})<InputProps>`
  height: 32px;
  padding: 0 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid grey;
  ${position};
  ${space};
  ${color};
  ${background};
  ${border};
`;

export default Input;

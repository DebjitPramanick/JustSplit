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
import colors from "~/styles/colors";

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
  display: block;
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid ${colors.BORDER_NEUTRAL_WEAK};
  ${position};
  ${space};
  ${color};
  ${background};
  ${border};
`;

export default Input;

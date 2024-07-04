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

export interface FlexProps
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

const Flex = styled.div.withConfig({
  shouldForwardProp,
})<FlexProps>`
  display: flex;
  ${layout};
  ${flexbox};
  ${position};
  ${space};
  ${color};
  ${background};
  ${border};
  ${grid};
`;

export default Flex;

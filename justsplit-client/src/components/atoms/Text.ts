import styled from "styled-components";

import shouldForwardProp from "@styled-system/should-forward-prop";
import {
  color,
  position,
  space,
  compose,
  typography,
  PositionProps,
  ColorProps,
  SpaceProps,
  TypographyProps,
} from "styled-system";

export interface TextProps
  extends PositionProps,
    ColorProps,
    SpaceProps,
    TypographyProps {
  children: React.ReactNode;
}

const Text = styled.p.withConfig({
  shouldForwardProp,
})<TextProps>(compose(position, space, color, typography));

export default Text;

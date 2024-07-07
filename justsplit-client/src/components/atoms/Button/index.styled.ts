import styled from "styled-components";
import UnstyledButton from "./UnstyledButton";
import colors from "~/styles/colors";

export const Root = styled(UnstyledButton)<{
  fontSize: number;
}>`
  height: ${({ height }) => `${height}px`};
  width: auto;
  padding: 0 24px;
  text-align: center;
  font-size: ${({ fontSize }) => `${fontSize}px`};
  color: ${colors.TEXT_INVERTED};
  background-color: ${colors.BG_ACCENT_NORMAL};
  border-radius: 4px;
  border: 1px solid ${colors.BORDER_ACCENT_STRONG};

  &:hover {
    background-color: ${colors.BG_ACCENT_WEAK};
  }
`;

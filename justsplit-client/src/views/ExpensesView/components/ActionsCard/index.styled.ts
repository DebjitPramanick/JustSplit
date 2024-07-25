import styled from "styled-components";
import { Box } from "~/components/atoms";
import colors from "~/styles/colors";

export const Root = styled(Box)`
  max-width: 368px;
  background-color: ${colors.BG_SURFACE};
  padding: 24px;
  border-radius: 8px;
`;

import styled from "styled-components";
import { Box } from "../atoms";
import { mediaQueryMobileOrTablet } from "~/styles/mixins";

export const PageContainer = styled(Box)`
  max-width: 1248px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;

  ${mediaQueryMobileOrTablet} {
    padding: 0 20px;
  }
`;

export default PageContainer;

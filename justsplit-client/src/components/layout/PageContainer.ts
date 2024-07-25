import styled from "styled-components";
import { Box } from "../atoms";
import { mediaQueryMobileOrTablet } from "~/styles/mixins";

export const PageContainer = styled(Box)`
  max-width: 1248px;
  margin: 0 auto;
  padding-bottom: 104px;
  padding-left: 24px;
  padding-right: 24px;

  ${mediaQueryMobileOrTablet} {
    padding-bottom: 88px;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export default PageContainer;

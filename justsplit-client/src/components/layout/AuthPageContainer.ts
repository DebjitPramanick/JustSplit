import styled from "styled-components";
import { mediaQueryMobileOrTablet } from "~/styles/mixins";
import { Flex } from "../atoms";

const AuthPageContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
  ${mediaQueryMobileOrTablet} {
    flex-direction: column;
  }
`;

export default AuthPageContainer;

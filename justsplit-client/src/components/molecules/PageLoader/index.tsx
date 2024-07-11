import { PuffLoader } from "react-spinners";
import styled from "styled-components";
import { Flex } from "~/components/atoms";
import colors from "~/styles/colors";

const PageLoader = () => {
  return (
    <Root>
      <PuffLoader color={colors.BG_ACCENT_NORMAL} />
    </Root>
  );
};

export default PageLoader;

const Root = styled(Flex)`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  align-items: center;
  justify-content: center;
`;

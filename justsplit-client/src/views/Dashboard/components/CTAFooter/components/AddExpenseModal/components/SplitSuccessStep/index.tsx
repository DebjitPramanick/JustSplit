import styled from "styled-components";
import { Box, Text } from "~/components/atoms";
import colors from "~/styles/colors";

const SplitSuccessStep = () => {
  return (
    <Box>
      <SuccessMessage>Successfully split the amount.</SuccessMessage>
    </Box>
  );
};

export default SplitSuccessStep;

const SuccessMessage = styled(Text)`
  font-size: 16px;
  text-align: center;
  color: ${colors.TEXT_POSITIVE_NORMAL};
`;

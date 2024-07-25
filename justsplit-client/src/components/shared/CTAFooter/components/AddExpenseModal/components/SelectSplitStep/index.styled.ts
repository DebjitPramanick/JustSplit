import styled from "styled-components";
import { Flex } from "~/components/atoms";

export const ParticipantsContainer = styled(Flex)`
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 12px;
  }
`;

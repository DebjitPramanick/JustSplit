import styled from "styled-components";
import { Box, Text } from "~/components/atoms";
import { PageContainer } from "~/components/layout";
import colors from "~/styles/colors";
import { mediaQueryMobile } from "~/styles/mixins";

export const Root = styled(Box)`
  position: relative;
`;

export const Container = styled(PageContainer)`
  padding-top: 32px;
  position: relative;
  z-index: 1;
`;

export const PageTitleBackground = styled(Box)`
  background-image: linear-gradient(180deg, #0a66c2 0%, #0c7beb 100%);
  height: 160px;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;

  ${mediaQueryMobile} {
    height: 198px;
  }
`;

export const PageTitle = styled(Text)`
  font-size: 32px;
  color: ${colors.TEXT_INVERTED};
  font-weight: 600;

  ${mediaQueryMobile} {
    font-size: 20px;
  }
`;

export const PageDescription = styled(Text)`
  font-size: 18px;
  color: ${colors.TEXT_INVERTED};

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

export const CardsContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  row-gap: 24px;
  column-gap: 16px;
`;

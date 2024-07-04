import { css } from "styled-components";

export const ellipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const hideScrollbar = css`
  ::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
`;

export const ellipsisStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export const userSelectNoneCss = css`
  -webkit-user-select: none;
  user-select: none;
`;

export const mediaQueryMobile = () => "@media (max-width: 767px)";
export const mediaQueryTablet = () => "@media (max-width: 1024px)";
export const mediaQueryMobileOrTablet = () => "@media (max-width: 1024px)";
export const mediaQueryTabletOrDesktop = () => "@media (min-width: 768px)";

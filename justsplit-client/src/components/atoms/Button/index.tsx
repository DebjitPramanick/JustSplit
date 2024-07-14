import React, { ForwardedRef, forwardRef } from "react";
import { Root } from "./index.styled";
import { ClipLoader } from "react-spinners";
import { UnstyledButtonProps } from "./UnstyledButton";
import Box from "../Box";

type ISize = "small" | "medium" | "large";

interface IButtonProps extends UnstyledButtonProps {
  size?: ISize;
  loading?: boolean;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  outlined?: boolean;
}

const SIZES: { SMALL: ISize; MEDIUM: ISize; LARGE: ISize } = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

const getButtonHeight = (size: ISize) => {
  if (size == SIZES.LARGE) {
    return 48;
  } else if (size === SIZES.MEDIUM) {
    return 40;
  } else {
    return 32;
  }
};

const getBtnHorizontalPadding = (size: ISize) => {
  if (size == SIZES.LARGE) {
    return 20;
  } else if (size === SIZES.MEDIUM) {
    return 18;
  } else {
    return 14;
  }
};

const getFontSize = (size: ISize) => {
  if (size == SIZES.LARGE) {
    return 20;
  } else if (size === SIZES.MEDIUM) {
    return 16;
  } else {
    return 14;
  }
};

const getLoaderSize = (size: ISize) => {
  if (size == SIZES.LARGE) {
    return 26;
  } else if (size === SIZES.MEDIUM) {
    return 20;
  } else {
    return 14;
  }
};

const Button = forwardRef(
  (
    props: IButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const { size = SIZES.MEDIUM, loading, text, ...rest } = props;
    const height = getButtonHeight(size);
    const horizontalPadding = getBtnHorizontalPadding(size);
    const fontSize = getFontSize(size);
    const loaderSize = getLoaderSize(size);
    const borderRadius = height / 2;

    let loadingNode;

    if (loading) {
      loadingNode = (
        <Box display="inline" mr="12px">
          <ClipLoader size={loaderSize} color="white" />
        </Box>
      );
    }

    return (
      <Root
        height={height}
        fontSize={fontSize}
        px={`${horizontalPadding}px`}
        borderRadius={`${borderRadius}px`}
        {...rest}
        ref={ref}
      >
        {loadingNode}
        {text}
      </Root>
    );
  }
);

export default Button;

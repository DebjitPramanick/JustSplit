import React, { ForwardedRef, forwardRef } from "react";
import { Root } from "./index.styled";
import Box from "../Box";
import { ClipLoader } from "react-spinners";
import { UnstyledButtonProps } from "./UnstyledButton";

type ISize = "small" | "medium" | "large";

interface IButtonProps extends UnstyledButtonProps {
  size?: ISize;
  loading?: boolean;
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const SIZES: { SMALL: ISize; MEDIUM: ISize; LARGE: ISize } = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
};

const getButtonHeight = (size: ISize) => {
  if (size == SIZES.LARGE) {
    return 56;
  } else if (size === SIZES.MEDIUM) {
    return 48;
  } else {
    return 32;
  }
};

const getFontSize = (size: ISize) => {
  if (size == SIZES.LARGE) {
    return 24;
  } else if (size === SIZES.MEDIUM) {
    return 16;
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
    const fontSize = getFontSize(size);

    let loadingNode;

    if (loading) {
      loadingNode = (
        <Box display="inline" mr="12px">
          <ClipLoader size={16} />
        </Box>
      );
    }

    return (
      <Root height={height} fontSize={fontSize} {...rest} ref={ref}>
        {loadingNode}
        {text}
      </Root>
    );
  }
);

export default Button;

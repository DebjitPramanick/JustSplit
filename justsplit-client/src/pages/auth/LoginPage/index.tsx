import { AuthPageContainer } from "~/components/layout";
import { Box, Button, Flex, Input } from "~/components/atoms";
import {
  AuthForm,
  AuthFormContainer,
  ErrorText,
  FormTitle,
  HeaderBranding,
  InputLabel,
  LeftSection,
  RightSection,
  RightSideText,
  RightSideVector,
  TextLink,
} from "../index.styled";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";

import colors from "~/styles/colors";
import { useNavigate } from "react-router-dom";
import useApp from "~/hooks/useApp";
import { userApi } from "~/api";
import { useRequestStates } from "~/hooks";

type FieldType = "email" | "password";

const RIGHT_SIDE_CONTENT_NODES = [
  <RightSideText key="right-side-content-1">
    Split Wisely,
    <br />
    Stay Friendly
  </RightSideText>,
  <RightSideText key="right-side-content-2">
    Fair Shares,
    <br />
    Happy Hearts
  </RightSideText>,
  <RightSideText key="right-side-content-3">
    Together Again,
    <br />
    Bill-Free
  </RightSideText>,
];

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const [pageState, setPageState] = useImmer({
    email: "",
    password: "",
    currentRightSideNodeIdx: 0,
    errorMsg: "",
  });
  const [logInUserRequestState, logInUserRequestHandlers] = useRequestStates();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field: FieldType = e.target.name as FieldType;
    const value = e.target.value;
    setPageState((draft) => {
      draft[field] = value;
    });
  };

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email: pageState.email,
      password: pageState.password,
    };

    logInUserRequestHandlers.pending();
    try {
      const response = await userApi.loginUser({
        payload,
      });
      logInUserRequestHandlers.fulfilled(response);
      navigate("/");
    } catch (error) {
      logInUserRequestHandlers.rejected(error);
      setPageState((draft) => {
        draft.errorMsg = (error as Error).message;
      });
    }
  };

  let errorMsgNode;

  if (pageState.errorMsg) {
    errorMsgNode = <ErrorText>ERROR: {pageState.errorMsg}</ErrorText>;
  }

  useEffect(() => {
    // Function to update the current index
    const updateIndex = () => {
      setPageState((draft) => {
        draft.currentRightSideNodeIdx =
          (draft.currentRightSideNodeIdx + 1) % RIGHT_SIDE_CONTENT_NODES.length;
      });
    };

    // Set up the interval
    const intervalId = setInterval(updateIndex, 3000); // 10000 milliseconds = 10 seconds

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <AuthPageContainer>
      <LeftSection>
        <HeaderBranding>
          Just<span style={{ color: colors.TEXT_ACCENT_NORMAL }}>Split</span>
        </HeaderBranding>
        <AuthFormContainer>
          <FormTitle>Log In</FormTitle>
          <AuthForm mt="32px" onSubmit={handleFormSubmit}>
            <Box mt="24px">
              <InputLabel>Email</InputLabel>
              <Input
                name="email"
                placeholder="Enter Email"
                mt="8px"
                type="email"
                onChange={handleInputChange}
                value={pageState.email}
                required
              />
            </Box>
            <Box mt="24px">
              <InputLabel>Password</InputLabel>
              <Input
                name="password"
                placeholder="Enter Password"
                type="password"
                mt="8px"
                onChange={handleInputChange}
                value={pageState.password}
                required
              />
            </Box>
            {errorMsgNode ? <Box mt="12px">{errorMsgNode}</Box> : null}
            <Flex justifyContent="space-between" alignItems="center" mt="32px">
              <TextLink to="/signup">Not an user? Sign Up</TextLink>
              <Button
                text="Log In"
                type="submit"
                ml="16px"
                loading={logInUserRequestState.pending}
                disabled={logInUserRequestState.pending}
              />
            </Flex>
          </AuthForm>
        </AuthFormContainer>
      </LeftSection>
      <RightSection>
        <RightSideVector />
        <Box mb="90px">
          {RIGHT_SIDE_CONTENT_NODES[pageState.currentRightSideNodeIdx]}
        </Box>
      </RightSection>
    </AuthPageContainer>
  );
};

export default LoginPage;

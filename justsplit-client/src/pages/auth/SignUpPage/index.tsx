import { AuthPageContainer } from "~/components/layout";
import { Box, Button, Flex, Input } from "~/components/atoms";
import {
  AuthForm,
  AuthFormContainer,
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
import useUserApi from "~/api/user";
import colors from "~/styles/colors";
import { useNavigate } from "react-router-dom";

type FieldType = "name" | "email" | "password" | "confirmedPassword";

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

const SignUpPage = () => {
  const { signupUser } = useUserApi();
  const navigate = useNavigate();
  const [pageState, setPageState] = useImmer({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    currentRightSideNodeIdx: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const field: FieldType = e.target.name as FieldType;
    const value = e.target.value;
    setPageState((draft) => {
      draft[field] = value;
    });
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name: pageState.name,
      email: pageState.email,
      password: pageState.password,
    };
    signupUser.mutate(
      {
        payload,
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

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

  return (
    <AuthPageContainer>
      <LeftSection>
        <HeaderBranding>
          Just<span style={{ color: colors.TEXT_ACCENT_NORMAL }}>Split</span>
        </HeaderBranding>
        <AuthFormContainer>
          <FormTitle>Sign Up</FormTitle>
          <AuthForm mt="32px" onSubmit={handleFormSubmit}>
            <Box>
              <InputLabel>Name</InputLabel>
              <Input
                name="name"
                placeholder="Enter Name"
                mt="8px"
                onChange={handleInputChange}
                value={pageState.name}
              />
            </Box>
            <Box mt="24px">
              <InputLabel>Email</InputLabel>
              <Input
                name="email"
                placeholder="Enter Email"
                mt="8px"
                type="email"
                onChange={handleInputChange}
                value={pageState.email}
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
              />
            </Box>
            <Box mt="24px">
              <InputLabel>Confirm Password</InputLabel>
              <Input
                name="confirmedPassword"
                placeholder="Confirm Password"
                mt="8px"
                onChange={handleInputChange}
                value={pageState.confirmedPassword}
              />
            </Box>
            <Flex justifyContent="space-between" alignItems="center" mt="32px">
              <TextLink to="/login">Already an user? Log In</TextLink>
              <Button
                text="Signup"
                type="submit"
                ml="16px"
                onClick={() => {}}
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

export default SignUpPage;

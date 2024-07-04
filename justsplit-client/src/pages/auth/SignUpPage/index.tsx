import { AuthPageContainer } from "~/components/layout";
import { Box, Button, Flex, Input } from "~/components/atoms";
import {
  AuthForm,
  AuthFormContainer,
  FormTitle,
  InputLabel,
  LeftSection,
  RightSection,
  TextLink,
} from "../index.styled";
import React from "react";
import { useImmer } from "use-immer";
import useUserApi from "~/api/userApi";

type FieldType = "name" | "email" | "password";

const SignUpPage = () => {
  const { signupUser } = useUserApi();
  const [pageState, setPageState] = useImmer({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
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
  };

  return (
    <AuthPageContainer>
      <LeftSection>
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
              <TextLink href="/login">Already an user? Log In</TextLink>
              <Button type="submit" ml="16px">
                Signup
              </Button>
            </Flex>
          </AuthForm>
        </AuthFormContainer>
      </LeftSection>
      <RightSection></RightSection>
    </AuthPageContainer>
  );
};

export default SignUpPage;

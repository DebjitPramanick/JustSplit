import colors from "~/styles/colors";
import * as Styles from "./index.styled";
import { Button } from "~/components/atoms";
import { userApi } from "~/api";
import { useRequestStates } from "~/hooks";

const Header = () => {
  const [logoutUserRequestState, logoutUserRequestHandlers] =
    useRequestStates();

  const handleLogoutBtnClick = async () => {
    logoutUserRequestHandlers.pending();
    try {
      const response = await userApi.logoutUser({});
      logoutUserRequestHandlers.fulfilled(response);
    } catch (error) {
      logoutUserRequestHandlers.rejected(error);
    }
  };

  return (
    <Styles.Root>
      <Styles.HeaderRoot>
        <Styles.Container>
          <Styles.HeaderBranding>
            Just<span style={{ color: colors.TEXT_ACCENT_NORMAL }}>Split</span>
          </Styles.HeaderBranding>
          <Button
            text="Log Out"
            size="medium"
            outlined
            onClick={handleLogoutBtnClick}
            loading={logoutUserRequestState.pending}
            disabled={logoutUserRequestState.pending}
          />
        </Styles.Container>
      </Styles.HeaderRoot>
    </Styles.Root>
  );
};

export default Header;

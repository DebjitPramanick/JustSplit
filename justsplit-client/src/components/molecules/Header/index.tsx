import colors from "~/styles/colors";
import * as Styles from "./index.styled";
import { Button } from "~/components/atoms";
import { useUserApi } from "~/api";

const Header = () => {
  const { logoutUserMutation } = useUserApi();

  const handleLogoutBtnClick = () => {
    logoutUserMutation.mutate(
      {},
      {
        onSuccess: (data) => {
          console.log(data);
          window.location.href = "/login";
        },
      }
    );
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
            loading={logoutUserMutation.isLoading}
            disabled={logoutUserMutation.isLoading}
          />
        </Styles.Container>
      </Styles.HeaderRoot>
    </Styles.Root>
  );
};

export default Header;

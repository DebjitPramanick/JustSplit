import colors from "~/styles/colors";
import * as Styles from "./index.styled";
import { Button } from "~/components/atoms";
import useUserApi from "~/api/user";

const Header = () => {
  const { logoutUser } = useUserApi();

  const handleLogoutBtnClick = () => {
    logoutUser.mutate();
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
          />
        </Styles.Container>
      </Styles.HeaderRoot>
    </Styles.Root>
  );
};

export default Header;

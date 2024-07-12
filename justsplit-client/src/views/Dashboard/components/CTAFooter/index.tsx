import { Button } from "~/components/atoms";
import * as Styles from "./index.styled";

const CTAFooter = () => {
  return (
    <Styles.Root>
      <Styles.Container>
        <Button text="Split Expense" display="block" ml="auto" />
      </Styles.Container>
    </Styles.Root>
  );
};

export default CTAFooter;

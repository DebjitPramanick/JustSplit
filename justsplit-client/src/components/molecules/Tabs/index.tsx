import * as Styles from "./index.styled";

const Tabs = ({ children, ...rest }) => {
  return <Styles.Root {...rest}>{children}</Styles.Root>;
};

export const Tab = ({ children, selected = false, onChange, ...rest }) => {
  const handleChangeTab = (selected) => {
    onChange(selected);
  };
  return (
    <Styles.Tab selected={selected} onClick={handleChangeTab} {...rest}>
      {children}
    </Styles.Tab>
  );
};

Tabs.Tab = Tab;

export default Tabs;

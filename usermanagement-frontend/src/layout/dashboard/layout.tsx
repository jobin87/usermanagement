import Header from "../core/header-section";
import { LayoutSection } from "../core/layout-section";
import { Main } from "./main";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <LayoutSection headerSection={<Header />}>
      <Main>{children}</Main>
    </LayoutSection>
  );
};

export default MainLayout;

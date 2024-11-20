import { Container } from "@/components/custom/Container";
import { Row } from "@/components/custom/Row";
import { Logo } from "@/components/custom/Logo";
import { MainMenu } from "@/components/modules/header/MainMenu";
import { IconGroup } from "@/components/modules/header/IconGroup";

export const Header = () => {
  return (
    <header className="h-[80px]">
      <Container>
        <Row className="justify-between items-center">
          <Logo />
          <MainMenu />
          <IconGroup />
        </Row>
      </Container>
    </header>
  );
};

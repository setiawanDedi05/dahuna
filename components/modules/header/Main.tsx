import { Container } from "@/components/custom/Container";
import { IconGroup } from "@/components/custom/IconGroup";
import { Logo } from "@/components/custom/Logo";
import { MainMenu } from "@/components/custom/MainMenu";
import { MobileButton } from "@/components/custom/MobileButton";
import { Row } from "@/components/custom/Row";
import React from "react";

export const Main = () => {
  return (
    <section className="h-full">
      <Container>
        <Row className="justify-between items-center">
          <MobileButton />
          <Logo />
          <MainMenu />
          <IconGroup />
        </Row>
      </Container>
    </section>
  );
};

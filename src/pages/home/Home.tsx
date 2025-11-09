import React from "react";
import Features from "../../components/features/Features";
import Hero from "../../components/hero/Hero";

type Props = {
  setCurrentPage: (path: string) => void;
}

const HomePage: React.FC<Props> = ({ setCurrentPage }) => {
  return (
    <>
      <Hero setCurrentPage={setCurrentPage} />
      <Features />
    </>
  );
}

export default HomePage;
import { Outlet } from 'react-router-dom';
import { Wrapper } from '../components/wrapper/wrapper';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';

export const Root = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
      <Footer />
    </Wrapper>
  );
};

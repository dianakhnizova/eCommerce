import { Button } from '../../components/button/button';

export const MainPage = () => {
  return (
    <>
      <h1>Main Page</h1>
      <Button onClick={() => console.log('Clicked!')} disabled={false}>
        Click me
      </Button>
    </>
  );
};

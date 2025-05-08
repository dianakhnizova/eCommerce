import { ButtonVariants } from '../../components/button/enums';
import { Button } from '../../components/button/button';

export const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Button
        variant={ButtonVariants.secondary}
        onClick={() => console.log('Clicked!')}
        disabled={false}
      >
        Click me
      </Button>
    </>
  );
};

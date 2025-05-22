import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router';

export const ProductPage = observer(() => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <h2>Товар с ID: {id}</h2>
    </div>
  );
});

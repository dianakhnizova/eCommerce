import { useEffect, useState } from 'react';
import './App.css';
import type { Product } from './api/services/product-service';
import { productService } from './api/services/product-service';

function App() {
  const [data, setData] = useState<Product[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      const productsData = await productService.getProducts();
      console.log(productsData);

      const mappedProducts = productsData.results.map(product => {
        return {
          id: product.id,
          key: product.key,
        };
      });
      setData(mappedProducts);
      setLoading(false);
    };

    fetchProducts().catch(() => {
      setError('Error fetching products');
    });
  }, []);

  return (
    <>
      <h1>eCommerce Application</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          {data.map(element => (
            <div
              key={element.id}
              style={{
                border: '1px solid black',
                margin: '10px',
                padding: '10px',
              }}
            >
              <h3>{element.key}</h3>
              <p>{element.id}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;

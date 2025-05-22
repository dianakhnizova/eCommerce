// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { productsService } from '../../api/services/products-service.ts';
//
// export const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     void productsService.getProducts().then(res => {
//       console.log(res.results);
//       if (res?.results) {
//         setProducts(res.results);
//       }
//       return res;
//     });
//   }, []);
//   return (
//     <div>
//       <h1>Products Page</h1>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             <Link to={`/products/${product.id}`}>
//               {product.masterData.current.name['en']}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

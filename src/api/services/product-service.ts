// import { PROJECT_KEY } from '../../sources/constants/api';
// import { baseApi } from '../axios';
// import { Endpoints } from '../endpoints';
//
// export const productService = {
//   getProductByID: async (
//     customerID: string
//   ): Promise<Required<Customer.Profile>> => {
//     const params = new URLSearchParams({
//       manage_my_profile: PROJECT_KEY,
//       customer_id: customerID,
//     });
//     const response = await baseApi.get<Required<Customer.Profile>>(
//       `${PROJECT_KEY}${Endpoints.ME}`,
//       {
//         params,
//       }
//     );
//     return response.data;
//   },
// };

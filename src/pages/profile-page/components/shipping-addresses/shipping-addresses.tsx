import { observer } from 'mobx-react-lite';
import { messages } from '../../../../sources/messages';
import { userStore } from '../../../../store/user-store';
import { AddressCard } from '../address-card/address-card';

export const ShippingAddresses = observer(() => {
  const addressesId = userStore.user?.shippingAddressIds;
  const defaultId = userStore.user?.defaultShippingAddressId;
  const addresses = userStore.user?.addresses?.filter(
    address => address.id && addressesId?.includes(address.id)
  );

  return (
    <>
      <h2>{messages.shippingAddresses}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {(addresses?.length ?? 0) > 0
          ? userStore.user?.addresses?.map(address => {
              return (
                <AddressCard
                  key={address.id}
                  city={address.city}
                  country={address.country}
                  postalCode={address.postalCode}
                  streetName={address.streetName}
                  isDefault={defaultId === address.id}
                />
              );
            })
          : messages.noAddresses}
      </div>
    </>
  );
});

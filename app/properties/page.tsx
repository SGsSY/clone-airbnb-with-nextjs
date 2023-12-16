import { EmptyState } from '@/app/components/EmptyState';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { getListings } from '@/app/actions/getListings';
import { PropertiesClient } from '@/app/properties/PropertiesClient';

export const PropertiesPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <EmptyState
                title='Unauthorized'
                subTitle='Please login'
            />
        );
    }

    const listings = await getListings({
        userId: currentUser.id,
    });

    if (listings.length === 0) {
        return (
            <EmptyState
                title='No properties found'
                subTitle='Looks like you have no properties'
            />
        );
    }

    return (
        <div>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </div>
    );
};

export default PropertiesPage;

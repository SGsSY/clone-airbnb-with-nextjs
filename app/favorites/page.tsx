import { EmptyState } from '@/app/components/EmptyState';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { getFavoriteListings } from '@/app/actions/getFavoriteListings';
import { FavoritesClient } from '@/app/favorites/FavoritesClient';

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if (listings.length === 0) {
        return (
            <div>
                <EmptyState
                    title='No favorites found'
                    subTitle='Looks like you have no favorites listings'
                />
            </div>
        );
    }

    return (
        <div>
            <FavoritesClient
                listings={listings}
                currentUser={currentUser}
            />
        </div>
    );
};

export default ListingPage;

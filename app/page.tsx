import { Container } from '@/app/components/Container';
import { EmptyState } from '@/app/components/EmptyState';
import { ListingCard } from '@/app/components/listings/ListingCard';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { getListings } from '@/app/actions/getListings';

export default async function Home() {
    const currentUser = await getCurrentUser();
    const listings = await getListings();
    const isEmpty = listings.length === 0;

    if (isEmpty) {
        return (
            <div>
                <EmptyState showReset />
            </div>
        );
    }

    return (
        <div>
            <Container>
                <div
                    className='grid 
                    grid-cols-1 
                    gap-8 
                    pt-24 
                    sm:grid-cols-2 
                    md:grid-cols-3 
                    lg:grid-cols-4 
                    xl:grid-cols-5
                    2xl:grid-cols-6'
                >
                    {listings.map((listing: any) => {
                        return (
                            <ListingCard
                                key={listing.id}
                                currentUser={currentUser}
                                data={listing}
                            />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
}

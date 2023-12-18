import { Container } from '@/app/components/Container';
import { EmptyState } from '@/app/components/EmptyState';
import { ListingCard } from '@/app/components/listings/ListingCard';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import {
    getListings,
    IParams as IListingsParams,
} from '@/app/actions/getListings';
import { Listing } from '@prisma/client';

interface HomeProps {
    searchParams: IListingsParams;
}

export const dynamic = 'force-dynamic';

export default async function Home({ searchParams }: HomeProps) {
    const currentUser = await getCurrentUser();
    const listings = await getListings(searchParams);
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
                    {listings.map((listing: Listing) => {
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

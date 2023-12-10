'use client';

import { Container } from '@/app/components/Container';
import { ListingHead } from '@/app/components/listings/ListingHead';
import { ListingInfo } from '@/app/components/listings/ListingInfo';
import { categories } from '@/app/components/navbar/Categories';
import { Listing, Reservation, User } from '@prisma/client';
import { useMemo } from 'react';

interface ListingClientProps {
    listing: Listing & {
        user: User;
    };
    currentUser?: User | null;
    reservations?: Reservation[];
}

export const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    currentUser,
    reservations,
}) => {
    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category]);
    return (
        <Container>
            <div className='mx-auto max-w-screen-lg'>
                <div className='flex flex-col gap-6'>
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};
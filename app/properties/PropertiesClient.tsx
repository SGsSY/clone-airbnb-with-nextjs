'use client';

import { Listing, User } from '@prisma/client';
import { Container } from '@/app/components/Container';
import { Heading } from '@/app/components/Heading';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '@/app/components/listings/ListingCard';

interface PropertiesClientProps {
    listings: Listing[];
    currentUser?: User | null;
}

export const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string>('');

    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);

            axios
                .delete(`/api/listings/${id}`)
                .then(() => {
                    toast.success('Listings deleted');
                    router.refresh();
                })
                .catch((error) => {
                    toast.error(error?.response?.data?.error);
                })
                .finally(() => {
                    setDeletingId('');
                });
        },
        [router],
    );

    return (
        <Container>
            <Heading
                title='Properties'
                subTitle='List of your properties'
            />
            <div className='sm:grids-cols-2 md:grids-cols-3 mt-10 grid grid-cols-1 gap-8 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel='Delete property'
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

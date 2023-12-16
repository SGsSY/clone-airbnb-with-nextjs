'use client';

import { User } from '@prisma/client';
import { Container } from '@/app/components/Container';
import { Heading } from '@/app/components/Heading';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ListingCard } from '@/app/components/listings/ListingCard';
import { ReservationsEntity } from '@/app/types';

interface TripsClientProps {
    reservations: ReservationsEntity[];
    currentUser?: User | null;
}

export const TripsClient: React.FC<TripsClientProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState<string>('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios
            .delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation cancelled');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            });
    }, []);

    return (
        <Container>
            <Heading
                title='Trips'
                subTitle="Where you've been and where you're going."
            />
            <div className='sm:grids-cols-2 md:grids-cols-3 mt-10 grid grid-cols-1 gap-8 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel='Cancel reservation'
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
};

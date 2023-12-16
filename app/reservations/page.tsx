import { EmptyState } from '@/app/components/EmptyState';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { getReservations } from '@/app/actions/getReservations';
import { ReservationsClient } from '@/app/reservations/ReservationsClient';

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <EmptyState
                title='Unauthorized'
                subTitle='Please login'
            />
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id,
    });

    if (reservations.length === 0) {
        return (
            <EmptyState
                title='No reservations found'
                subTitle='Looks like you have no reservations on your properties'
            />
        );
    }

    return (
        <div>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </div>
    );
};

export default ReservationsPage;

import { Listing, Reservation } from '@prisma/client';

export type ReservationsEntity = Reservation & {
    listing: Listing;
};

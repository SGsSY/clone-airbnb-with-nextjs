import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { User } from '@prisma/client';
import { useLoginModal } from '@/app/hooks/useLoginModal';

interface IUseFavorite {
    listingId: string;
    currentUser?: User | null;
}

export const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavorite = useCallback(
        async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();

            if (!currentUser) {
                return loginModal.onOpen();
            }

            try {
                let request;

                if (hasFavorite) {
                    request = () => axios.delete(`/api/favorites/${listingId}`);
                } else {
                    request = () => axios.post(`/api/favorites/${listingId}`);
                }

                await request();
                router.refresh();
                toast.success('Success');
            } catch (error) {
                toast.error('Something went wrong');
            }
        },
        [currentUser, listingId, loginModal, hasFavorite, router],
    );

    return {
        toggleFavorite,
        hasFavorite,
    };
};

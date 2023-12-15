'use client';

import Image from 'next/image';
import { User } from '@prisma/client';
import { useCountries } from '@/app/hooks/useCountries';
import { Heading } from '@/app/components/Heading';
import { HeartButton } from '@/app/components/HeartButton';

interface ListingHeadProps {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    currentUser?: User | null;
}

export const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <>
            <Heading
                title={title}
                subTitle={`${location?.region}, ${location?.label}`}
            />
            <div className='relative h-[60vh] w-full overflow-hidden rounded-xl'>
                <Image
                    alt='Image'
                    src={imageSrc}
                    fill
                    className='w-full object-cover'
                />
                <div className='absolute right-5 top-5'>
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
    );
};

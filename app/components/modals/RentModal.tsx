'use client';

import { useMemo, useState } from 'react';
import { useRentModal } from '@/app/hooks/useRentModal';
import { CategoryInput } from '@/app/components/inputs/CategoryInput';
import { CountrySelect } from '@/app/components/inputs/CountrySelect';
import { Counter } from '@/app/components/inputs/Counter';
import { categories } from '@/app/components/navbar/Categories';
import { Modal } from './Modal';
import { Heading } from './Heading';
import { FieldValues, useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

export const RentModal = () => {
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        },
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');

    const Map = useMemo(
        () =>
            dynamic(() => import('@/app/components/Map'), {
                ssr: false,
            }),
        [location],
    );

    const setCustomValue = (id: string, value: any) =>
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });

    const onBack = () => setStep((prev) => prev - 1 || 0);
    const onNext = () => setStep((prev) => prev + 1);

    const actionLabel = step === STEPS.PRICE ? 'Create' : 'Next';
    const secondaryActionLabel = step === STEPS.CATEGORY ? undefined : 'Back';

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='What of these best describes your place ?'
                subTitle='Pick a category'
            />
            <div
                className='grid 
                    max-h-[50vh] 
                    grid-cols-1 
                    gap-3
                    overflow-y-auto
                    md:grid-cols-2'
            >
                {categories.map((item) => (
                    <div
                        key={item.label}
                        className='cols-span-1'
                    >
                        <CategoryInput
                            onClick={(category) =>
                                setCustomValue('category', category)
                            }
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    );

    if (step === STEPS.LOCATION) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Where is your place located ?'
                    subTitle='Help guests find you !'
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustomValue('location', value)}
                />
                <Map center={location?.latlng} />
            </div>
        );
    }

    if (step === STEPS.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='Share some basics about your place'
                    subTitle='What amenities do you have ?'
                />
                <Counter
                    title='Guests'
                    subTitle='How many guests do you allow ?'
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />
                <hr />
                <Counter
                    title='Rooms'
                    subTitle='How many rooms do you have ?'
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />
                <hr />
                <Counter
                    title='Bathrooms'
                    subTitle='How many bathrooms do you have ?'
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        );
    }

    return (
        <Modal
            title='Airbnb your home !'
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={onBack}
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            body={bodyContent}
        />
    );
};

'use client';

import { Modal } from '@/app/components/modals/Modal';
import { useSearchModal } from '@/app/hooks/useSearchModel';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import {
    CountrySelect,
    CountrySelectValue,
} from '@/app/components/inputs/CountrySelect';
import qs from 'query-string';
import { formatISO, set } from 'date-fns';
import { Heading } from '@/app/components/Heading';
import { Calendar } from '@/app/components/inputs/Calendar';
import { Counter } from '@/app/components/inputs/Counter';

enum STEP {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}

export const SearchModel = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEP.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const Map = useMemo(
        () =>
            dynamic(() => import('../Map'), {
                ssr: false,
            }),
        [location],
    );

    const onBack = useCallback(() => {
        setStep((prev) => prev - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((prev) => prev + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEP.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount,
        };

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true },
        );

        setStep(STEP.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [
        step,
        params,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        dateRange,
        searchModal,
        router,
        onNext,
    ]);

    const actionLabel = useMemo(() => {
        if (step === STEP.INFO) {
            return 'Search';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEP.LOCATION) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading
                title='Where do you wanna go ?'
                subTitle='Find the perfect location !'
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value as CountrySelectValue)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );

    if (step === STEP.DATE) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='When do you plan to go ?'
                    subTitle='Make sure everyone is free !'
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    if (step === STEP.INFO) {
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading
                    title='More information'
                    subTitle='Find your perfect place !'
                />
                <Counter
                    title='Guests'
                    subTitle='How many guests are coming ?'
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title='Rooms'
                    subTitle='How many rooms do you need ?'
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title='Bathrooms'
                    subTitle='How many bathrooms do you need ?'
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onSubmit={onSubmit}
            onClose={searchModal.onClose}
            title='Filters'
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={onBack}
            body={bodyContent}
        />
    );
};

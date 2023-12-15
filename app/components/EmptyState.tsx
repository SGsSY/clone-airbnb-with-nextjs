'use client';

import { useRouter } from 'next/navigation';
import { Heading } from '@/app/components/Heading';
import { Button } from './Button';

interface EmptyStateProps {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    title = 'No exact matches',
    subTitle = 'Try changing or removing some of your filters',
    showReset = false,
}) => {
    const router = useRouter();

    return (
        <div className='flex h-[60vh] flex-col items-center justify-center gap-2'>
            <Heading
                center
                title={title}
                subTitle={subTitle}
            />
            <div className='mt-4 w-48'>
                {showReset && (
                    <Button
                        outline
                        label='Remove all filters'
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    );
};

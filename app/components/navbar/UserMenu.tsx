'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { User } from '@prisma/client';
import { Avatar } from '@/app/components/Avatar';
import { MenuItem } from '@/app/components/navbar/MenuItem';
import { useRegisterModal } from '@/app/hooks/useRegisterModal';
import { useLoginModal } from '@/app/hooks/useLoginModal';
import { useRentModal } from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

interface UserMenuProps {
    currentUser?: User | null;
}

export const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
    const handleMenuItemClick = useCallback(
        (action: () => void) => () => {
            toggleOpen();
            action();
        },
        [toggleOpen],
    );
    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();
    }, [currentUser, loginModal, rentModal]);

    return (
        <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
                <div
                    onClick={onRent}
                    className='hidden 
                        cursor-pointer 
                        rounded-full 
                        px-4 
                        py-3 
                        text-sm 
                        font-semibold 
                        transition 
                        hover:bg-neutral-100 
                        md:block'
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className='cursor-poniter
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        border-[1px]
                        border-neutral-200
                        p-4
                        transition
                        hover:shadow-md
                        md:px-2
                        md:py-1'
                >
                    <AiOutlineMenu />
                    <div className='hidden md:block'>
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div
                    className='absolute 
                    right-0 
                    top-12 
                    w-[40vw] 
                    overflow-hidden 
                    rounded-xl 
                    bg-white 
                    text-sm 
                    shadow-md 
                    md:w-3/4'
                >
                    <div className='flex cursor-pointer flex-col'>
                        {currentUser ? (
                            <>
                                <MenuItem
                                    onClick={() => router.push('/trips')}
                                    label='My trips'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My favorites'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My reservations'
                                />
                                <MenuItem
                                    onClick={() => {}}
                                    label='My properties'
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label='Airbnb my home'
                                />
                                <hr />
                                <MenuItem
                                    onClick={handleMenuItemClick(() =>
                                        signOut(),
                                    )}
                                    label='Logout'
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={handleMenuItemClick(
                                        loginModal.onOpen,
                                    )}
                                    label='Login'
                                />
                                <MenuItem
                                    onClick={handleMenuItemClick(
                                        registerModal.onOpen,
                                    )}
                                    label='Sign Up'
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

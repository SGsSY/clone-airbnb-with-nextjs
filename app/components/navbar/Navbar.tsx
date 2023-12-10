'use client';

import { User } from '@prisma/client';
import { Container } from '@/app/components/Container';
import { Logo } from '@/app/components/navbar/Logo';
import { Search } from '@/app/components/navbar/Search';
import { UserMenu } from '@/app/components/navbar/UserMenu';
import { Categories } from '@/app/components/navbar/Categories';

interface NavbarProps {
    currentUser?: User | null;
}

export const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className='fixed z-10 w-full bg-white shadow-sm'>
            <div className='border-b-[1px] py-4'>
                <Container>
                    <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                        <Logo />
                        <Search />
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
};

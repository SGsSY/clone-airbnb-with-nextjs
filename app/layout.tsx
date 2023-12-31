import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { ToasterProvider } from '@/app/providers/ToasterProvider';
import { Navbar } from '@/app/components/navbar/Navbar';
import { RegisterModal } from '@/app/components/modals/RegisterModal';
import { LoginModal } from '@/app/components/modals/LoginModal';
import { RentModal } from '@/app/components/modals/RentModal';
import { getCurrentUser } from '@/app/actions/getCurrentUser';
import { SearchModel } from '@/app/components/modals/SearchModal';

export const metadata: Metadata = {
    title: 'Airbnb',
    description: 'Airbnb clone built with Next.js',
};

const font = Nunito({ subsets: ['latin'] });

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang='en'>
            <body className={font.className}>
                <ToasterProvider />
                <RegisterModal />
                <LoginModal />
                <RentModal />
                <SearchModel />
                <Navbar currentUser={currentUser} />
                <div className='pb-20 pt-28'>{children}</div>
            </body>
        </html>
    );
}

import prisma from '@/app/libs/prismadb';

export interface IParams {
    userId?: string;
}

export async function getListings(params: IParams = {}) {
    try {
        const { userId } = params;

        let query: any = {};

        if (userId) {
            query.userId = userId;
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createAt: 'desc',
            },
        });
        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}

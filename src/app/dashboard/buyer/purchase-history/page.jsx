import { getPurchaseHistory } from '@/lib/api/buyer';
import { getServerSession } from '@/lib/server/getServerSession';
import { Table } from '@heroui/react';
import React from 'react';

const PurchaseHistory = async () => {
    const user = await getServerSession()
    const purchaseHistory = await getPurchaseHistory(user?.id)
    return (
        <div className='p-4'>
            {/* Header */}
            <div className='mb-10'>
                <h1 className="text-3xl font-bold text-gray-900">
                    Payment History
                </h1>

                <p className="text-gray-500 mt-2">
                    View all purchased history of your ArtHub
                </p>
            </div>

            <div>
                <Table className="bg-orange-500">
                    <Table.ScrollContainer>
                        <Table.Content
                            aria-label="Purchase History"
                            className="min-w-[600px]"
                        >
                            <Table.Header className="bg-orange-500 text-white">
                                <Table.Column isRowHeader className="text-white">Artwork Name</Table.Column>
                                <Table.Column className="text-white">Artist</Table.Column>
                                <Table.Column className="text-white">Price</Table.Column>
                                <Table.Column className="text-white">Date</Table.Column>
                            </Table.Header>

                            <Table.Body>
                                {purchaseHistory.map((purchase) => (
                                    <Table.Row
                                        key={purchase._id}
                                        className="hover:bg-orange-50 transition-colors"
                                    >
                                        <Table.Cell className="font-medium">
                                            {purchase.artworkName }
                                        </Table.Cell>

                                        <Table.Cell>
                                            {purchase.artistName}
                                        </Table.Cell>

                                        <Table.Cell className="text-orange-500 font-semibold">
                                            ${purchase.amount}
                                        </Table.Cell>

                                        <Table.Cell className="text-gray-500">
                                            {new Date(purchase.createAt).toDateString()}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            </div>
        </div>
    );
};

export default PurchaseHistory;
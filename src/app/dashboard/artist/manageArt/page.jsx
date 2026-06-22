import { ArtsEditModal } from '@/Components/Dashboard/ArtsEditModal';
import { DeleteDialog } from '@/Components/Dashboard/DeleteDialog';
import { getAllArtworks } from '@/lib/api/artwork';
import { Button, Table } from '@heroui/react';
import React from 'react';

const ManageArt = async () => {
    const artWork = await getAllArtworks()
    console.log(artWork)
    return (
        <div className='p-5'>
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Title</Table.Column>
                            <Table.Column>Price</Table.Column>
                            <Table.Column>Artist</Table.Column>
                            <Table.Column>Action</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {
                                artWork.map(art =>
                                    <Table.Row key={art._id}>
                                        <Table.Cell>{art.title}</Table.Cell>
                                        <Table.Cell>{art.price}</Table.Cell>
                                        <Table.Cell>{art.artist}</Table.Cell>
                                        <Table.Cell>
                                            <div className="flex items-center gap-2">
                                                <ArtsEditModal art={art}/>
                                                <DeleteDialog id={art._id}/>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>)
                            }
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default ManageArt;
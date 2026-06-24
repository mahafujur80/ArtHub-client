import { getArtistArtworks, getArtistSales } from "@/lib/api/artist";
import { getServerSession } from "@/lib/server/getServerSession";
import { Table } from "@heroui/react";
import Link from "next/link";
import {
  MdAddBox,
  MdDashboard,
  MdHistory,
  MdPerson,
} from "react-icons/md";

export default async function ArtistOverview() {
  const user = await getServerSession();
  const artWorkData = await getArtistArtworks(user?.id);
  const salesData = await getArtistSales(user?.id);
  const allSales = salesData.resultAll;
  const totalArtworks = artWorkData.totalData;

  const recentArtworks = artWorkData.allArtwork.slice(0, 3);
  console.log();


  const revenue = allSales.reduce((total, price) => total + Number(price.amount), 0);

  const stats = [
    { title: "Total Artworks", value: totalArtworks },
    { title: "Total Sales", value: allSales.length },
    { title: "Revenue", value: `$${revenue}` },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Artist Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your artworks and track your sales.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.title}</p>
            <h3 className="mt-2 text-3xl font-bold text-orange-500">
              {stat.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-orange-500">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Link
            href="/dashboard/artist/addArts"
            className="flex w-full items-center gap-3 rounded-2xl border border-orange-100 p-5 transition-colors hover:border-orange-500 hover:bg-orange-50"
          >
            <MdAddBox size={24} className="text-orange-500" />
            Add Artwork
          </Link>

          <Link
            href="/dashboard/artist/manageArtworks"
            className="flex w-full items-center gap-3 rounded-2xl border border-orange-100 p-5 transition-colors hover:border-orange-500 hover:bg-orange-50"
          >
            <MdDashboard size={24} className="text-orange-500" />
            Manage Artworks
          </Link>

          <Link
            href="/dashboard/artist/sales"
            className="flex w-full items-center gap-3 rounded-2xl border border-orange-100 p-5 transition-colors hover:border-orange-500 hover:bg-orange-50"
          >
            <MdHistory size={24} className="text-orange-500" />
            Sales History
          </Link>
          <Link
            href="/dashboard/profile"
            className="flex w-full items-center gap-3 rounded-2xl border border-orange-100 p-5 transition-colors hover:border-orange-500 hover:bg-orange-50"
          >
            <MdPerson size={24} className="text-orange-500" />
            Profile
          </Link>

        </div>
      </div>

      {/* Recent Artworks */}
      <div className="rounded-2xl border border-orange-100 bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold text-orange-500">
          Recent Artworks
        </h2>

        <div>
          <Table className="bg-orange-500">
            <Table.ScrollContainer>
              <Table.Content aria-label="Team members" className="min-w-[600px]">
                <Table.Header className="bg-orange-500 text-white">
                  <Table.Column className="text-white" isRowHeader>Title</Table.Column>
                  <Table.Column className="text-white" >Category</Table.Column>
                  <Table.Column className="text-white" >Price</Table.Column>
                  <Table.Column className="text-white" >Status</Table.Column>
                </Table.Header>
                <Table.Body>
                  {
                    recentArtworks.map(art =>
                      <Table.Row key={art._id} className="hover:bg-orange-50 transition-colors">
                        <Table.Cell className="font-medium">{art.title}</Table.Cell>
                        <Table.Cell>{art.category}</Table.Cell>
                        <Table.Cell className="text-orange-500 font-semibold">${art.price}</Table.Cell>
                        <Table.Cell className=" text-green-600" >Publish</Table.Cell>
                      </Table.Row>)
                  }
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </div>
    </div>
)};
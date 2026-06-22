import {
  MdAddBox,
  MdDashboard,
  MdHistory,
  MdPerson,
} from "react-icons/md";

export default function ArtistOverview() {
  const stats = [
    { title: "Total Artworks", value: 24 },
    { title: "Total Sales", value: 89 },
    { title: "Revenue", value: "$3,250" },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Artist Dashboard</h1>
        <p className="text-default-500">
          Manage your artworks and track your sales.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-default-500">{stat.title}</p>
            <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">
          Quick Actions
        </h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <button className="flex items-center gap-3 rounded-2xl border p-5 hover:bg-orange-50">
            <MdAddBox size={24} />
            Add Artwork
          </button>

          <button className="flex items-center gap-3 rounded-2xl border p-5 hover:bg-orange-50">
            <MdDashboard size={24} />
            Manage Artworks
          </button>

          <button className="flex items-center gap-3 rounded-2xl border p-5 hover:bg-orange-50">
            <MdHistory size={24} />
            Sales History
          </button>

          <button className="flex items-center gap-3 rounded-2xl border p-5 hover:bg-orange-50">
            <MdPerson size={24} />
            Profile
          </button>
        </div>
      </div>

      {/* Recent Artworks */}
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Artworks
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3">Title</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="py-3">Digital Dreams</td>
                <td>Digital Art</td>
                <td>$120</td>
                <td>Published</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
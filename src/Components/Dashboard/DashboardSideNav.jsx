"use client";

import { MdPayments, MdPeople, MdDashboard, MdCollections, MdSubscriptions, MdAddBox, MdEdit, MdHistory, MdPerson, MdSettings } from "react-icons/md";


import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";


export default function Sidebar() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();

  const navItems = {
    artist: [
      { icon: MdDashboard , label: "Overview", path: "/dashboard/artist" },
      { icon: MdCollections, label: "Manage Artworks", path: "/dashboard/artist/manageArtworks" },
      { icon: MdAddBox, label: "Add Artwork", path: "/dashboard/artist/addArts" },
      { icon: MdHistory, label: "Sales History", path: "/dashboard/artist/sales" },
      { icon: MdPerson, label: "Profile Management", path: "/dashboard/profile" },
    ],

    buyer: [
      { icon: MdDashboard , label: "Overview", path: "/dashboard/buyer" },
      { icon: MdCollections, label: "Bought Artworks", path: "/dashboard/buyer/bought-artworks" },
      { icon: MdHistory, label: "Purchase History", path: "/dashboard/buyer/purchase-history" },
      { icon: MdPerson, label: "Profile Management", path: "/dashboard/profile" },
    ],
    admin:[
      { icon: MdDashboard , label: "Analytics Overview", path: "/dashboard/admin" },
      { icon: MdPeople, label: "Manage Users", path: "/dashboard/admin/manage-users" },
      { icon: MdCollections, label: "Manage All Artworks", path: "/dashboard/admin/manage-artworks" },
      { icon: MdPayments, label: "View All Transactions", path: "/dashboard/admin/transactions" },
   ],
  };

  const activeNavItems = navItems[user?.role] || [];

  return (
    <aside className="max-md:hidden w-72 min-h-screen bg-white border-r px-4 py-6">

      {/* Logo / Title */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-orange-500">
          {user?.role === "artist" ? "Artist" : user?.role === 'admin' ? "Admin" : user?.role === 'buyer' ? "Buyer" : " "} Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          {
            user?.role === "artist"
              ? "Manage your artworks"
              : user?.role === "admin"
                ? "Manage users, artworks and platform settings"
                : user?.role === "buyer"
                  ? "Manage your purchases and subscriptions"
                  : ""
          }
        </p>
      </div>

      {/* Nav Items */}
      <nav className="space-y-2">
        {activeNavItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${isActive
                  ? "bg-orange-500 text-white"
                  : "text-slate-700 hover:bg-orange-50"
                }
              `}
            >
              <Icon size={20} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
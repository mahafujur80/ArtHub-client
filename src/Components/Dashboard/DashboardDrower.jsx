"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdAddBox,
  MdEdit,
  MdHistory,
  MdPerson,
  MdSettings,
  MdHome,
  MdCollections,
  MdSubscriptions,
} from "react-icons/md";
import { Button, Drawer } from "@heroui/react";
import { BiMenu } from "react-icons/bi";
import { authClient } from "@/lib/auth-client";

export function DashboardDrawer() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const pathname = usePathname();


  const navItems = {
    artist: [
      { icon: MdDashboard, label: "Overview", path: "/dashboard/artist" },
      { icon: MdCollections, label: "Manage Artworks", path: "/dashboard/artist/manageArtworks" },
      { icon: MdAddBox, label: "Add Artwork", path: "/dashboard/artist/addArts" },
      { icon: MdHistory, label: "Sales History", path: "/dashboard/artist/sales" },
      { icon: MdPerson, label: "Profile Management", path: "/dashboard/profile" },
    ],

    buyer: [
      { icon: MdDashboard, label: "Overview", path: "/dashboard/buyer" },
      { icon: MdCollections, label: "Bought Artworks", path: "/dashboard/buyer/bought-artworks" },
      { icon: MdHistory, label: "Purchase History", path: "/dashboard/buyer/purchase-history" },
      { icon: MdPerson, label: "Profile Management", path: "/dashboard/profile" },
    ],
    admin: [
      { icon: MdDashboard, label: "Analytics Overview", path: "/dashboard/admin" },
      { icon: MdPeople, label: "Manage Users", path: "/dashboard/admin/manage-users" },
      { icon: MdCollections, label: "Manage All Artworks", path: "/dashboard/admin/manage-artworks" },
      { icon: MdPayments, label: "View All Transactions", path: "/dashboard/admin/transactions" },
    ],
  };

  const activeNavItems = navItems[user?.role] || [];

  return (
    <Drawer>
      <Button className="bg-white text-black">
        <BiMenu size={30} />
      </Button>

      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />

            <Drawer.Header>
              <h1 className="text-2xl font-bold text-orange-500">
                {user?.role === "artist" ? "Artist" : user?.role === 'admin' ? "Admin" : user?.role === 'buyer' ? "Buyer" : " "} Dashboard
              </h1>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="flex flex-col gap-2">
                {activeNavItems.map((item) => {
                  const isActive =
                    pathname === item.path
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.path}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-orange-500 text-white shadow-md"
                        : "text-default-700 hover:bg-orange-50"
                        }`}
                    >
                      <Icon
                        className={`size-5 ${isActive
                          ? "text-white"
                          : "text-default-500 group-hover:text-orange-500"
                          }`}
                      />

                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
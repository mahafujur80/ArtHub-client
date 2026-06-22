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


 const artistNavItems = [
  { icon: MdHome , label: "Home", path: "/dashboard/artist" },
  { icon: MdDashboard, label: "Manage Artworks", path: "/dashboard/artist/manageArt" },
  { icon: MdAddBox, label: "Add Artwork", path: "/dashboard/artist/addArts" },
  { icon: MdEdit, label: "Edit Artwork", path: "/dashboard/artworks/edit" },
  { icon: MdHistory, label: "Sales History", path: "/dashboard/sales" },
  { icon: MdPerson, label: "Profile Management", path: "/dashboard/profile" },
  { icon: MdSettings, label: "Settings", path: "/dashboard/settings" },
];
const userNavItems = [
  { icon: MdSubscriptions, label: "Subscription", path: "/subscription" },
  { icon: MdPerson, label: "Profile Management", path: "/profile" },
  { icon: MdCollections, label: "Bought Artworks", path: "/bought-artworks" },
  { icon: MdHistory, label: "Purchase History", path: "/purchase-history" },
];

const activeNavItems =  user?.role === "artist" ? artistNavItems : userNavItems;

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
              <Drawer.Heading>Artist Dashboard</Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>
              <nav className="flex flex-col gap-2">
                {activeNavItems.map((item) => {
                  const isActive =
                    pathname === item.path ||
                    pathname.startsWith(item.path + "/");

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.label}
                      href={item.path}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-orange-500 text-white shadow-md"
                          : "text-default-700 hover:bg-orange-50"
                      }`}
                    >
                      <Icon
                        className={`size-5 ${
                          isActive
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
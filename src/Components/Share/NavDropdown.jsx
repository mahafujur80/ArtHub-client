'use client';

import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";

export function NavDropdown({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut()
    router.push("/");
  };

  const dashboardLink = user?.role === "artist" ? "/dashboard/artist" : user?.role === "buyer"? "/dashboard/buyer" : user?.role === "admin"? "/dashboard/admin": '/unauthorize';

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt="Junior Garcia"
            src={user?.image}
          />
          <Avatar.Fallback delayMs={600}>{user?.name[0].toUpperCase()}</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt="Junior Garcia"
                src={user?.image || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAKmcNtLpfL0N_5aTPqyhDnmRFAfKpXWRBQQ&s"}
              />
              <Avatar.Fallback delayMs={600}>{user?.name[0].toUpperCase()}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">{user?.name}</p>
              <p className="text-xs leading-none text-muted">{user?.email}</p>
            </div>
          </div>
        </div>
        <Dropdown.Menu>
          <Dropdown.Item id="dashboard" textValue="Dashboard">
            <Link href={dashboardLink} className="flex w-full items-center justify-between gap-2"> Dashboard</Link>
          </Dropdown.Item>
          <Dropdown.Item id="logout" textValue="Logout" variant="danger">
            <div onClick={handleLogout} className="flex w-full items-center justify-between gap-2">
              <Label>Log Out</Label>
              <LuLogOut className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
'use client';

import { updateUserRole } from "@/lib/api/admin";
import { Button, Label, ListBox, Modal, Surface, Select } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiExpandVertical } from "react-icons/bi";

export function UpdateUserRoleModal({ userId }) {

    const [currentRole, setCurrentRole] = useState("");
    const router = useRouter();


    const makeUserBuyer = async () => {
        const res = await updateUserRole(userId, {role: "buyer"});
        if (res.success) {
            toast.success(res.message)
            router.refresh()
        } else {
            toast.error(res.message)
        }
    };
    const makeUserArtist = async () => {
        const res = await updateUserRole(userId, {role: "artist"});
        if (res.success) {
            toast.success(res.message)
            router.refresh()
        } else {
            toast.error(res.message)
        }
    };
    const makeUserAdmin = async () => {
        const res = await updateUserRole(userId, {role: "admin"});
        if (res.success) {
            toast.success(res.message)
            router.refresh()
        } else {
            toast.error(res.message)
        }
    };
    
    
    useEffect(() => {
        if (currentRole === "buyer") {
            makeUserBuyer(currentRole)
        } else if (currentRole === "artist") {
            makeUserArtist(currentRole)
        } else if (currentRole === "admin") {
            makeUserAdmin(currentRole)
        }
    }, [currentRole])

    return (
        <Modal>
            <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-50"
            >
                Update Role
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md rounded-2xl overflow-hidden border border-orange-100 shadow-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Body className="p-4">
                            <Surface
                                variant="default"
                                className="border border-orange-100 rounded-xl p-4 bg-white"
                            >
                                <Select
                                    onChange={(value) => setCurrentRole(value)}
                                    placeholder="Select Role"
                                >
                                    <Label className="text-sm font-semibold text-orange-600 mb-2">
                                        Select Role To Update
                                    </Label>

                                    <Select.Trigger className="border-orange-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200">
                                        <Select.Value />
                                        <Select.Indicator className="size-4 text-orange-500">
                                            <BiExpandVertical />
                                        </Select.Indicator>
                                    </Select.Trigger>

                                    <Select.Popover>
                                        <ListBox>
                                            <ListBox.Item
                                                id="buyer"
                                                textValue="buyer"
                                                className="hover:bg-orange-50"
                                            >
                                                Make Buyer
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item
                                                id="artist"
                                                textValue="artist"
                                                className="hover:bg-orange-50"
                                            >
                                                Make Artist
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>

                                            <ListBox.Item
                                                id="admin"
                                                textValue="admin"
                                                className="hover:bg-orange-50"
                                            >
                                                Make Admin
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" className="bg-red-50 hover:bg-orange-100 text-red-500">
                                Close Modal
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
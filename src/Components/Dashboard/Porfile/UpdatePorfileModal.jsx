"use client";

import { UploadImage } from "@/lib/server/UploadImage";
import { updateUser } from "@/lib/server/UserUpdate";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";

export function UpdateProfileModal({ user }) {

    const [image, setImage] = useState(null);
    const router = useRouter()

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const formData = Object.fromEntries(form.entries());
        let imageUrl = user?.image;
        if (image) {
            const imageData = await UploadImage(image);
            imageUrl = imageData.url;
        }

        const userData = {
            name: formData.name,
            image: imageUrl,
        };

        const res = await updateUser(userData)
        if (res.data.status) {
            toast.success("User updated successfully")
            router.refresh(`/dashboard/${user?.role}/profile`)
        } else {
            toast.error(res.error.message || "User update failed")
        }
       
    };

    return (
        <Modal>
            <Button
                startContent={<FiEdit className="w-4 h-4 sm:w-5 sm:h-5" />}
                className="w-full sm:flex-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold py-3 sm:py-3.5 md:py-4 rounded-xl sm:rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-sm sm:text-base"
            >
                Update Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-orange-500 text-white">
                                <FiEdit className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Update Profile</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                                    <label
                                        htmlFor="image"
                                        className="block mb-2 text-sm font-medium text-orange-500"
                                    >
                                        Name
                                    </label>

                                    <input
                                        defaultValue={user?.name}
                                        placeholder="Enter Your Full Name"
                                        name="name"
                                        type="text"
                                        className="w-full cursor-pointer rounded-lg border-2 border-orange-500 bg-white px-4 py-2 text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <label
                                        htmlFor="image"
                                        className="block mb-2 text-sm font-medium text-orange-500"
                                    >
                                        Select Your Image
                                    </label>

                                    <input
                                        onChange={(e) => setImage(e.target.files?.[0])}
                                        name="image"
                                        type="file"
                                        className="w-full cursor-pointer rounded-lg border-2 border-orange-500 bg-white px-4 py-2 text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-orange-500 file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                    <Modal.Footer>
                                        <Button
                                            slot="close"
                                            variant="outline"
                                            className="border-orange-300 text-orange-600"
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close"   className="bg-orange-500 hover:bg-orange-600 text-white" >Save Changes</Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
"use client";

import { updateArtwork } from "@/lib/server/artist";
import { UploadImage } from "@/lib/server/UploadImage";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiEdit } from "react-icons/bi";
const categories = [
    "Painting",
    "Digital Art",
    "Illustration",
    "Photography",
    "Abstract",
    "Portrait",
    "Landscape",
    "Concept Art",
    "Sketch",
    "Calligraphy",
];

export function ArtsEditModal({ art }) {

    const [category, setCategory] = useState(art?.category);
    const [image, setImage] = useState(null);
    const router = useRouter()


    const handleEdit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const formData = Object.fromEntries(form.entries());
        let imageUrl = art?.image;
        if (image) {
            const imageData = await UploadImage(image);
            imageUrl = imageData.url;
        }

        const artworkData = {
            title: formData.title,
            description: formData.description,
            price: Number(formData.price),
            category: category,
            image: imageUrl,
        };
        const res = await updateArtwork(art?._id, artworkData)
       
        if(res.modifiedCount === 1){
            toast.success("Artwork updated successfully")
            router.refresh()
        }
    };



    return (
        <Modal>
            <Button variant="outline">Edit</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-orange-500 text-white">
                                <BiEdit className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Edit Artwork</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form onSubmit={handleEdit} className="space-y-6">
                                    {/* Title */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Artwork Title
                                        </label>

                                        <input
                                            defaultValue={art?.title}
                                            required
                                            name="title"
                                            type="text"
                                            placeholder="Enter artwork title"
                                            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Description
                                        </label>

                                        <textarea
                                            defaultValue={art?.description}
                                            name="description"
                                            rows={5}
                                            placeholder="Write artwork description..."
                                            required
                                            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500"
                                        />
                                    </div>

                                    {/* Price & Category */}
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium">
                                                Price ($)
                                            </label>

                                            <input
                                                defaultValue={art?.price}
                                                name="price"
                                                type="number"
                                                min="1"
                                                placeholder="100"
                                                required
                                                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium">
                                                Category
                                            </label>

                                            <select 
                                                onChange={(e) => setCategory(e.target.value)}
                                                value={category}
                                                name="category"
                                                required
                                                className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500"
                                            >
                                                <option >Select Category</option>
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Image Upload */}
                                    <div>
                                        <label className="mb-2 block text-sm font-medium">
                                            Artwork Image
                                        </label>

                                        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-8 transition hover:border-orange-500">
                                            <div className="mb-3">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    src={art?.image}
                                                    alt={art?.title}
                                                    className="h-32 w-32 rounded-lg object-cover"
                                                />
                                            </div>
                                            <span className="text-lg font-semibold">
                                                Click to Upload
                                            </span>

                                            <span className="mt-2 text-sm text-gray-500">
                                                PNG, JPG, JPEG (Max 5MB)
                                            </span>

                                            {image && (
                                                <span className="mt-3 text-sm font-medium text-orange-500">
                                                    Selected: {image.name}
                                                </span>
                                            )}

                                            <input
                                                name="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setImage(e.target.files?.[0])}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>

                                    <Modal.Footer>
                                        <Button slot="close" variant="outline">
                                            Cancel
                                        </Button>
                                        <Button type="submit" slot="close" className='bg-orange-500 text-white' >Save</Button>
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
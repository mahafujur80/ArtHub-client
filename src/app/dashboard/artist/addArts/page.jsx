"use client";

import { useState } from "react";
import { UploadImage } from "@/lib/server/UploadImage";
import { createArtwork } from "@/lib/server/artist";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

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

export default function ArtworkForm() {
  const [image, setImage] = useState(null);
  const router = useRouter()
 const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData(e.currentTarget);
      const formData = Object.fromEntries(form.entries());

      const imageData = await UploadImage(image);

      const artworkData = {
        artist: user?.name,
        artistImage: user?.image,
        artistEmail: user?.email,
        artistId:user?.id,
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category.toLowerCase(),
        image: imageData.url,
      };
      const res = await createArtwork(artworkData);

      if (res.insertedId) {
        toast.success("Artwork added successfully");
        router.push("/dashboard/artist");
      } else {
        toast.error("Artwork add failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-3xl bg-white my-10 p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Artwork</h1>
        <p className="mt-2 text-gray-500">
          Upload and showcase your artwork to collectors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Artwork Title
          </label>

          <input
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
              name="category"
              required
              className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-orange-500"
            >
              <option value="">Select Category</option>

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
              required
              onChange={(e) => setImage(e.target.files?.[0])}
              className="hidden"
            />
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Add Artwork
        </button>
      </form>
    </div>
  );
}

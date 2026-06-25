"use client";

import { deleteArtworkAdmin } from "@/lib/api/admin";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function AdminDeleteArtwork({artwork}) {

  const router = useRouter();

  const handleDelete = async () => {
    const res = await deleteArtworkAdmin(artwork._id);
   
    if(res.deletedCount === 1) {
      toast.success("Artwork deleted successfully")
      router.refresh('/dashboard/admin/manage-artworks')
    }
  }

  return (
    <AlertDialog>
      <Button variant="danger-soft">Delete Artwork</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Artist Artwork permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                <strong>{artwork.title}</strong> will be permanently deleted.
                 You can not undo this action.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Artwork
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
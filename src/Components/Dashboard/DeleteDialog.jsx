"use client";

import { deleteArtwork } from "@/lib/server/artist";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteDialog({id}) {
    const router = useRouter()
    const handleDelete = async () => {
        const res = await deleteArtwork(id)
        if(res.deletedCount === 1){
            toast.success("Artwork deleted successfully")
            router.refresh('/dashboard/artist/manageArt')
        }
    };
  return (
    <AlertDialog>
      <Button variant="danger-soft">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Item permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This item will be deleted permanently. This action cannot be
                undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
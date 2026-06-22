'use client';

import { useState } from 'react';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { FiEdit, FiLock } from 'react-icons/fi';
import {
    Button,
    Modal,
    Surface,
    TextField,
    Label,
    InputGroup,
    Description,
    FieldError,
} from '@heroui/react';
import { updatePassword } from '@/lib/server/UserUpdate';
import toast from 'react-hot-toast';

const UpdatePasswordModal = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        const form = new FormData(e.currentTarget);
        const formData = Object.fromEntries(form.entries());

        const {data, error} = await updatePassword(formData)
        if(data){
            toast.success("Password updated successfully")
            e.target.reset()
        }else{
            toast.error(error?.message || "Password update failed")
        }

    };

    return (
        <Modal>
            <Button
                variant="bordered"
                startContent={<FiLock className="w-5 h-5" />}
                className="w-full sm:flex-1 font-semibold rounded-xl border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
            >
                Change Password
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Icon className="bg-orange-500 text-white">
                                <FiEdit className="size-5" />
                            </Modal.Icon>

                            <Modal.Heading>
                                Change Password
                            </Modal.Heading>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface
                                variant="default"
                        
                            >
                                <form
                                    onSubmit={handleUpdatePassword}
                                    className="flex flex-col gap-5"
                                >
                                    {/* Current Password */}
                                    <TextField isRequired>
                                        <Label className="text-orange-600 font-medium">
                                            Current Password
                                        </Label>

                                        <InputGroup className="border border-orange-300 rounded-xl focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500">
                                            <InputGroup.Input
                                                name="currentPassword"
                                                type={showCurrentPassword ? "text" : "password"}
                                                placeholder="Enter your current password"
                                                className="border-0 focus:ring-0 focus:outline-none"
                                            />

                                            <InputGroup.Suffix>
                                                <Button
                                                    type="button"
                                                    isIconOnly
                                                    variant="light"
                                                    size="sm"
                                                    onPress={() =>
                                                        setShowCurrentPassword(!showCurrentPassword)
                                                    }
                                                    className="text-orange-500 hover:text-orange-600"
                                                >
                                                    {showCurrentPassword ? <BsEye /> : <BsEyeSlash />}
                                                </Button>
                                            </InputGroup.Suffix>
                                        </InputGroup>

                                        <FieldError />
                                    </TextField>

                                    {/* New Password */}
                                    <TextField
                                        isRequired
                                        validate={(value) => {
                                            if (value.length < 8)
                                                return "Minimum 8 characters required";

                                            if (!/[A-Z]/.test(value))
                                                return "At least 1 uppercase letter required";

                                            if (!/[a-z]/.test(value))
                                                return "At least 1 lowercase letter required";

                                            if (!/[0-9]/.test(value))
                                                return "At least 1 number required";

                                            return null;
                                        }}
                                    >
                                        <Label className="text-orange-600 font-medium">
                                            New Password
                                        </Label>

                                        <InputGroup className="border border-orange-300 rounded-xl focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500">
                                            <InputGroup.Input
                                                name="newPassword"
                                                type={showNewPassword ? "text" : "password"}
                                                placeholder="Enter your new password"
                                                className="border-0 focus:ring-0 focus:outline-none"
                                            />

                                            <InputGroup.Suffix>
                                                <Button
                                                    type="button"
                                                    isIconOnly
                                                    variant="light"
                                                    size="sm"
                                                    onPress={() =>
                                                        setShowNewPassword(!showNewPassword)
                                                    }
                                                    className="text-orange-500 hover:text-orange-600"
                                                >
                                                    {showNewPassword ? <BsEye /> : <BsEyeSlash />}
                                                </Button>
                                            </InputGroup.Suffix>
                                        </InputGroup>

                                        <Description className="text-orange-500 text-sm">
                                            Minimum 8 characters, 1 uppercase, 1 lowercase and 1 number.
                                        </Description>

                                        <FieldError />
                                    </TextField>

                                    <Modal.Footer className="px-0 pb-0">
                                        <Button
                                            slot="close"
                                            variant="outline"
                                            className="border-orange-300 text-orange-600"
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="bg-orange-500 hover:bg-orange-600 text-white"
                                        >
                                            Update Password
                                        </Button>
                                    </Modal.Footer>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdatePasswordModal;
import { SetStateAction, useState } from 'react';
import { IconPencil } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { AspectRatio, Avatar, Box, Button, Group, Image, Modal, Stack, Text } from '@mantine/core';
import { useDisclosure, useFileDialog, useHover } from '@mantine/hooks';
import { useUserStore } from '@/store/user';

export function UserProfileHeaderImage() {
  const { userDetail } = useUserStore();

  return (
    <Box>
      <Image
        src={userDetail.cover_photo || "https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-513809-1323206.jpg&fm=jpg"}
        fit="cover"
        radius="sm"
        h="40vh"
      />
    </Box>
  );
}

export function UserProfileHeaderInfo() {
  const { userDetail } = useUserStore();
  const { hovered, ref } = useHover();
  const [file, setFile] = useState<File | null>(null);
  const [open, { open: openModal, close: closeModal }] = useDisclosure(false);
  const [openCover, { open: openCoverModal, close: closeCoverModal }] = useDisclosure(false);

  const handleUploadProfile = (file: FileList | null) => {
    if (file) {
      setFile(file[0]);
      openModal();
    }
  };

  const handleUploadCover = (file: FileList | null) => {
    if (file) {
      setFile(file[0]);
      openCoverModal();
    }
  };

  const profilPhoto = useFileDialog({
    multiple: false,
    onChange: handleUploadProfile,
  });

  const coverPhoto = useFileDialog({
    multiple: false,
    onChange: handleUploadCover,
  });

  return (
    <Group justify="space-between" align="center">
      <Group justify="flex-start" align="flex-start">
        <Avatar
          size={100}
          ref={ref}
          name="AB"
          children={
            <Stack align="center" onClick={profilPhoto.open}>
              <IconPencil />
              <Text fz={'xs'}>Change Photo</Text>
            </Stack>
          }
          src={
            hovered
              ? null
              : userDetail.profile_photo
                ? userDetail.profile_photo
                : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1728777600&semt=ais_hybrid-rr-similar'
          }
          color="black"
          opacity={1}
          style={{
            translate: '15% -50%',
            cursor: hovered ? 'pointer' : 'default',
          }}
        />
        <Group ml={20} mt={20} gap="xl">
          <Stack gap="xs">
            <Text size="xl" fw="bold">
              {userDetail.fullname}
            </Text>
            <Text size="sm" fw="bold">
              {userDetail.role_name} - {userDetail.institution_name}
            </Text>
          </Stack>
        </Group>
      </Group>
      <Button onClick={coverPhoto.open}>Edit Cover</Button>
      <ChangePhoto open={open} close={closeModal} file={file!} />
      <ChangeCover open={openCover} close={closeCoverModal} file={file!} />
    </Group>
  );
}

interface ChangePhotoProps {
  close: () => void;
  open: boolean;
  file: File;
}

function ChangePhoto({ open, close, file }: ChangePhotoProps) {
  const { uploadProfilePhoto } = useUserStore();
  const navigate = useNavigate();

  const handleSubmitProfilePhoto = async (file: File) => {
    const request: FormData = new FormData();
    request.append('file', file);
    await uploadProfilePhoto(request).finally(() => {
      navigate(0);
    });
  };
  return (
    <Modal
      title="Change Profile Photo"
      opened={open}
      onClose={close}
      centered
      closeOnClickOutside={false}
    >
      <AspectRatio ratio={16 / 9}>
        {file && <img src={URL.createObjectURL(file)} alt="" />}
      </AspectRatio>

      <Button onClick={() => handleSubmitProfilePhoto(file)}>Submit</Button>
    </Modal>
  );
}

function ChangeCover({ open, close, file }: ChangePhotoProps) {
  const { uploadCoverPhoto } = useUserStore();
  const navigate = useNavigate();
  
  const handleSubmitCoverPhoto = async (file: File) => {
    const request: FormData = new FormData();
    request.append('file', file);
    await uploadCoverPhoto(request).finally(() => {
      navigate(0);
    });
  };

  return (
    <Modal
      title="Change Cover Photo"
      opened={open}
      onClose={close}
      centered
      closeOnClickOutside={false}
    >
      <AspectRatio ratio={16 / 9}>
        {file && <img src={URL.createObjectURL(file)} alt="" />}
      </AspectRatio>

      <Button onClick={() => handleSubmitCoverPhoto(file)}>Submit</Button>
    </Modal>
  );
}

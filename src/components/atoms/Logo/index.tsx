// import { useRef } from 'react';
// import { Player } from '@lordicon/react';
import { AspectRatio, Center, Image } from '@mantine/core';
import logo from '@/assets/icon/bpkp.png'
// import ICON from '@/assets/icon/flat-book.json';

export function Logo() {
  // const playerRef = useRef<Player>(null);

  return (
    <AspectRatio ratio={50 / 50} maw={50} ml={20} mt={5} my="auto">
      <Center>
        <Image src={logo} alt="Logo" />
        {/* <Player ref={playerRef} icon={ICON} size={50} /> */}
      </Center>
    </AspectRatio>
  );
}

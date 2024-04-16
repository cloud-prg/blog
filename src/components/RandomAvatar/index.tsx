import { createAvatar } from '@dicebear/core';
import { identicon } from '@dicebear/collection';
import Image from 'next/image';

const RandomAvatar: React.FC<{ size?: number }> = (props) => {
    const { size = 40 } = props;

    const avatar = createAvatar(identicon, {
        seed: Math.random().toString(),
        size,
        radius: 50
    }).toDataUriSync();

    return <Image src={avatar} alt="Random Avatar" width={size} height={size} />
}

export default RandomAvatar;
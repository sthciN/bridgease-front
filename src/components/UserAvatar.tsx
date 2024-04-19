import React from 'react';
import { Avatar } from '@mui/material';

interface AvatarProps {
    user: any;
    css: any;
    onClickAvatar: () => void;
}

const UserAvatar: React.FC<AvatarProps> = ({ user, css, onClickAvatar }) => {
    return (
        <Avatar onClick={onClickAvatar} css={css} src={user.avatar} alt={user.firstName} />
    )
};

export default UserAvatar;
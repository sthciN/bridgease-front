import React from 'react';
import { Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface AvatarProps {
    user: any;
    css: any;
    onClickAvatar: () => void;
}

const UserAvatar: React.FC<AvatarProps> = ({ user, css, onClickAvatar }) => {
    return (
        <Avatar onClick={onClickAvatar} css={css} alt={user.firstName}>
            <AccountCircleIcon />
        </Avatar>
    )
};

export default UserAvatar;

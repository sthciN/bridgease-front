import React, { useEffect, useState } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import UserAvatar from './UserAvatar';
import { useTranslation } from 'react-i18next';
import Link from './Link';
import { getStyles } from '../utils/style';
import LanguageDropdown from './LanguageDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import getTheme from '../utils/theme';
import { setLoggedIn, setUser } from '../store/authSlice';
import { useRouter } from 'next/router';

export default function MyHeader() {
    const theme = getTheme();
    const router = useRouter();
    const { locales, locale: activeLocale } = router;
    const { pathname, query, asPath } = router;
    const styles = getStyles(theme);
    const { t, i18n } = useTranslation();
    const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
    const [user, setUserData] = useState(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const dispatch = useDispatch();
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('auth');
        dispatch(setUser(null));
        dispatch(setLoggedIn(false));
    }
    const handleClickAvatar = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    useEffect(() => {
        const auth = localStorage.getItem('auth');
        console.log('auth', auth)
        if (auth) {
            setUserData(JSON.parse(auth).user);
        }
    }, [loggedIn]);

    return (
        <AppBar position="static">
            <Toolbar css={styles.toolbar.toolbar}>
                <Box>
                    <Link href="/"
                        // as={asPath}
                        // locale={i18n.language}
                        // legacyBehavior
                    >
                        <Typography css={styles.toolbar.toolbarTitle} variant="h6" sx={{ flexGrow: 1 }}>
                            BRIDGEASE
                        </Typography>
                    </Link>
                </Box>
                <Box display="flex" alignItems="center">
                    <Link href="/about"
                        // as={asPath}
                        // locale={i18n.language}
                        // legacyBehavior
                    >
                        <Button css={styles.toolbar.toolbarButton}>{t('about')}</Button>
                    </Link>
                    <Link href="/contact"
                        // as={asPath}
                        // locale={i18n.language}
                        // legacyBehavior
                    >
                        <Button css={styles.toolbar.toolbarButton}>{t('contact')}</Button>
                    </Link>
                    <Link href="/product"
                        // as={asPath}
                        // locale={i18n.language}
                        // legacyBehavior
                    >
                        <Button css={styles.toolbar.toolbarButton}>{t('product')}</Button>
                    </Link>
                    <LanguageDropdown />
                    {user ? (
                        <>
                            <UserAvatar css={styles.toolbar.toolbarAvatar} user={user} onClickAvatar={handleClickAvatar} />
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link href="/profile"
                                        // as={asPath}
                                        // locale={i18n.language}
                                        // legacyBehavior
                                    >
                                        <Button>{t('profile')}</Button>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    <Link href="/"
                                        // as={asPath}
                                        // locale={i18n.language}
                                        // legacyBehavior
                                    >
                                        <Button>{t('logout')}</Button>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link href="/login"
                            // as={asPath}
                            // locale={i18n.language}
                            // legacyBehavior
                        >
                            <Button css={styles.toolbar.toolbarLogin}>{t('login')}</Button>
                        </Link>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

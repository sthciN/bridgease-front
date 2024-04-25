import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemIcon, ListItemText, Container, ListItemButton, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StyleIcon from '@mui/icons-material/Style';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { getStyles } from './utils/style';
import LanguageDropdown from './components/LanguageDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setUser } from './store/authSlice';
import { useTranslation } from 'react-i18next';
import UserAvatar from './components/UserAvatar';
import { RootState } from './store/store';

interface LayoutProps {
    children: ReactNode;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const router = useRouter();
    const styles = getStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogout = () => {
        localStorage.removeItem('auth');
        localStorage.removeItem('accessToken');
        dispatch(setUser(null));
        dispatch(setLoggedIn(false));
        router.push('/');
    }

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            router.push('/login');
        }
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                        <DashboardIcon />
                    </IconButton>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        {t('dashboard')}
                    </Typography>
                    <LanguageDropdown />
                    <IconButton color="inherit" onClick={handleLogout}>
                        <ExitToAppIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
                <List>
                    <ListItemButton onClick={() => router.push('/profile')}>
                        <ListItemIcon>
                            {user ? <UserAvatar user={user} /> : null}
                            {/* <UserAvatar user={user} /> */}
                        </ListItemIcon>
                        <ListItemText primary={t("profile")} />
                    </ListItemButton>
                    <Divider />
                    <ListItemButton onClick={() => router.push('/visa-card')}>
                        <ListItemIcon>
                            <StyleIcon />
                        </ListItemIcon>
                        <ListItemText primary={t("visa_card")} />
                    </ListItemButton>
                    {/* Add more list items here for other dashboard sections */}
                </List>
            </Drawer>
            <Container maxWidth="lg" css={styles.container.body}>
                {children}
            </Container>
        </div>
    );
};

export default DashboardLayout;
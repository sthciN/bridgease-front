import { Box, Container, AppBar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic'
import Header from './components/Header';
import { getStyles } from './utils/style';
import getTheme from './utils/theme';

interface LayoutProps {
    children: ReactNode;
}

// const DynamicHeader = dynamic(() => import('./components/Header'), {
//     ssr: false,
// })

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { t } = useTranslation();
    const theme = getTheme();
    const styles = getStyles(theme);
    return (
        <Box>
            <AppBar position="static">
                <Header />
            </AppBar>
            <Container maxWidth="lg" css={styles.container.body}>
                {children}
            </Container>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                <Typography variant="body1" align="center">
                    {t('footer')}
                </Typography>
            </Box>
        </Box>
    );
}

export default Layout;
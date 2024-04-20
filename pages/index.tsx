import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/components/Link';
import ProTip from '../src/ProTip';
import Layout from '../src/Layout';
import Copyright from '../src/Copyright';
import { useTranslation } from 'react-i18next';


export default function Home() {

  const { t, i18n } = useTranslation();

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>          
            {t('welcome')}
          </Typography>
          <Link href="/about" locale={i18n.language} color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
}

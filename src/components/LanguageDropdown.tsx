import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { website_languages } from '../utils/consts';

interface LanguageProps {
  userLanguage: string;
}

const LanguageDropdown: React.FC<LanguageProps> = ({ userLanguage }) => {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const currentLocale = i18n.language;
  const currentPathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    localStorage.setItem('language', language);
    handleClose();
    // document.cookie = `NEXT_LOCALE=${language};path=/` ;
    // if (
    //   currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault
    // ) {
    //   router.push('/' + language + currentPathname);
    //  } else {
    //   router.push(
    //   currentPathname.replace(`/${currentLocale}`, `${language}`)
    //   );
    // }
    router.reload();
  };

  return (
    <>
      <Button color="inherit" aria-controls="language-menu" aria-haspopup="true" onClick={handleClick}>
        {t('sign_language')}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {(userLanguage && userLanguage != 'en') ? (
          <>
            <MenuItem onClick={() => handleLanguageChange('en')}>{t('english')}</MenuItem>
            <MenuItem onClick={() => handleLanguageChange(userLanguage)}>
              {t(`website_languages.${userLanguage}`)}
            </MenuItem>
          </>
        ) : (
          website_languages.map((language) => (
            <MenuItem key={language} onClick={() => handleLanguageChange(language)}>
              {t(`website_languages.${language}`)}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}

export default LanguageDropdown;
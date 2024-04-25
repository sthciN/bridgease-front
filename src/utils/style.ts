import { css } from '@emotion/react'
import getTheme from './theme';
import { Theme } from '@mui/material';


export const getStyles = (theme: Theme = getTheme(), spacing: number = 4) => {
  return ({
    toolbar: {
      toolbarButton: css({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }),
      toolbar: css({
        justifyContent: 'space-between'
      }),
      toolbarLogin: css({
        border: '1px solid #eee',
        color: theme.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.palette.primary.light,
        },
      }),
      toolbarTitle: css({
        color: theme.palette.primary.contrastText,
      }),
      toolbarAvatar: css({
        display: 'flex',
        alignItems: 'center',
      }),
    },
    title: css({
      fontSize: '1.25rem'
    }),
    container: {
      body: css({
        // display: 'flex',
        // justifyContent: 'space-between',
        marginTop: spacing * 10,
        marginBottom: spacing * 10,
        padding: spacing * 5,
      }),
    },
    button: css({
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      marginTop: spacing * 2,
      marginBottom: spacing * 2,
      padding: spacing * 4,
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    }),
    dashboard: {
      form: {
        input: css({
          marginTop: spacing * 4,
          marginBottom: spacing * 2,
        }),
        submitButton: css({
          marginTop: spacing * 4,
          marginBottom: spacing * 2,
        }),
        selectLanguageInput: css({
          width: '100%',
        }),
        divider: css({
          '&.MuiDivider-root': {
            marginTop: spacing * 4,
            marginBottom: spacing * 4,
          }
        }),
      },
      gridContainer: css({
        // paddingRight: spacing * 2,
        // display: 'flex',
        // justifyContent: 'space-between',
      }),
      ColorlibConnector: css({
        '&.MuiStepConnector-root': {
          lineHeight: 4.5,
        },
        '& .MuiStepConnector-line': {
          backgroundImage:
            `linear-gradient( 95deg,${theme.palette.primary.main} 0%,${theme.palette.secondary.main} 50%,${theme.palette.primary.main} 100%)`,
          height: 3,
          border: 0,
          backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.primary.main,
          borderRadius: 1,
        }
      }),
      ColorlibConnectorSmallScreen: css({
      }),
      ColorlibStepperIcon: css({
        backgroundImage:
          `linear-gradient( 95deg,${theme.palette.primary.main} 0%,${theme.palette.secondary.main} 50%,${theme.palette.primary.main} 100%)`,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      }),
      BoxTimelineWrapper: css({
        marginTop: spacing * 30,
        marginBottom: spacing * 30,
      }),
      Credit: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(3),
        },
        select: {
          margin: theme.spacing(1),
        },
        button: {
          marginTop: theme.spacing(2),
        },
      }
    }
  });
};

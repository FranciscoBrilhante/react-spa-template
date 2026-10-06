import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Home = () => {
    const { t } = useTranslation();

    return <Typography>{t('asas')} </Typography>;
};

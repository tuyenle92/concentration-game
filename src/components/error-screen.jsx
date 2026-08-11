import { Alert, AlertTitle } from '@mui/material';
import { useSelector } from 'react-redux';

export const ErrorScreen = () => {
    const { error } = useSelector((state) => state.randomImages);

    const alert = (
        <Alert severity='error' variant='filled'>
            <AlertTitle>Error</AlertTitle>
            <AlertTitle>{error}</AlertTitle>
        </Alert>
    )
    return (
        error
            ? alert
            : null
    );
}
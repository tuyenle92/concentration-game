import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchRandomImages } from '../slices/image-fetch-slice.js';
import { Popover } from '../components/next-level-popover.jsx';
import { DrawerAppBar } from '../components/appbar.jsx';
import { ErrorScreen } from '../components/error-screen.jsx';
import { ImageGroup } from '../components/image-group.jsx';
import styles from '../css/screen.module.css';

const Home = () => {
    const dispatch = useDispatch();
    const { numberOfImages, theme } = useSelector((state) => state.game);


    useEffect(() => {
        dispatch(fetchRandomImages({ count: numberOfImages, theme }));
    }, [numberOfImages, theme, dispatch]);

    return (
        <main>
            <DrawerAppBar/>
            <div className={styles.container}>
                <Popover/>
                <ErrorScreen/>
                <ImageGroup/>
            </div>
        </main>
    );
}

export default Home;
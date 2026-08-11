import { useSelector, useDispatch } from 'react-redux';
import { nextLevel, startOver } from '../slices/game-slice.js';
import { fetchRandomImages } from '../slices/image-fetch-slice.js';
import { indigo } from '@mui/material/colors';
import {
    Box,
    Button,
    ButtonGroup,
} from '@mui/material';
import styles from '../css/popover.module.css';

export const Popover = () => {
    const dispatch = useDispatch();

    const { level, numberOfImages, theme } = useSelector((state) => state.game);
    const { loading, randomImages } = useSelector((state) => state.randomImages);

    const handleNextLevel = () => {
        dispatch(nextLevel());
    }

    const handleReplay = () => {
        dispatch(fetchRandomImages({ count: numberOfImages, theme }));
    }

    const handleStartOver = () => {
        dispatch(startOver());
    }

    return (
        randomImages !== null && randomImages.length === 0 && loading === false
            ? <Box className={styles.popover}>
                <ButtonGroup
                    color='inherit'
                    style={{ backgroundColor: 'transparent' }}
                    orientation='vertical'
                    fullWidth
                    size='large'
                    variant='contained'
                >
                    <Button
                        style={{ backgroundColor: indigo[500] }}
                        color='inherit'
                        onClick={handleNextLevel}
                    >
                        Next level
                    </Button>
                    <Button
                        style={{ backgroundColor: indigo[50] }}
                        color='inherit'
                        onClick={handleReplay}
                    >
                        Replay
                    </Button>
                    {
                        level > 1
                            ? <Button
                                style={{ backgroundColor: indigo[50] }}
                                color='inherit'
                                onClick={handleStartOver}
                            >
                                Start Over
                            </Button>
                            : null
                    }
                </ButtonGroup>
            </Box>
            : null
    )
}
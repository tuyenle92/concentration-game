import styles from '../css/image.module.css';
import { useState } from 'react';
import back from '../resources/white.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { imageClick, imageUnclick } from '../slices/image-slice.js';
import { CardMedia, Typography, Link } from '@mui/material';

export const Image = ({ author, id, portfolio_url, url, username }) => {
    const [flipped, setFlipped] = useState(false);
    const dispatch = useDispatch();
    const matchFound = useSelector((state) => state.images.matchFound);

    const handleImageClick = () => {
        if (matchFound === null && !flipped) {
            setFlipped((f) => !f);
            dispatch(imageClick({ imageId: id }));
        } else if (matchFound === false) {
            setTimeout(() => {
                setFlipped(() => false);
                dispatch(imageUnclick({ imageId: id }));
            }, 600);
        }
    }

    return (
        <div
            className={styles.container}
            id={id}
            onClick={handleImageClick}
        >
            <div className={`${styles.inner} ${flipped ? styles.flipped : ""}`}>
                <CardMedia
                    alt={id}
                    className={styles.face}
                    component='img'
                    src={url}
                />

                <CardMedia
                    alt={id + ' back'}
                    className={styles.back}
                    component='img'
                    src={back}
                />


            </div>

            {
                flipped
                    ? <Typography
                        align='left'
                        noWrap={false}
                        color='textSecondary'
                        component='div'
                        variant='caption'
                        gutterBottom={false}
                    >
                        Photo by {author} on {
                            portfolio_url === null
                                ? <Link
                                    target='_blank'
                                    variant='inherit'
                                    color='textPrimary'
                                    underline='none'
                                    href={'https://unsplash.com/' + username}
                                >
                                    Unsplash
                                </Link>
                                : <Link
                                    target='_blank'
                                    variant='inheirt'
                                    color='textPrimary'
                                    underline='none'
                                    href={portfolio_url}
                                >
                                    Unsplash
                                </Link>
                        }
                    </Typography>
                    : null
            }
        </div>
    );
};

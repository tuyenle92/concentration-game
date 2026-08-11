import { useDispatch, useSelector } from 'react-redux';
import { Image } from './image.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../css/screen.module.css';
import { useEffect, useRef } from "react";
import { incrementMoveCount } from "../slices/game-slice.js";
import { imageUnclick } from "../slices/image-slice.js";
import { removeImages } from "../slices/image-fetch-slice.js";
import Skeleton from "@mui/material/Skeleton";

export const ImageGroup = () => {
    const dispatch = useDispatch();
    const { error, loading, randomImages } = useSelector((state) => state.randomImages);
    const { firstImageClickId, matchFound, secondImageClickId } = useSelector((state) => state.images);
    const { numberOfImages } = useSelector((state) => state.game);

    const elementRef = useRef(null);

    useEffect(() => {
        if (matchFound === false) {
            elementRef.current.querySelector(`#${CSS.escape(firstImageClickId)}`).click();
            elementRef.current.querySelector(`#${CSS.escape(secondImageClickId)}`).click();
            dispatch(incrementMoveCount());
        } else if (matchFound) {
            dispatch(imageUnclick({ id: firstImageClickId }));
            dispatch(imageUnclick({ id: secondImageClickId }));
            setTimeout(() => {
                dispatch(removeImages({ imageId: firstImageClickId }));
            }, 600)
        }
    }, [matchFound, firstImageClickId, secondImageClickId, dispatch]);


    let cardSkeletonLoading = [];

    for (let i = 0; i < numberOfImages * 2; i++) {
        cardSkeletonLoading.push(<Skeleton animation='wave' key={i} variant='rectangle' width={250} height={250}/>)
    }

    return (
        <div className={styles['image-wrapper']} ref={elementRef}>
            {
                randomImages !== null && loading === false
                    ? <AnimatePresence>
                        {
                            randomImages.flatMap(((((image, index) =>
                                    <motion.div
                                        key={image.id + ' ' + index}
                                        initial={{ opacity: 0, height: 0, y: -20 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: 20 }}
                                        layout
                                        transition={{ duration: 0.3 }}
                                    >

                                        <Image
                                            author={image.author}
                                            id={image.id + ' ' + index}
                                            portfolio_url={image.portfolio_url}
                                            key={index}
                                            username={image.username}
                                            url={image.url}
                                        />
                                    </motion.div>
                            ))))
                        }
                    </AnimatePresence>
                    : (error === null ? cardSkeletonLoading : null)
            }
        </div>
    )
}
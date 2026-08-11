import { configureStore, combineReducers } from '@reduxjs/toolkit';
import imageSlice from './slices/image-slice.js';
import randomImagesSlice from './slices/image-fetch-slice.js';
import gameSlice from './slices/game-slice.js';

export const store = configureStore({
    reducer: combineReducers({
        images: imageSlice,
        game: gameSlice,
        randomImages: randomImagesSlice,
    }),
});
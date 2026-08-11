import { createSlice } from '@reduxjs/toolkit';

const MAX_IMAGE_CLICK = 2;

const imageSlice = createSlice({
    name: 'images',
    initialState: {
        imageClickCount: 0,
        firstImageClickId: null,
        secondImageClickId: null,
        matchFound: null,
    },
    reducers: {
        imageUnclick: (state) => {
            if (state.imageClickCount === 0) {
                return;
            }

            state.imageClickCount--;

            if (state.imageClickCount === 0) {
                state.imageClickCount = 0;
                state.firstImageClickId = null;
                state.secondImageClickId = null;
                state.matchFound = null;
            }
        },
        imageClick: (state, action) => {
            if (state.imageClickCount === MAX_IMAGE_CLICK) {
                return;
            }

            state.imageClickCount++;

            if (state.firstImageClickId === null) {
                state.firstImageClickId = action.payload.imageId;
            } else {
                state.secondImageClickId =  action.payload.imageId;
            }

            if (state.imageClickCount === MAX_IMAGE_CLICK) {
                state.matchFound = state.firstImageClickId.split(' ')[0] === state.secondImageClickId.split(' ')[0];
            }
        }
    }
})

export const { imageClick, imageUnclick } = imageSlice.actions;
export default imageSlice.reducer;
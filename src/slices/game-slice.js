import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        numberOfImages: 4,
        level: 1,
        moveCount: 0, // count the number of mismatch images clicked
        timeToFinish: 0, // time to finish each level in minutes
        theme: 'Vietnam'
    },
    reducers: {
        changeTheme: (state, action) => {
            state.theme = action.payload.theme;
        },
        incrementMoveCount: state => {
            state.moveCount++;
        },
        nextLevel: state => {
            state.numberOfImages++;
            state.level++;
        },
        startOver: state => {
            state.numberOfImages = 4;
            state.level = 1;
            state.moveCount = 0;
            state.timeToFinish = 0;
        }
    }
})

export const {
    nextLevel,
    changeTheme,
    incrementMoveCount,
    startOver  } = gameSlice.actions;
export default gameSlice.reducer;
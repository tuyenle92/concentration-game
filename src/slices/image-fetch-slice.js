import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const randomImagesSlice = createSlice({
    name: "randomImages",
    initialState: {
        loading: false,
        error: null,
        randomImages: null,
    },
    reducers: {
        removeImages: (state, action) => {
            state.randomImages = state.randomImages.filter(image => action.payload.imageId.split(' ')[0] !== image.id);
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomImages.pending, (state) => {
                state.ranomImages = null;
                state.loading = true;
            })
            .addCase(fetchRandomImages.fulfilled, (state, action) => {
                let urls = action.payload.flatMap(image => {
                    return {
                        url: image.urls.small,
                        id: image.id,
                        author: image.user.name,
                        portfolio_url: image.user['portfolio_url'],
                        username: image.user.username
                    }
                });

                urls = [...urls, ...urls];

                for (let i = urls.length - 1; i >= 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [urls[i], urls[j]] = [urls[j], urls[i]];
                }

                state.loading = false;
                state.randomImages = urls;
            })
            .addCase(fetchRandomImages.rejected, (state, action) => {
                state.loading = false;
                state.ranomImages = null;
                state.error = action.error.message;
            });
    },
});

export const fetchRandomImages = createAsyncThunk(
    "randomImages/fetch",
    async args => {
        const { count, theme } = args;
        const accessKey = 'e29d600198486464dfde3a9cee8997c5070b51ebb41a7378a44d9d675994fc6e';
        const response = await axios.get("https://api.unsplash.com/photos/random", {
            headers: {
                'Authorization': 'Client-ID ' + accessKey,
                'Content-Type': 'application/json',
            },
            params: {
                count,
                query: theme
            }
        });

        return response.data;
    },
    {
        condition: (_, { getState }) => {
            const { loading } = getState().randomImages;
            return !loading;
        },
    }
)

export const { removeImages } = randomImagesSlice.actions;
export default randomImagesSlice.reducer;
import { createSelector, createSlice } from "@reduxjs/toolkit"
import { ReduxState, VideoMenu } from "../interface"

const initalVideoMenu: () => VideoMenu = () => {
    return {
        'Movie': [
            'Action',
            'Comedy',
            'Science Fiction',
            'Drama',
            'War',
            'Romance',
            'Horror',
            'Documentary',
            'Adventure',
            'Suspense',
            'Crime',
            'Thriller',
            'Animation',
            'Microfilm',
            'Others',
        ],
        'Animation': [
            'Domestic',
            'Japan',
            'Europe and America',
            'Others',
        ],
        'Series': [
            'Domestic',
            'Hong Kong and Taiwan',
            'Japan and Korea',
            'Europe and America',
            'Others',
        ],
        'Variety show': [

        ]
    }
}

export const videoCategoryMenuSlice = createSlice({
    name: 'videoMenu',
    initialState: initalVideoMenu(),
    reducers: {
        setMenu: (state, action) => {
            Object.assign(state, action.payload)
        }
    }
})

export const { setMenu } = videoCategoryMenuSlice.actions

export const selectVideoMenu = (state: ReduxState) => state.videoMenu

export const selectTopCategory = createSelector(
    selectVideoMenu,
    (state) => {
        let res = []
        for (let top in state){
            res.push(top)
        }
        return res
    }
)

export default videoCategoryMenuSlice.reducer
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'




const initialBlogStoreState = {
    items: {},
    isLoading: false,
    // categories: [
    //     'Fun',
    //     'Beach',
    //     'Nature',
    //     'Other'
    // ]
}

let nextBlogItemID = 0;

const blogReducerSlice = createSlice({
    name: 'blogReducerSlice',
    initialState: initialBlogStoreState,
    reducers: {
        setLoading(state){
            state.isLoading = true;
        },
        bulkAddBlogItems(state, data){
            console.log(88774, data);
            const  items = data.payload
            state.items = {};// immer js takes care of not mutating it
            state.isLoading = false;

            items.forEach(item=>{
                state.items[nextBlogItemID++] = item
            });

        },
        addBlogItem : {
            reducer: (state, payload)=>{
                const {title, contents, categories, id} = payload;
                console.log('addBlogItem', payload)
                const newId = state.items[0].id+1;

                state.items[newId] = {
                    id, 
                    title, 
                    contents,
                    categories
                }
            },
            prepare : (newBlogDetails, stateCategories)=>{
                const {categories} = newBlogDetails;
                // const categoryIDs = [];
                // categories.forEach(category=>{
                //     categoryIDs.push(stateCategories.indexOf(category))
                // })
                return {payload: {
                    ...newBlogDetails, 
                    // id: nextBlogItemID++
                }}
            }
        },
        deleteBlogItem(state, id){
            delete state.items[id]
        }
    }
})

const rootReducer = combineReducers({
    blog: blogReducerSlice.reducer,
    form: formReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export const {
    actions: {
        addBlogItem, 
        deleteBlogItem,
        bulkAddBlogItems,
        setLoading
    }   
} = blogReducerSlice


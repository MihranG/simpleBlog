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
                state.items[item.id] = item
            });

        },
        addBlogItem(state, action){
                const {title, contents, categories, id} = action.payload;
                console.log('addBlogItem', action.payload)

                state.items[id] = {
                    id, 
                    title, 
                    contents,
                    categories
                }
            
        },
        deleteBlogItem(state, action){
            console.log('deleteBlogItem', action.payload.id)
            delete state.items[action.payload.id]
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


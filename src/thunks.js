
import {bulkAddBlogItems, setLoading, addBlogItem, deleteBlogItem} from './store'
const URLBase = 'http://reduxblog.herokuapp.com/api/posts';
const uniqueRandomKey = Math.round(1000*Math.random()) ; 
const URL = `${URLBase}?${uniqueRandomKey}`;
export const fetchItems = ()=>{
    console.log('fetch');
    return function(dispatch, getState){
        return ()=>fetch(URL).then(res=>{
                console.log(88, res, Math.round(1000*Math.random()));
                return res.json()
            }).then(data=>{
                dispatch(bulkAddBlogItems(data));
            
            }).catch(e=>{
                console.error(e)
            })
        }
}





export const postItem = ()=>{
    return function(dispatch){
        return function(data) {
            return fetch(URL,{
                method: 'POST', 
                mode: 'cors', 
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res=>res.json()).then(res=>{
                console.log('post item', res)
                return dispatch(addBlogItem(res))
            }).catch(e=>console.error(e))
        }
    }
}



export const fetchSingleItem = (id)=>{
    return function(dispatch){
        console.log(2, dispatch, id)
            const fetchURL = `${URLBase}/${id}?key=${uniqueRandomKey}` // stex
            console.log(3,id)
            return fetch(fetchURL).then(res=>res.json()).then(res=>{
                console.log('res fetch singleItem', res)
                return dispatch(addBlogItem(res))
               
            }).catch(e=>console.error(e))
        }
    
}

export const deleteItem = (id)=>{
    return function(dispatch){
        console.log(2, dispatch, id)
            const deleteURL = `${URLBase}/${id}?key=${uniqueRandomKey}` // stex
            console.log(3,id)
            return fetch(deleteURL,{
                method: 'DELETE', 
                mode: 'cors', 
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(data=>data.json()).then(res=>{
                console.log('res delete', res)
                dispatch(deleteBlogItem(res))
            }).catch(e=>console.error(e))
        }
    
}

import {bulkAddBlogItems, setLoading} from './store'
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
                console.log('data', data)
                dispatch(bulkAddBlogItems(data));
            
            }).catch(e=>{
                console.error(9,e)
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
            }).then(res=>{
                if(res.ok){
                  return {ok:true,...res.json()}
                }
            }).catch(e=>console.error(e))
        }
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
            }).then(res=>{
                console.log('res delete', res)
                if(res.ok){
                  return {ok:true,...res.json()}
                }
            }).catch(e=>console.error(e))
        }
    
}
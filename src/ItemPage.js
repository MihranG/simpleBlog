import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { deleteItem, fetchSingleItem} from './thunks';
import {addBlogItem} from './store';

const ItemPageDisconnected = ({ 
    fields, 
    deleteHandler, 
    fetchHandler, 
    match, 
    history, 
    addItemToStore})=>{
        const [isLoading, setLoading] = useState(false)
        const [justDeleted, setJustDeleted] = useState(false)
        useEffect(()=>{
            if(!fields && !justDeleted){
                setLoading(true);
                fetchHandler(match.params.id).then(res=>{
                    if(res.payload && res.payload.ok){
                        setLoading(false);
                    }
                })
            }
        },[fields, justDeleted, fetchHandler, match.params.id])

        const handleDelete = () =>{
            setJustDeleted(true);
            deleteHandler(fields.id).then(res=>{
                if(res.payload && res.payload.ok){
                    history.push('/');
                }
            })
        }
        return(
            <div>
                <Link to='/'>
                    {'< Back to Home page'}
                </Link>
                {isLoading  || !fields? <p>Loading, please wait ......</p>:(<>
                    <button onClick={handleDelete}> Delete post </button>
                    <p>Title: {fields.title}</p>
                    <p> Categories: {fields.categories}</p>
                    <div>{fields.content}</div>
                </>)}
            </div>
        )
}

const mapStateToProps = (state, ownProps) =>{
    const id = ownProps.match.params.id;
    return {
        fields: state.blog.items[id],
    }
}

const mapDispatchToProps = (dispatch)=>({
    fetchHandler: (id)=>dispatch(fetchSingleItem(id)),
    deleteHandler: (id)=>dispatch(deleteItem(id)),
    addItemToStore: (fields)=>dispatch(addBlogItem(fields))
})

export const ItemPage = connect(mapStateToProps, mapDispatchToProps)(ItemPageDisconnected)
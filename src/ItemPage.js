import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { deleteItem} from './thunks'

const ItemPageDisconnected = ({title, categories, content, deleteHandler, match})=>{
    const handleDelete = () =>{
        console.log(1, deleteHandler, match)
        deleteHandler(match.params.id).then(res=>{
            this.history.push('/')
        })
    }
    return(
        <div>
            <Link to='/'>
                {'< Back to Home page'}
            </Link>
            <button onClick={handleDelete}> Delete post </button>
            <title>{title}</title>
            <p>{categories}</p>
            <div>{content}</div>
            
        </div>
    )
}

const mapDispatchToProps = (dispatch)=>{
    return{
        deleteHandler: (id)=>dispatch(deleteItem(id))
    }
}

export const ItemPage = connect(null, mapDispatchToProps)(ItemPageDisconnected)
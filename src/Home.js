import React from 'react';
import {connect} from 'react-redux';
import {fetchItems} from './thunks';
import {setLoading} from './store'
import {Link} from 'react-router-dom'

class HomeDisconnected extends React.Component {

    componentDidMount(){
        const {items, setLoading, fetchItems} = this.props
        if(Object.keys(items).length < 5 ){
            setLoading(true);
            fetchItems()
        } 
    }
   

    itemClickHandler = (id)=>() =>{
        this.props.history.push(`/posts/${id}`)
    }
    render(){
    const {isLoading, items } = this.props
    return (isLoading ? <p>Loading...</p> : 
        <>
            <Link to='posts/new' > New Post</Link>
            {Object.keys(items).map((id, index)=>(
                <div key={items[id].id+''+index} data-id={id} className='itemWrapper' onClick={this.itemClickHandler(id)}>
                    <div>{items[id].title}</div>
                    <div style={{marginRight: 0}}>{items[id].categories}</div>
                </div>
            ))}
        </>
    )}
}

const mapStateToProps = (state)=>({
    items: state.blog.items,
    isLoading: state.blog.isLoading,
})

const mapDispatchToProps = (dispatch)=>({
        fetchItems : dispatch(fetchItems()),
        setLoading: loadingState => dispatch(setLoading(loadingState))
    })
export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeDisconnected)
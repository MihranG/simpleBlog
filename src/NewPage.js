import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {addBlogItem} from './store'
import {postItem} from './thunks'

import ('./NewPage.css');
console.log(34345);
class NewPageWithoutForm extends Component{
    handleSubmit = (e)=>{
        e.preventDefault()
        this.props.postItem(this.props.values).then(res=>{
            console.log('res ok', res)

            if(res.ok){
                this.props.dispatch(addBlogItem(this.props.values))
                this.props.history.push('/');
            }
        });
       
    }
    renderInputField = (field)=>{
        const { meta: { touched, error } } = field;
        
        // const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        const isContentInput = field.label === 'Content';
        return(
           <div className="input-wrapper">
           <label htmlFor="Title">{ field.label }</label>

              {isContentInput ? 
                <textarea
                    className="content-field"
                 type={ 'text'}
                 {...field.input} />
              :<input
                 className="input-field"
                 type={ 'text'}
                 {...field.input}
              />}
              <div className="error-message">
                 {touched ? error : ''}
              </div>
           </div>
        )
     }
    render(){

        return (
            <form onSubmit={this.handleSubmit}>
                <Field
                    label="Title"
                    name="title"
                    component = {this.renderInputField}
                />
                <Field
                    label="categories"
                    name="categories"
                    component={ this.renderInputField }
                />
                <Field
                    label="Content"
                    name="content"
                    component={ this.renderInputField }
                />
                <div className="button-wrapper">
                    <button type="submit" className="submit-button" disabled={this.props.isThereValidationErrors} >Submit</button>
                    <Link to="/" className="cancel-button"> Cancel </Link>
                </div>
         </form>
        )
    }
}



const validate = formValues =>{
    const errors = {};
    const {title, categories} = formValues;    
    if(!title){
        errors.title =  "You should provide a Title"
    }
    if(!categories){
        errors.categories =  "You should provide Categories"
    }

    return errors;
}


const mapStateToProps = state=>({
    isThereValidationErrors: state.form.add_item.syncErrors && Object.keys(state.form.add_item.syncErrors).length>0,
    values: state.form.add_item.values
});

const mapDispatchToProps = dispatch =>{
    return {
        postItem : dispatch(postItem())

    }
}

const NewPageWithoutFormConnected = connect(mapStateToProps, mapDispatchToProps)(NewPageWithoutForm)

export const NewPage = reduxForm({
    validate,
    form: 'add_item'
})(NewPageWithoutFormConnected)
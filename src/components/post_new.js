import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  
  onSubmit(values) {
    // this === component
    const { props } = this;
    props.createPost(values, () => {
      props.history.push('/');
    });
  }
  
  renderField(field) {
    // Using destructuring
    const { meta: {touched, error} } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    
    return(
      <div className={className}>
        <label>{field.label}</label>
        <br />
        <input 
          type="text" 
          {...field.input}
        />
        <br />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  render() {

    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field 
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field 
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  // Validade inputs from 'Values'
  if (!values.title) {
    errors.title = "Enter a title!"
  }
  if (!values.categories) {
    errors.categories = "Enter some categories!"
  }
  if (!values.content) {
    errors.content = "Enter some content!"
  }

  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostNewForm'
})(
  connect(null, { createPost })(PostsNew)
);

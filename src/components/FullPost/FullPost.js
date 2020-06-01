import React, { Component } from 'react';

import './FullPost.css';
import Axios from 'axios';

class FullPost extends Component {
    state={
        loadedpost: null
    }
    deletePostHandler = () =>{
        Axios.get('posts/1')
        .then( response =>{
            console.log(response)}
            )
    }
    componentDidUpdate(){
        debugger
        if(this.props.postId){
            if(this.state.loadedpost == null || (this.state.loadedpost != null && this.state.loadedpost.id !== this.props.postId)){
                Axios.get('posts/' + this.props.postId)
                .then( response =>{
                    this.setState({loadedpost : response.data})
                })
            }
        }
       
    }
    render () {
        let _post = <div className="FullPost"><p>Please Select Post</p></div>
        if(this.props.postId){
            _post =<div className="FullPost"><p>Loading...</p></div>
        }
        if(this.state.loadedpost){
            _post = (
                <div className="FullPost">
                    <h1>{this.state.loadedpost.title}</h1>
                    <p>{this.state.loadedpost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
    
            );
        }
      
        return _post;
    }
}

export default FullPost;
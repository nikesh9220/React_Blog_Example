import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import Axios from 'axios'
class Blog extends Component {
    state= {
        posts: [],
        selectedPostId:null,
        error:false
    }
    componentDidMount(){
        Axios.get('posts')
        .then(response =>{
            const post = response.data.slice(0,4)
            const updatedPost = post.map( p =>
                {
                    return {
                        ...p,
                        author:'Nikesh'
                    }
                    
                }
            )
            this.setState({
                posts: updatedPost
            })
        })
        .catch(error =>{
            this.setState({error:true})
        })
    }
    postClickHandler = (postId) =>{
        this.setState({
            selectedPostId:postId
        })
    }
    render () {
        let posts = this.state.posts.map(_post => {
                return <Post   
                        key={_post.id} 
                        title={_post.title} 
                        author={_post.author} 
                        click={() => this.postClickHandler(_post.id)}/>;
            })
        if(this.state.error){
            posts = <p style={{textAlign:'center'}}>There was some error loading the page..</p>
        }
        return (
            <div>
                <section className="Posts">
                   {posts}
                </section>
                <section>
                    <FullPost  postId={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
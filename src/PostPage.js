import React from 'react'
import api from './api/posts';
import { useNavigate } from 'react-router-dom'
import { Link, useParams } from 'react-router-dom'
import { useContext } from 'react'
import DataContext from './context/DataContext'
  const PostPage = () => {
  const {posts, setPosts}=useContext(DataContext);
  const {id}=useParams();
  const post=posts.find(post=> (post.id).toString() ===id);
  const navigate=useNavigate();
  const handleDelete=async (id)=>
  {
    try{
      await api.delete(`/posts/${id}`);
    }catch(err)
    {
      console.log(`Error: ${err.message}`);

    }
    const newPosts=posts.filter(post => post.id!==id);
    setPosts(newPosts);
    navigate('/');
  }
  return (
    <main className='PostPage'>
        <article className='post'>
          {post && 
            <>
              <h2>{post.title}</h2>
              <p className='postDate'>{post.datetime}</p>
              <p className='postBody'>{post.body}</p>
              <Link to={`/edit/${post.id}`}><button className='editButton'>Edit Post</button></Link>
              <button className='deleteButton' onClick={()=>handleDelete(post.id)}>
                  Delete Post
              </button>
              
            </>
          }
          {!post &&
            <>
              <h2>Post Not Found</h2>
              <p>Well That's Disappointing</p>
              <p>
                <Link to ='/'>Visit Our Homepage</Link>
              </p>
            </>

          }
        </article>

      
    </main>
  )
}

export default PostPage
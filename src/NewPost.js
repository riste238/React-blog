import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns'
import api from './api/post.js'
import DataContext from "./context/DataContext";

const NewPost = () => {

  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const { posts, setPosts } = useContext(DataContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd yyyy');
    const newPost = { id, title: postTitle, body: postBody, datetime };

    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];

      setPosts(allPosts);
      setPostTitle('')
      setPostBody('')
      navigate('/')
    }
    catch (err) {
      if (err.response) {
        console.log(err.response);
      } else {
        console.log(err.message);
      }
    }

  }


  return (<main className="NewPost">
    <h2>New Post</h2>
    <form className="newPostForm" onSubmit={handleSubmit}>
      <label htmlFor="postTitle">Post Title</label>
      <input type="text"
        id="postTitle"

        required
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
      />
      <label htmlFor="postBody">Post Body</label>
      <textarea
        id="postbody"
        required
        value={postBody}
        onChange={(e) => setPostBody(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>


  </main>)
}
export default NewPost;
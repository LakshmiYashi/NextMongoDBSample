import { useEffect, useState } from "react";

export default function Demo({ posts }) {
const [ text, setText] = useState('')
const [postsState, setPostsState] = useState([]);
useEffect(() => {
    setPostsState(posts.data);
  }, [posts]);

let handleSubmit = async (e) => {
    console.log("inside submit",postsState )
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      body: JSON.stringify({
        title: text,
      }),
    });
    res = await res.json();
    setPostsState([...postsState, res]);
    setText('')
  };
    console.log("im here",posts);
    return (
    <div>
    <h1>Lets test this</h1>
    <p>My first next js project</p>
    {postsState.map(each => 
     <li key={each._id}>{each.title}</li>)
    }
 <input type="text" value ={text} onChange={(e) => setText(e.target.value)}></input>
 <button type="submit" onClick={handleSubmit}>Add</button>
    </div>
    
    )
}


export async function getServerSideProps(context) {
    let res = await fetch("http://localhost:3000/api/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let posts = await res.json();
  
    return {
      props: { posts },
    };
  }
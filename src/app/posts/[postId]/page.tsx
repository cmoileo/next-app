import axios from 'axios'
import React from 'react'
import {Card, CardFooter, Image} from "@nextui-org/react";

const fetchData = async (postId: string) => {
  const res = await axios.get(`http://localhost:3000/api/posts/${postId}`)
  const responseJson = await res.data.body
  return responseJson
}
const getCategory = async (postId: string) => {
  const res = await axios.get(`http://localhost:3000/api/posts/${postId}`)
  const responseJson = await res.data.body
  const categoryId = responseJson.categoryId
  const res2 = await axios.get(`http://localhost:3000/api/categories/${categoryId}`)
  const responseJson2 = await res2.data.body
  return responseJson2.name
}

export default async function SinglePost({
    params,
    searchQuery
}: {
    params: {
      postId: string
    },
    searchQuery: {
        q: string
    }
}) {
  const post = await fetchData(params.postId)
  const category = await getCategory(params.postId)
  console.log(category)
  return (
    <article className="single-post">
      <h1>{post.title}</h1>
      <p className="category">{category}</p>
      <Image
        alt=""
        className="object-cover"
        height={400}
        src={post.picture}
        width={1280} />
      <p className='content'>{post.content}</p>
    </article>
  )
}

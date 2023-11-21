import axios from 'axios'
import React from 'react'

const fetchData = async (postId: string) => {
  const res = await axios.get(`http://localhost:3000/api/posts/${postId}`)
  const responseJson = await res.data.body
  return responseJson
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
  const postData = await fetchData(params.postId)
  return (
    <div>{postData.content}</div>
  )
}

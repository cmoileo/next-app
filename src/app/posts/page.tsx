import React from 'react'
import { IPost } from '../../types/index'
import axios from 'axios'
import Link from 'next/link'

const fetchData = async () => {
  const res = await axios.get('http://localhost:3000/api/posts')
  const responseJson = await res.data.body
  return responseJson
}

export default async function PostsListPage() {
  const postsList = await fetchData()

  return (
    <div>
      <h2>SSR</h2>
      {postsList.length > 0 && postsList.map((post: IPost) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
      </div>
      ))}
    </div>
  )
}


import React from 'react'
import { IPost } from '../../types/index'
import axios from 'axios'
import Favicon from '../favicon.ico'
import {Card, CardHeader, CardBody, CardFooter, Image, Link, Button} from "@nextui-org/react";

const fetchData = async () => {
  const res = await axios.get('http://localhost:3000/api/posts')
  const responseJson = await res.data.body
  return responseJson
}

export default async function PostsListPage() {
  const postsList = await fetchData()

  return (
    <>
    <h1>Blog</h1>
    <div className='cards-container'>
      {postsList.length > 0 && postsList.map((post: IPost) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <Card
            isFooterBlurred
            radius="lg"
            className="border-none card"
          >
            <Image
              alt=""
              className="object-cover"
              height={400}
              src={post.picture}
              width={300} />
            <CardFooter className="card-footer justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
              <p className="text-tiny text-white">{post.title}</p>
              <p className="color-black text-tiny text-white opacity-50 bg-black/20">
                Voir l'article
              </p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div></>
  )
}


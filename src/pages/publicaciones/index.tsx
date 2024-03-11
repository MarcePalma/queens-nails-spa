import React from 'react'
import Navbar from '@/components/navigation/Navbar'
import PostList from '@/components/posts/PostList'

export default function index() {
  return (
    <section  className="p-24">
      <Navbar/>

      <PostList/>
    </section>
  )
}

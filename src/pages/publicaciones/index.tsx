import React from 'react'
import Navbar from '@/components/navigation/Navbar'
import PostList from '@/components/posts/PostList'
import BackButton from '@/components/buttons/buttons'

export default function index() {
  return (
    <section className='py-24'>
      <Navbar />

      <PostList />
      {/* @ts-ignore */}
      <BackButton path="/" />
    </section>
  )
}

'use client'
import { backendBaseUrl } from '@/components/utils/backendUrl'
import { useSearchParams, useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import AbstractHero from "../../../components/AbstractHero"
import bg_impact from "../../../../public/img/bg-impact.png"
import parse from "html-react-parser"
import Loader from '@/components/Loader'
  interface Blog{
    blogBody: string,
    title: string,
    blogType:string,
    createdAt?:string,
    dateMetaData?:string
    icon: {secure_url: string}
  }
const Page = () => {
  const { id } = useParams()
  const [singleData, setSingleData] = useState<Blog| null>(null)
  const [loading, setLoading] = useState(true)

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendBaseUrl}/blogs/${id}`)
        const data = await res.json()
        const finalData = data.data
        setSingleData(finalData)
        setLoading(false)
      } catch (error) {
        console.log("error is", error)
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const content = `<div>
    News, announcements, insights, and trends on climate.
  </div>`

  if (loading) {
    return (
      // <div className="min-h-screen flex items-center justify-center">
      //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      // </div>
      <Loader />
    )
  }

  if (!singleData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Blog post not found</p>
      </div>
    )
  }

  const formatDate = (dateString?:any) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <>
      <AbstractHero content={content} bg={bg_impact.src} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-6">
          {/* Blog Header */}
          <header className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {singleData.blogType}
              </span>
              <time className="text-gray-500 text-sm">
                {formatDate(singleData?.dateMetaData) ?? formatDate(singleData.createdAt)}
              </time>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              {singleData.title}
            </h1>
          </header>

          {/* Featured Image */}
          {singleData.icon && (
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <img
                src={singleData.icon.secure_url}
                alt={singleData.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {parse(singleData.blogBody)}
            </p>
          </div>
        </article>
      </main>
    </>
  )
}

export default Page
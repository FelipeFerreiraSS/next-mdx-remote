import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import SyntaxHighlighter from 'react-syntax-highlighter'
import Image from 'next/image'

import Button from '../../components/Button'
import YouTube from '../../components/YouTube'

export const getStaticProps = async ({ params: { slug } }) => {
  const markdownWithMeta = fs.readFileSync(path.join('posts',
    slug + '.mdx'), 'utf-8')

  const { data: frontMatter, content } = matter(markdownWithMeta)
  const mdxSource = await serialize(content)

  return {
    props: {
      frontMatter,
      slug,
      mdxSource
    }
  }
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join('posts'))

  const paths = files.map(filename => ({
    params: {
      slug: filename.replace('.mdx', '')
    }
  }))

  return {
    paths,
    fallback: false
  }
}

const PostPage = ({ frontMatter, mdxSource }) => {
  return (
    <div className="mt-4">
      <Image
        src={frontMatter.thumbnailUrl}
        className="img-fluid mt-1 rounded-start"
        alt="thumbnail"
        width={1000}
        height={400}
        objectFit="cover"
      />
      <h1>{frontMatter.title}</h1>
      <p>{frontMatter.date}</p>
      <div>
        {frontMatter.tags.map((item) => (
            <span>{item}</span>
        ))}
      </div>
      <MDXRemote {...mdxSource} components={{ Button, YouTube, SyntaxHighlighter }} />
    </div>
  )
}

export default PostPage
import Image from 'next/image'
import Link from 'next/link'
// import fs from 'fs'
// import path from 'path'
// import matter from 'gray-matter'

import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  // console.log(allPostsData)
  return (
    <div className="mt-5">
      {allPostsData.map((post, index) => (
        <Link href={'/blog/' + post.slug} passHref key={index}>
          <div className="card mb-3 pointer" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <p className="card-text">{post.description}</p>
                  <p className="card-text">
                    <small className="text-muted">{post.date}</small>
                  </p>
                </div>
              </div>
              <div className="col-md-4 m-auto">
                <Image
                  src={post.thumbnailUrl}
                  className="img-fluid mt-1 rounded-start"
                  alt="thumbnail"
                  width={500}
                  height={400}
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

// export const getStaticProps = async () => {
//   const files = fs.readdirSync(path.join('posts'))

//   const posts = files.map(filename => {
//     const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')
//     const { data: frontMatter } = matter(markdownWithMeta)

//     return {
//       frontMatter,
//       slug: filename.split('.')[0]
//     }
//   })

//   return {
//     props: {
//       posts
//     }
//   }
// }

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}
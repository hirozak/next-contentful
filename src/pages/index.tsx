import * as React from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { Entry } from 'contentful';
import { getList } from '@/libs/api/post';
import { IPostFields } from '@/libs/model/post';

interface IProps {
  posts: Entry<IPostFields>[];
}

const IndexPage: React.FC<IProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
      </Head>
      {posts.map((post) => (
        <div key={post.sys.id}>
          <Link href={`/posts/${post.fields.slug}`}>
            <a>{post.fields.title}</a>
          </Link>
        </div>
      ))}
    </>
  );
};

export const getStaticProps: GetStaticProps<IProps> = async () => {
  const posts = await getList();
  return {
    props: {
      posts,
    },
  };
};

export default IndexPage;

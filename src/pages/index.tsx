import * as React from 'react';
import { GetStaticProps } from 'next';
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
        <div>
          <h1>title: {post.fields.title}</h1>
          <p>slug: {post.fields.slug}</p>
          <p>description: {post.fields.description}</p>
          <h3>category: {post.fields.category.fields.name}</h3>
          <span>tags: {post.fields.tags.map((tag) => tag.fields.name)}</span>
          <h1>title: {post.fields.title}</h1>
          <img src={`https:${post.fields.image.fields}`} alt="" />
          <p>{post.fields.content}</p>
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

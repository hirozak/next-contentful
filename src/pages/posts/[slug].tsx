import * as React from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { Entry } from 'contentful';
import { get, getList } from '@/libs/api/post';
import { IPostFields } from '@/libs/model/post';

interface IProps {
  post: Entry<IPostFields>;
}

const IndexPage: React.FC<IProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
      </Head>
      <div>
        <h1>title: {post.fields.title}</h1>
        <p>slug: {post.fields.slug}</p>
        <p>description: {post.fields.description}</p>
        <h3>category: {post.fields.category.fields.name}</h3>
        <span>tags: {post.fields.tags.map((tag) => tag.fields.name)}</span>
        <img src={`https:${post.fields.image.fields}`} alt="" />
        <p>{post.fields.content}</p>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{
  slug: string;
}> = async () => {
  const posts = await getList();
  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.fields.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<IProps> = async (
  context: GetStaticPropsContext<{
    slug: string;
  }>,
) => {
  const post = await get(context.params.slug);
  return {
    props: {
      post,
    },
  };
};

export default IndexPage;

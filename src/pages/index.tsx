import * as React from 'react';
import Head from 'next/head';
import * as Contentful from 'contentful';
import Post from '@/components/Post';

const client = Contentful.createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

const HomePage: React.FC = () => {
  async function fetchEntries() {
    const entries = await client.getEntries();
    if (entries.items) return entries.items;
    // console.log(`Error getting Entries for ${contentType.name}.`)
  }

  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      setPosts([...allPosts]);
    }
    getPosts();
  }, []);

  console.log(posts);

  return (
    <>
      <Head>
        <title>Next.js + Contentful</title>
        <link
          rel="stylesheet"
          href="https://css.zeit.sh/v1.css"
          type="text/css"
        />
      </Head>
      {posts.length > 0
        ? posts.map((p) => (
            <Post
              alt={p.fields.alt}
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
            />
          ))
        : null}
    </>
  );
};

export default HomePage;

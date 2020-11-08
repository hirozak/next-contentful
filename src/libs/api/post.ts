import { Entry } from 'contentful';
import { client } from '@/libs/contentful';
import { IPostFields } from '@/libs/model/post';

export const getList = async (): Promise<Entry<IPostFields>[]> => {
  try {
    const postEntries = await client.getEntries<IPostFields>({
      content_type: 'blogPost',
    });
    return postEntries.items;
  } catch (e) {
    console.log(e);
  }
};

export const get = async (slug: string): Promise<Entry<IPostFields>> => {
  try {
    const postEntries = await client.getEntries<IPostFields>({
      content_type: 'blogPost',
      'fields.slug': slug,
    });
    if (postEntries.items.length === 1) {
      return postEntries.items[0];
    } else {
      throw new Error('page not found');
    }
  } catch (e) {
    console.log(e);
  }
};

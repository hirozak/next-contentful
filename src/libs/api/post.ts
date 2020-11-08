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

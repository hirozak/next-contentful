import { Asset, Entry } from 'contentful';
import { ICategoryFields } from './category';
import { ITagFields } from './tag';

export interface IPostFields {
  title: string;
  slug: string;
  description: string;
  category: Entry<ICategoryFields>;
  tags: Entry<ITagFields>[];
  image: Asset;
  content: string;
}

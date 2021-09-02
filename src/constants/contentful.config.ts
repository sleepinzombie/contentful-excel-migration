import { IContentfulConfig } from '../models/config';

declare var process: {
  env: {
    CONTENTFUL_SPACE: string;
    CONTENTFUL_ACCESS_TOKEN: string;
  };
};

const CONTENTFUL_CONFIG: IContentfulConfig = {
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
};

export { CONTENTFUL_CONFIG };

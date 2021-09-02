import { ContentfulClientApi, createClient } from 'contentful';
import { CONTENTFUL_CONFIG as CONFIG } from '../constants/contentful.config';

class ContentfulService {
  /**
   * Holds an instance of the Contentful client API.
   */
  client: ContentfulClientApi = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
  });
}

export { ContentfulService };

import { ContentfulClientApi, createClient, EntryCollection } from 'contentful';
import { CONTENTFUL_CONFIG as CONFIG } from '../constants/contentful.config';
import { IEntriesOptions } from '../models/contentful';

class ContentfulService {
  /**
   * Holds an instance of the Contentful client API.
   */
  client: ContentfulClientApi = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken,
  });

  /**
   * Get entries based on passed in options.
   * @param options Options for filtering entries.
   * @returns Promise containing fetched entries.
   */
  getEntries = async (
    options: IEntriesOptions
  ): Promise<EntryCollection<unknown>> => {
    this.client.getEntries(options);
    return await this.client.getEntries(options);
  };
}

export { ContentfulService };

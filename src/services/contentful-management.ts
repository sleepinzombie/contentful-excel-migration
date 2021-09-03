import { createClient } from 'contentful-management';
import {
  Collection,
  Entry,
  EntryProps,
  Environment,
  Space,
} from 'contentful-management/dist/typings/export-types';
import { CONTENTFUL_CONFIG as CONFIG } from '../constants/contentful.config';
import { IEntriesOptions } from '../models/contentful';

class ContentfulManagementService {
  /**
   * Instantiate a Contentful Management client.
   */
  client: Promise<Environment> = createClient({
    accessToken: CONFIG.managementAccessToken,
  })
    .getSpace(CONFIG.space)
    .then((space: Space): Promise<Environment> => {
      return space.getEnvironment(CONFIG.environment);
    });

  /**
   * Get entries based on passed in options.
   * @param options Options for filtering entries.
   * @returns Promise containing fetched entries.
   */
  getEntries = async (options: IEntriesOptions) => {
    return this.client.then(
      (
        environment
      ): Promise<Collection<Entry, EntryProps<Record<string, any>>>> => {
        return environment.getEntries(options);
      }
    );
  };
}

export { ContentfulManagementService };

import { createClient } from 'contentful-management';
import {
  Collection,
  Entry,
  EntryProps,
  Environment,
  Space,
} from 'contentful-management/dist/typings/export-types';
import { CONTENTFUL_CONFIG as CONFIG } from '../constants/contentful.config';
import {
  IEntriesOptions,
  IGlobalObject,
  IParentEntry,
  IReferenceEntry,
  IReferenceSystemEntry,
} from '../models/contentful';

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
  getEntries = async (
    options: IEntriesOptions
  ): Promise<Collection<Entry, EntryProps<Record<string, any>>>> => {
    return this.client.then(
      (
        environment: Environment
      ): Promise<Collection<Entry, EntryProps<Record<string, any>>>> => {
        return environment.getEntries(options);
      }
    );
  };

  /**
   * Add a new entry to Contentful.
   * @param contentTypeId The content type ID as defined in Contentful.
   * @param fields Field object that will be passed to contentful
   * @returns Promise containing the newly created entry
   */
  createEntry = async (contentTypeId: string, fields: any): Promise<Entry> => {
    return this.client.then((environment) => {
      return environment.createEntry(contentTypeId, {
        fields: fields,
      });
    });
  };

  /**
   * Build the reference entry object to be used in the parent entry.
   * @param entryId The id of the entry that is going to be referenced.
   * @returns Object to be used when creating the parent entry.
   */
  buildReferenceEntry = async (
    entryId: string
  ): Promise<IReferenceSystemEntry> => {
    const entry: IReferenceSystemEntry = {
      sys: {
        id: entryId,
        linkType: 'Entry',
        type: 'link',
      },
    };
    return entry;
  };

  // TODO Add method documentation when this is over.
  // TODO Add a logic for if refnerence entries has children.
  createEntryWithReference = async (
    parentEntry: IParentEntry,
    referenceEntries: IReferenceEntry[][]
  ): Promise<Entry> => {
    let parentReferencedEntries: any = [];
    for (let i = 0; i < referenceEntries.length; i++) {
      let referencedEntriesIds: IReferenceSystemEntry[] = [];
      for (let j = 0; j < referenceEntries[i].length; j++) {
        const refEntriesList: IReferenceEntry = referenceEntries[i][j];
        const contentTypeId: string = refEntriesList.contentTypeId;
        for (let k = 0; k < refEntriesList.entries.length; k++) {
          const fields: IGlobalObject = { ...refEntriesList.entries[k].fields };
          await this.createEntry(contentTypeId, fields).then(async (entry) => {
            await this.buildReferenceEntry(entry.sys.id).then((entry) => {
              referencedEntriesIds.push(entry);
            });
          });
        }
        if (parentEntry.references) {
          parentReferencedEntries[parentEntry.references[i]] = {
            'en-US': referencedEntriesIds,
          };
        }
      }
    }
    return await this.createEntry(parentEntry.contentTypeId, {
      ...parentEntry.fields,
      ...parentReferencedEntries,
    });
  };
}

export { ContentfulManagementService };

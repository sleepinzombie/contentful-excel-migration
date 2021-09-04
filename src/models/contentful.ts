import { QueryOptions } from 'contentful-management/dist/typings/common-types';

interface IEntriesOptions extends QueryOptions {}

type ReferenceEntryTypes = 'Entry' | 'Asset';

interface ReferenceEntry {
  sys: {
    id: string;
    linkType: ReferenceEntryTypes;
    type: string;
  };
}

export { IEntriesOptions, ReferenceEntry };

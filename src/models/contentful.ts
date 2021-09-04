import { QueryOptions } from 'contentful-management/dist/typings/common-types';

interface IEntriesOptions extends QueryOptions {}

type ReferenceEntryTypes = 'Entry' | 'Asset';

interface IReferenceSystemEntry {
  sys: {
    id: string;
    linkType: ReferenceEntryTypes;
    type: string;
  };
}

interface IParentEntry {
  contentTypeId: string;
  fields: IEntriesOptions;
  references?: string[];
}

interface IReferenceEntry {
  contentTypeId: string;
  entries: QueryOptions[];
  children?: IReferenceEntry[];
}

interface IGlobalObject {
  [key: string]: string;
}

export {
  IEntriesOptions,
  IGlobalObject,
  IReferenceEntry,
  IReferenceSystemEntry,
  IParentEntry,
};

import { ContentfulManagementService } from '../services/contentful-management';

const getEntryById = async (entryId: string) => {
  const client = new ContentfulManagementService();
  const entry = await client.getEntryById(entryId);
  return entry;
};

const buildReferenceEntry = async (entryId: string) => {
  const entry = {
    sys: {
      id: entryId,
      linkType: 'Entry',
      type: 'link',
    },
  };
  return entry;
};

export const insertLinkEntry = async (linkObject: any) => {
  const contentTypeId = 'lessonCopyLink'; // This should be changed to Link

  const client = new ContentfulManagementService();
  return client.createEntry(contentTypeId, linkObject).then((entry) => {
    entry.publish();
    return buildReferenceEntry(entry.sys.id);
  });
};

export const insertSubNavEntry = async (subnavObject: any) => {
  const contentTypeId = 'lessonCopy'; // This should be changed to Subnav
  const client = new ContentfulManagementService();
  return client.createEntry(contentTypeId, subnavObject).then((entry) => {
    entry.publish();
    return buildReferenceEntry(entry.sys.id);
  });
};

export const updateHeaderFooter = async (subnavEntryReference: any) => {
  const entryId = '6wLJGqJC3fm7YYNECc7aZS'; // This should be from the config file

  const headerFooterEntry = await getEntryById(entryId);
  headerFooterEntry.fields.modules['en-US'] = [subnavEntryReference];
  headerFooterEntry.update();
};

// The main call.
export const index = async () => {
  // Step 1: Insert link entry
  // This is an object which is hardcoded.
  // Real data should be fetched from the Excel fullkit sheet.
  const linkObject = {
    title: {
      'en-US': 'Link > Test',
    },
    link: {
      'en-US': 'https://pampers.com',
    },
  };
  const linkEntryReference = await insertLinkEntry(linkObject);

  // // Step 2: Insert subnav entry
  // // This is an object which is hardcoded.
  // // Real data should be fetched from the Excel fullkit sheet.
  const subNavObject = {
    title: {
      'en-US': 'Subnav > Test',
    },
    copy: {
      'en-US': 'This is a simple subnav test.',
    },
    link: {
      'en-US': linkEntryReference,
    },
  };
  const subnavEntryReference = await insertSubNavEntry(subNavObject);

  // Step 3: Insert/Update header footer entry
  updateHeaderFooter(subnavEntryReference);
};

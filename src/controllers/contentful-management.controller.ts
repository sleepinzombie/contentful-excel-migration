import {
  IEntriesOptions,
  IParentEntry,
  IReferenceEntry,
} from '../models/contentful';
import { ContentfulManagementService } from '../services/contentful-management';

const index = () => {
  const client = new ContentfulManagementService();
  const entriesOptions: IEntriesOptions = {
    content_type: 'lesson',
  };
  client.getEntries(entriesOptions).then((response) => {
    console.log(response);
  });
};

const insert = () => {
  const fields = {
    title: {
      'en-US': 'Lesson Test with Express',
    },
  };
  const client = new ContentfulManagementService();
  client.createEntry('lesson', fields).then((entry) => {
    console.log(entry);
  });
};

// TODO: Make a loop for multiple references if there are any. Create a new service method.
const insertReference = () => {
  const lessonCopyFields = {
    title: {
      'en-US': 'Lesson Copy with Express',
    },
  };
  const client = new ContentfulManagementService();
  client.createEntry('lessonCopy', lessonCopyFields).then((entry) => {
    client.buildReferenceEntry(entry.sys.id).then((referenceEntry) => {
      console.log(referenceEntry);
      client
        .createEntry('lesson', {
          title: {
            'en-US': 'Lesson Test with Express',
          },
          modules: {
            'en-US': [referenceEntry],
          },
          courses: {
            'en-US': [referenceEntry],
          },
        })
        .then((entry) => {
          console.log(entry);
        });
    });
  });
};

const createEntryWithReference = () => {
  const client = new ContentfulManagementService();
  const parentEntry: IParentEntry = {
    contentTypeId: 'course',
    fields: {
      title: {
        'en-US': 'Course Test title',
      },
    },
    references: ['lessons', 'categories'],
  };
  const referenceEntries: IReferenceEntry[][] = [
    [
      {
        contentTypeId: 'lesson',
        entries: [
          {
            fields: {
              title: {
                'en-US': 'Lesson Test title 1',
              },
            },
          },
          {
            fields: {
              title: {
                'en-US': 'Lesson Test title 2',
              },
            },
          },
        ],
      },
    ],
    [
      {
        contentTypeId: 'category',
        entries: [
          {
            fields: {
              title: {
                'en-US': 'Category test title 1',
              },
            },
          },
          {
            fields: {
              title: {
                'en-US': 'Category test title 2',
              },
            },
          },
        ],
      },
    ],
  ];
  client
    .createEntryWithReference(parentEntry, referenceEntries)
    .then((entry) => {
      console.log(entry);
    });
};

export { index, insert, insertReference, createEntryWithReference };

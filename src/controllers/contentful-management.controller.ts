import { IEntriesOptions } from '../models/contentful';
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

export { index };

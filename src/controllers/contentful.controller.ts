import { ContentfulService } from '../services/contentful';

const index = () => {
  const client = new ContentfulService();
  client
    .getEntries({
      content_type: 'lesson',
    })
    .then((response) => {
      console.log(response);
    });
};

export { index };

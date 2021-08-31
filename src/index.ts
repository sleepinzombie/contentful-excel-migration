import express from 'express';
import { ContentfulService } from './services/contentful';

const app = express();

app.get('/', (req, res) => {
    let contentful = new ContentfulService();
    contentful.createClient();
    const client = contentful.createClient();
    client.getEntries()
    .then((entries) => {
        console.log('entries', entries)
    })
    res.send('Well done test!');
})

app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
})
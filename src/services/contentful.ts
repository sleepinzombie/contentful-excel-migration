import { ContentfulClientApi, createClient } from 'contentful'
import { CONTENTFUL_CONFIG as CONFIG } from '../constants/contentful.config'

class ContentfulService {
  public client: any = null

  public createClient = () => {
    return (this.client = createClient({
      space: CONFIG.space,
      accessToken: CONFIG.accessToken,
    }))
  }
}

export { ContentfulService }

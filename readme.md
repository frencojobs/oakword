> Starting from 19/08/2020 oakword.tech is **no longer available** as the droplet is destroyed, and the domain is expired. As I stated in my blog post, this is meant to be a toy project serves the purpose of me learning things by trying out. I think I've learned pretty much of what I was intended to. 

# Oakword Dictionary

Oakword is Minimal English - Myanmar dictionary with public API provider based on javascript development stack, using the data from [Ornagai](http://ornagai.com). Note that I am making this thing as an experiment, or as an exercise to help me through learning about NodeJS, databases like redis, and mongoDB used in this website, domain management, and website deployment on digitalocean with NGINX.

## Using API

Since document based nonsql database mongoDB is used here, the term document will be used.
A document in the database looks like -

```typescript
interface document {
  _id: number
  word: string
  type: string
  def: string
  exact?: boolean
  score?: number
}
```

Calling `api.oakword.tech` alone would send you a random document. Noted that the random document would be redis cached for the sake of performance for 1800s which is 12 hours. To show user complete random documents, using own implementations based on the api would be the best. You can modify the amount of random documents you want using the query `size`, like in `api.oakword.tech/?size=10`.

To find a document by ID, use `api.oakword.tech/id/:id`. For example,

```bash
curl https://api.oakword.tech/id/123
```

To find a document by word, use `api.oakword.tech/word/:word`. For instance,

```bash
curl https://api.oakword.tech/word/google
curl https://api.oakword.tech/word/ကြောင်
```

To get the documents of auto complete list of words starting with a word, call `api.oakword.tech/autocomplete/:word`. But you won't get the full documents from autocomplete api call. You will only get partial document with `_id` and `word`, which make sense of course. Please be noted that calling autocomplete would slow your application down because of the resulting load of documents returning in the form of synchronous data. Larger data is best to work with asynchronous streams.

## Libraries

### API Backend

- [dotenv](https://www.npmjs.com/package/dotenv)
- [fastify](https://fastify.io)
- [mongoose](https://mongoosejs.com/)
- [redis](https://redis.io)
- [pm2](https://www.npmjs.com/package/pm2)

### Frontend

- [svelte](https://svelte.dev)
- [rollup](https://rollupjs.org)

## License

MIT © Frenco Jobs

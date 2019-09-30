const path = require("path");
const dotenv = require("dotenv");
const redis = require("redis");
const mongoose = require("mongoose");
const fastify = require("fastify")({
  logger: {
    level: "info",
    file: path.resolve(__dirname, '..', "log/access.log")
  }
});

dotenv.config();
const client = redis.createClient();
const cache_expiration = process.env.CACHE_EXPIRATION;
const DBURL = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.DB_NAME}?authSource=admin`;
mongoose
  .connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => fastify.log.info("MongoDB connected"))
  .catch(err => fastify.log.error(err));
const db = mongoose.connection;

fastify.get("/id/:id", (request, reply) => {
  const q = request.params.id || null;
  const key = `id:${q}`;
  client.get(key, (_, cached) => {
    if (cached) reply.send(JSON.parse(cached));
    else {
      db.collection("dictionary")
        .find({ _id: parseInt(q) })
        .toArray((__, data) => {
          client.setex(key, cache_expiration, JSON.stringify(data));
          reply.send(data);
        });
    }
  });
});

fastify.get("/autocomplete/:word", (request, reply) => {
  const q = request.params.word.replace(/[^A-Za-z0-9]/gi, k => `\\${k}`);
  const key = `autocomplete:${q}`;
  client.get(key, (_, cached) => {
    if (cached) reply.send(JSON.parse(cached));
    else {
      db.collection("dictionary")
        .find({ word: new RegExp(`^${q}`) })
        .project({
          def: false,
          type: false
        })
        .toArray((__, data) => {
          client.setex(key, cache_expiration, JSON.stringify(data));
          reply.send(data);
        });
    }
  });
});

fastify.get("/word/:word", (request, reply) => {
  const q = request.params.word;
  const key = `word:${q}`;
  client.get(key, (_, cached) => {
    if (cached) reply.send(JSON.parse(cached));
    else {
      db.collection("dictionary")
        .find({
          $text: {
            $search: `"${q}"`
          }
        })
        .project({
          score: {
            $meta: "textScore"
          }
        })
        .sort({
          score: {
            $meta: "textScore"
          }
        })
        .map(w => {
          if (w.word === q || w.def === q) return { ...w, exact: true };
          return w;
        })
        .toArray((__, data) => {
          client.setex(key, cache_expiration, JSON.stringify(data));
          reply.send(data);
        });
    }
  });
});

fastify.get("/", (request, reply) => {
  const size = parseInt(request.query.size) || 1;
  const key = `random:${size}`;
  client.get(key, (_, cached) => {
    if (cached) reply.send(JSON.parse(cached));
    else {
      db.collection("dictionary")
        .aggregate([{ $sample: { size: size } }])
        .toArray((__, data) => {
          client.setex(key, cache_expiration, JSON.stringify(data));
          reply.send(data);
        });
    }
  });
});

fastify.listen(process.env.PORT, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`);
});

export const resolvers = {
  Artist: {
    albums: (parent, args, context) => parent.getAlbums()
  },

  Album: {
    artist: (parent, args, context) => parent.getArtist()
  },

  Query: {
    albums: (parent, args, { db }) => db.albums.findAll(),
    artists: (parent, args, { db }) => db.artists.findAll(),
    album: (parent, { id }, { db }) => db.albums.findByPk(id),
    artist: (parent, { id }, { db }) => db.artists.findByPk(id)
  },
  Mutation: {
    createAlbum: async (parent, { name, year, artist_id }, { db }) => {
      return await db.albums.create({ name, year, artist_id })
    },
    updateAlbum: async (parent, { id, name, year, artist_id }, { db }) =>
      await db.albums.update(
        { name, year, artist_id },
        {
          where: { id }
        }
      ),
    deleteAlbum: async (parent, { id }, { db }) =>
      await db.albums.destroy({ where: { id } }),
    createArtist: async (parent, { name, url }, { db }) => {
      return await db.artists.create({ name, url })
    },
    updateArtist: async (parent, { id, name, url }, { db }) =>
      await db.artists.update(
        { name, url },
        {
          where: { id }
        }
      ),
    deleteArtist: async (parent, { id }, { db }) =>
      await db.artists.destroy({ where: { id } })
  }
}
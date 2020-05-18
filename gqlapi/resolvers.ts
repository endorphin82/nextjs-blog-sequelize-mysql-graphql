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
      console.log("++++++++++++", db)
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
      await db.albums.destroy({ where: { id } })
  }
}
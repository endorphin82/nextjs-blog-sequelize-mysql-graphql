export const resolvers = {
  Artist: {
    albums: (parent, args, context, info) => parent.getAlbums()
  },

  Album: {
    artist: (parent, _args, _context) => parent.getArtist()
  },
  Query: {
    albums: (parent, args, { db }) => db.albums.findAll(),
    artists: (parent, args, { db }) => db.artists.findAll(),
    album: (parent, { id }, { db }) => db.albums.findByPk(id),
    artist: (parent, { id }, { db }) => db.artists.findByPk(id)
  },
  Mutation: {
    createAlbum: (parent, { name, year, artist_id }, { db }) =>
      db.albums.create({ name, year, artist_id }),
    updateAlbum: (parent, { id, name, year, artist_id }, { db }) =>
      db.albums.update(
        { name, year },
        {
          where: { id }
        }
      ),
    deleteAlbum: (parent, { id }, { db }) =>
      db.albums.destroy({ where: { id } })
  }
}
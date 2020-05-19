import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"

export const ALL_ARTISTS_QUERY = gql`
    query allArtists {
        artists {
            id
            name
            albums{
                id
                name
                year
            }
        }
    }
`

export default function AlbumsList() {
  const { loading, error, data } = useQuery(ALL_ARTISTS_QUERY)
  if (loading || !data) return <div>Loading</div>
  const { artists } = data

  return (
    <section>
      <h3>Sequelize</h3>
      <ul>
        {artists.map((artist, index) => (
          <li key={artist.id}>
              <h4>{artist.id }. {artist.name}</h4>
              <ul>
                {artist.albums.map((album, index) =>
                 <li key={artist.id+index}>{album.name }{' '}{album.year } </li>
               )}
              </ul>
          </li>
        ))}
      </ul>

      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0; 
        }
      `}</style>

    </section>
  )
}

# Next.js GraphQL Example

Querying:

```graphql
{
  albums {
    id
    name
    artist {
      id
      name
    }
  }
}
```
Results:

```json
{
  "data": {
    "albums": [
      {
        "id": "1",
        "name": "alb1",
        "artist": {
          "id": "1",
          "name": "arts1"
        }
      },
      {
        "id": "2",
        "name": "alb2",
        "artist": {
          "id": "1",
          "name": "arts1"
        }
      }
    ]
  }
}
```

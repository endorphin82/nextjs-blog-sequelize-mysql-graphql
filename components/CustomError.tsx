// pages/404.js
export default function CustomError({ statusCode }: { statusCode: number }) {
  return <h1>{`${statusCode} - Error`}</h1>
}
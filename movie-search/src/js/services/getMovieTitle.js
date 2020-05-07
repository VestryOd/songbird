export default async function getMovieTitle(page) {
  const url = `https://www.omdbapi.com/?s=dream&page=${page}&apikey=424f14e6`;

  const res = await fetch(url);
  const data = await res.json();

  console.log(data.Search[0].Title);

  return data.Search[0].Title;
}

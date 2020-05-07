export default async function getData(query) {
  let response = await fetch(query);
  return await response.json();
}

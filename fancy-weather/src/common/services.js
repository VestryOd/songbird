
// export const getBackgroundUrl = async (place) => {
//   const quarter = getSeason().toLowerCase();
//   const time = getDayTime();
//   const query = `${quarter}, ${time}, ${place || ''}`;
//   const finalQuery = unsplashUrl.replace('{query}', query);
//   console.log(finalQuery);
//   try {
//     const json = await fetch(finalQuery);
//     const backgroundData = await json.json();
//     return backgroundData?.urls?.regular;
//   } catch (error) {
//     console.error(error);
//   }
// }

export const checkTemperature = (temp) => {
  if (temp === 0) {
    return `${temp}°`;
  }
  return temp > 0 ? `+${temp}°` : `-${temp}°`;
}
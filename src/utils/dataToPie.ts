// @ts-nocheck
const dataToPie = (data) => {
  if (Array.isArray(data)){
    return data.map(entry => ({version: entry.version, value: entry.instances}))
  } else {
    // Old style as an object not an array
    return Object.keys(data).map(version => ({version: version, value: data[version].instances}))
  }
}
export default dataToPie;

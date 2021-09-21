export const getUIDv4 = () => {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export const getResultsSkeleton = (style) => {
  let skeleton = [];
  for (let i = 0; i < 6; i++) {
      skeleton.push({id:i, emptyItem: true, itemClasses:style});
  }
  return JSON.parse(JSON.stringify(skeleton));
}

export const getSingleSkeleton = (style) => {
  return JSON.parse(JSON.stringify({id:0, emptyItem: true, itemClasses:style}));
}
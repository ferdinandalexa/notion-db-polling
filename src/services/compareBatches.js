function compareBatches (lastBatch, newBatch) {
  const isEqual = JSON.stringify(lastBatch) !== JSON.stringify(newBatch);
  return isEqual;
}

export default compareBatches;

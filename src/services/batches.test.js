import { describe, expect, it } from 'vitest';
import compareBatches from './compareBatches.js';
import dotenv from 'dotenv';
dotenv.config();

const testingBatches = {
  lastBatch: [
    'ced55927-fc22-4da3-945a-7faec2d6f9eb',
    '4d75ee8f-edf5-4edf-ad4f-b1fe3224c9f2'
  ],
  newBatch: [
    '2b766779-717a-4769-9142-01a90f29a97d',
    '6a7c1225-503d-460c-be52-29466ed07fff'
  ],
  repeatedBatch: [
    'ced55927-fc22-4da3-945a-7faec2d6f9eb',
    '4d75ee8f-edf5-4edf-ad4f-b1fe3224c9f2'
  ],
  emptyBatch: []
};

describe('Testing compareBatch function', () => {
  const { lastBatch, newBatch, repeatedBatch, emptyBatch } = testingBatches;

  it('New batch', () => {
    expect(compareBatches(lastBatch, newBatch)).eq(true);
  });

  it('Repeated batch', () => {
    expect(compareBatches(lastBatch, repeatedBatch)).eq(false);
  });

  it('Empty batch', () => {
    expect(compareBatches(lastBatch, emptyBatch)).eq(true);
  });
});

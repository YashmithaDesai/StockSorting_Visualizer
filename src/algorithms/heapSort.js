export async function heapSort(array, key, speed, updateFn) {
  const n = array.length;
  const metrics = { comparisons: 0, swaps: 0 };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(array, n, i, key, speed, updateFn, metrics);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    metrics.swaps++;
    [array[0], array[i]] = [array[i], array[0]];
    await updateFn(array, [0, i], true, speed);

    // Call max heapify on the reduced heap
    await heapify(array, i, 0, key, speed, updateFn, metrics);
  }

  // Send final metrics
  await updateFn(
    array,
    [],
    false,
    speed,
    { totalComparisons: metrics.comparisons, totalSwaps: metrics.swaps }
  );

  return array;
}

async function heapify(array, n, i, key, speed, updateFn, metrics) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare with left child
  if (left < n) {
    metrics.comparisons++;
    await updateFn(array, [largest, left], false, speed);
    if (array[left][key] > array[largest][key]) {
      largest = left;
    }
  }

  // Compare with right child
  if (right < n) {
    metrics.comparisons++;
    await updateFn(array, [largest, right], false, speed);
    if (array[right][key] > array[largest][key]) {
      largest = right;
    }
  }

  // If largest is not root
  if (largest !== i) {
    metrics.swaps++;
    [array[i], array[largest]] = [array[largest], array[i]];
    await updateFn(array, [i, largest], true, speed);

    // Recursively heapify the affected sub-tree
    await heapify(array, n, largest, key, speed, updateFn, metrics);
  }
}

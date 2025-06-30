const heapSort = async (array, key, speed, updateFn) => {
  let totalComparisons = 0;
  let totalSwaps = 0;

  const heapify = async (n, i) => {
    // Pseudo code step 12: Initialize heapify
    await updateFn(array, [i], false, speed, null, 12);
    
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    // Pseudo code step 13-14: Compare with left child
    if (left < n) {
      totalComparisons++;
      await updateFn(array, [largest, left], false, speed, null, 13);
      if (array[left][key] > array[largest][key]) {
        largest = left;
      }
    }

    // Pseudo code step 15-16: Compare with right child
    if (right < n) {
      totalComparisons++;
      await updateFn(array, [largest, right], false, speed, null, 15);
      if (array[right][key] > array[largest][key]) {
        largest = right;
      }
    }

    // Pseudo code step 17-18: Swap if needed and recursively heapify
    if (largest !== i) {
      await updateFn(array, [i, largest], true, speed, null, 17);
      
      // Swap
      const temp = array[i];
      array[i] = array[largest];
      array[largest] = temp;
      totalSwaps++;

      // Recursively heapify the affected sub-tree
      await heapify(n, largest);
    }
  };

  // Build max heap
  // Pseudo code step 8-9: Build max heap
  await updateFn(array, [], false, speed, null, 8);
  
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    await updateFn(array, [i], false, speed, null, 9);
    await heapify(array.length, i);
  }

  // Extract elements from heap one by one
  // Pseudo code step 3-4: Sort array using heap
  await updateFn(array, [], false, speed, null, 3);
  
  for (let i = array.length - 1; i > 0; i--) {
    // Pseudo code step 4: Swap root with last element
    await updateFn(array, [0, i], true, speed, null, 4);
    
    // Move current root to end
    const temp = array[0];
    array[0] = array[i];
    array[i] = temp;
    totalSwaps++;

    // Pseudo code step 5: Heapify reduced heap
    await updateFn(array, [0], false, speed, null, 5);
    await heapify(i, 0);
  }

  // Final update with metrics
  await updateFn(array, [], false, speed, {
    totalComparisons,
    totalSwaps
  }, 19);

  return array;
};

export default heapSort;

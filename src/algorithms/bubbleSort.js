const bubbleSort = async (array, key, speed, updateFn) => {
  const n = array.length;
  let swapped;

  // Pseudo code step 0: Start outer loop
  await updateFn(array, [], false, speed, null, 0);

  for (let i = 0; i < n - 1; i++) {
    swapped = false;

    // Pseudo code step 1: Start inner loop
    await updateFn(array, [], false, speed, null, 1);

    for (let j = 0; j < n - i - 1; j++) {
      // Pseudo code step 2: Compare adjacent elements
      await updateFn(array, [j, j + 1], false, speed, null, 2);

      if (array[j][key] > array[j + 1][key]) {
        // Pseudo code step 3: Swap if needed
        await updateFn(array, [j, j + 1], true, speed, null, 3);
        
        // Perform swap
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        swapped = true;
      }
    }

    // Pseudo code step 4: End inner loop
    await updateFn(array, [], false, speed, null, 4);

    if (!swapped) {
      break;
    }
  }

  // Pseudo code step 5: End outer loop
  await updateFn(array, [], false, speed, {
    totalComparisons: (n * (n - 1)) / 2,
    totalSwaps: n * (n - 1) / 4 // Average case
  }, 5);

  return array;
};

export default bubbleSort;
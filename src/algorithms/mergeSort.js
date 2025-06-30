const mergeSort = async (array, key, speed, updateFn) => {
  let totalComparisons = 0;
  let totalSwaps = 0;

  const merge = async (left, right) => {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    // Pseudo code step 9: Start merge
    await updateFn(array, [], false, speed, null, 9);

    // Pseudo code step 10-11: Compare and merge while both arrays have elements
    while (leftIndex < left.length && rightIndex < right.length) {
      totalComparisons++;
      await updateFn(array, [leftIndex, right.length + rightIndex], false, speed, null, 11);

      if (left[leftIndex][key] <= right[rightIndex][key]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
        totalSwaps++;
      }
    }

    // Pseudo code step 16: Add remaining elements
    await updateFn(array, [], false, speed, null, 16);
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  };

  const mergeSortHelper = async (arr) => {
    // Base case
    if (arr.length <= 1) {
      // Pseudo code step 1-2: Check array length
      await updateFn(array, [], false, speed, null, 1);
      return arr;
    }

    // Pseudo code step 3-4: Split array
    const middle = Math.floor(arr.length / 2);
    await updateFn(array, [], false, speed, null, 3);

    // Recursively sort left and right halves
    // Pseudo code step 5: Sort left half
    await updateFn(array, arr.slice(0, middle).map(item => array.indexOf(item)), false, speed, null, 5);
    const left = await mergeSortHelper(arr.slice(0, middle));

    // Pseudo code step 6: Sort right half
    await updateFn(array, arr.slice(middle).map(item => array.indexOf(item)), false, speed, null, 6);
    const right = await mergeSortHelper(arr.slice(middle));

    // Merge the sorted halves
    // Pseudo code step 7: Merge halves
    await updateFn(array, [], false, speed, null, 7);
    const merged = await merge(left, right);

    // Update the original array with merged results
    merged.forEach((item, index) => {
      const originalIndex = array.indexOf(item);
      if (originalIndex !== index) {
        array[originalIndex] = array[index];
        array[index] = item;
      }
    });

    return merged;
  };

  await mergeSortHelper([...array]);

  // Final update with metrics
  await updateFn(array, [], false, speed, {
    totalComparisons,
    totalSwaps
  }, 17);

  return array;
};

export default mergeSort;
export async function bubbleSort(array, key, speed, updateFn) {
  const n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight compared elements
      await updateFn(array, [j, j + 1], false, speed);
      
      if (array[j][key] > array[j + 1][key]) {
        // Swap elements
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        // Update with swap animation
        await updateFn(array, [j, j + 1], true, speed);
      }
    }
  }
  // Final update to clear highlights
  await updateFn(array, [], false, speed);
  return array;
}
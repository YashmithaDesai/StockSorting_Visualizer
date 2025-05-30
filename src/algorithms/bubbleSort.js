export async function bubbleSort(array, key, speed, updateFn) {
  const n = array.length;
  let totalComparisons = 0;
  let totalSwaps = 0;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight compared elements and count comparison
      totalComparisons++;
      await updateFn(array, [j, j + 1], false, speed);
      
      if (array[j][key] > array[j + 1][key]) {
        // Swap elements and count swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        totalSwaps++;
        // Update with swap animation
        await updateFn(array, [j, j + 1], true, speed);
      }
    }
  }

  // Final update to clear highlights and show final metrics
  await updateFn(
    array, 
    [], 
    false, 
    speed, 
    { totalComparisons, totalSwaps }
  );
  
  return array;
}
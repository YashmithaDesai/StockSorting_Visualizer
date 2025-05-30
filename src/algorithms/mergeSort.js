export async function mergeSort(array, key, speed, updateFn, start = 0, end = array.length - 1, metrics = { comparisons: 0, swaps: 0 }) {
    if (start >= end) return array;

    const mid = Math.floor((start + end) / 2);
    
    await mergeSort(array, key, speed, updateFn, start, mid, metrics);
    await mergeSort(array, key, speed, updateFn, mid + 1, end, metrics);
    await merge(array, key, speed, updateFn, start, mid, end, metrics);
    
    // On the top-level call, send the final metrics
    if (start === 0 && end === array.length - 1) {
        await updateFn(
            array,
            [],
            false,
            speed,
            { totalComparisons: metrics.comparisons, totalSwaps: metrics.swaps }
        );
    }
    
    return array;
}

async function merge(array, key, speed, updateFn, start, mid, end, metrics) {
    let temp = [];
    let i = start;
    let j = mid + 1;

    while (i <= mid && j <= end) {
        // Highlight the elements being compared and count comparison
        metrics.comparisons++;
        await updateFn(array, [i, j], false, speed);

        if (array[i][key] <= array[j][key]) {
            temp.push(array[i++]);
        } else {
            temp.push(array[j++]);
            metrics.swaps++; // Count as a swap when we take from right array
        }
    }

    while (i <= mid) {
        temp.push(array[i++]);
    }

    while (j <= end) {
        temp.push(array[j++]);
    }

    // Copy back to original array and count each placement as a swap
    for (let k = start; k <= end; k++) {
        metrics.swaps++;
        array[k] = temp[k - start];
        // Show the merge in action
        await updateFn(array, [k], true, speed);
    }
}
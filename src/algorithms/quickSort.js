export async function quickSort(array, key, speed, updateFn, low = 0, high = array.length - 1, metrics = { comparisons: 0, swaps: 0 }) {
    if (low < high) {
        const [pivotIndex, newMetrics] = await partition(array, key, speed, updateFn, low, high, metrics);
        await quickSort(array, key, speed, updateFn, low, pivotIndex - 1, newMetrics);
        await quickSort(array, key, speed, updateFn, pivotIndex + 1, high, newMetrics);
    }

    // On the top-level call, send the final metrics
    if (low === 0 && high === array.length - 1) {
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

async function partition(array, key, speed, updateFn, low, high, metrics) {
    const pivot = array[high][key];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // Highlight the elements being compared and count comparison
        metrics.comparisons++;
        await updateFn(array, [j, high], false, speed);

        if (array[j][key] < pivot) {
            i++;
            // Count swap
            metrics.swaps++;
            [array[i], array[j]] = [array[j], array[i]];
            // Show the swap
            await updateFn(array, [i, j], true, speed);
        }
    }

    // Count final swap
    metrics.swaps++;
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    // Show the final pivot placement
    await updateFn(array, [i + 1, high], true, speed);

    return [i + 1, metrics];
}
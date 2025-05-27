export async function quickSort(array, key, speed, updateFn, low = 0, high = array.length - 1) {
    if (low < high) {
        const pivotIndex = await partition(array, key, speed, updateFn, low, high);
        await quickSort(array, key, speed, updateFn, low, pivotIndex - 1);
        await quickSort(array, key, speed, updateFn, pivotIndex + 1, high);
    }
    return array;
}

async function partition(array, key, speed, updateFn, low, high) {
    const pivot = array[high][key];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        // Highlight the elements being compared
        await updateFn(array, [j, high], false, speed);

        if (array[j][key] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            // Show the swap
            await updateFn(array, [i, j], true, speed);
        }
    }

    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    // Show the final pivot placement
    await updateFn(array, [i + 1, high], true, speed);

    return i + 1;
}
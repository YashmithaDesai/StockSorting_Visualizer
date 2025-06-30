const quickSort = async (array, key, speed, updateFn) => {
    let totalComparisons = 0;
    let totalSwaps = 0;

    const partition = async (low, high) => {
        // Pseudo code step 8: Start partition
        await updateFn(array, [high], false, speed, null, 8);
        
        const pivot = array[high][key];
        let i = low - 1;

        // Pseudo code step 10: Start partition loop
        await updateFn(array, [high], false, speed, null, 10);

        for (let j = low; j < high; j++) {
            totalComparisons++;
            // Pseudo code step 11: Compare with pivot
            await updateFn(array, [j, high], false, speed, null, 11);

            if (array[j][key] <= pivot) {
                i++;
                // Pseudo code step 12-13: Increment i and swap
                await updateFn(array, [i, j], true, speed, null, 12);
                
                const temp = array[i];
                array[i] = array[j];
                array[j] = temp;
                totalSwaps++;
            }
        }

        // Pseudo code step 15: Final partition swap
        await updateFn(array, [i + 1, high], true, speed, null, 15);
        
        const temp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = temp;
        totalSwaps++;

        return i + 1;
    };

    const quickSortHelper = async (low, high) => {
        if (low < high) {
            // Pseudo code step 1-2: Check if partition needed
            await updateFn(array, [low, high], false, speed, null, 1);

            // Pseudo code step 3: Get partition index
            await updateFn(array, [low, high], false, speed, null, 3);
            const pi = await partition(low, high);

            // Pseudo code step 4: Sort left partition
            await updateFn(array, [low, pi - 1], false, speed, null, 4);
            await quickSortHelper(low, pi - 1);

            // Pseudo code step 5: Sort right partition
            await updateFn(array, [pi + 1, high], false, speed, null, 5);
            await quickSortHelper(pi + 1, high);
        }
    };

    await quickSortHelper(0, array.length - 1);

    // Final update with metrics
    await updateFn(array, [], false, speed, {
        totalComparisons,
        totalSwaps
    }, 16);

    return array;
};

export default quickSort;
export async function mergeSort(array, key, speed, updateFn, start = 0, end = array.length - 1) {
    if (start >= end) return array;

    const mid = Math.floor((start + end) / 2);
    
    await mergeSort(array, key, speed, updateFn, start, mid);
    await mergeSort(array, key, speed, updateFn, mid + 1, end);
    await merge(array, key, speed, updateFn, start, mid, end);
    
    return array;
}

async function merge(array, key, speed, updateFn, start, mid, end) {
    let temp = [];
    let i = start;
    let j = mid + 1;

    while (i <= mid && j <= end) {
        // Highlight the elements being compared
        await updateFn(array, [i, j], false, speed);

        if (array[i][key] <= array[j][key]) {
            temp.push(array[i++]);
        } else {
            temp.push(array[j++]);
        }
    }

    while (i <= mid) {
        temp.push(array[i++]);
    }

    while (j <= end) {
        temp.push(array[j++]);
    }

    for (let k = start; k <= end; k++) {
        array[k] = temp[k - start];
        // Show the merge in action
        await updateFn(array, [k], true, speed);
    }
}
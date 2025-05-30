import React from 'react';
import './AlgorithmExplanation.css';

const algorithmInfo = {
  bubble: {
    name: 'Bubble Sort',
    description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    pseudocode: `procedure bubbleSort(A: list of sortable items)
    n = length(A)
    repeat
        swapped = false
        for i = 1 to n-1 inclusive do
            if A[i-1] > A[i] then
                swap(A[i-1], A[i])
                swapped = true
            end if
        end for
    until not swapped
end procedure`
  },
  quick: {
    name: 'Quick Sort',
    description: 'Quick Sort is a divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around it.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    pseudocode: `procedure quickSort(A: list of sortable items, low: int, high: int)
    if low < high then
        pivot = partition(A, low, high)
        quickSort(A, low, pivot - 1)
        quickSort(A, pivot + 1, high)
    end if
end procedure

procedure partition(A: list of sortable items, low: int, high: int)
    pivot = A[high]
    i = low - 1
    for j = low to high - 1 do
        if A[j] ≤ pivot then
            i = i + 1
            swap(A[i], A[j])
        end if
    end for
    swap(A[i + 1], A[high])
    return i + 1
end procedure`
  },
  merge: {
    name: 'Merge Sort',
    description: 'Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    pseudocode: `procedure mergeSort(A: list of sortable items, left: int, right: int)
    if left < right then
        middle = (left + right) / 2
        mergeSort(A, left, middle)
        mergeSort(A, middle + 1, right)
        merge(A, left, middle, right)
    end if
end procedure

procedure merge(A: list, left: int, middle: int, right: int)
    create temporary arrays L and R
    copy A[left..middle] to L
    copy A[middle+1..right] to R
    i = 0, j = 0, k = left
    while i < length(L) and j < length(R) do
        if L[i] <= R[j] then
            A[k] = L[i]
            i = i + 1
        else
            A[k] = R[j]
            j = j + 1
        end if
        k = k + 1
    end while
    copy remaining elements of L and R if any
end procedure`
  },
  heap: {
    name: 'Heap Sort',
    description: 'Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It builds a max-heap and repeatedly extracts the maximum element.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    pseudocode: `procedure heapSort(A: list of sortable items)
    buildMaxHeap(A)
    for i = length(A) to 2 do
        swap(A[1], A[i])
        heapSize = heapSize - 1
        maxHeapify(A, 1)
    end for
end procedure

procedure buildMaxHeap(A: list of sortable items)
    heapSize = length(A)
    for i = length(A)/2 to 1 do
        maxHeapify(A, i)
    end for
end procedure

procedure maxHeapify(A: list of sortable items, i: int)
    left = 2i
    right = 2i + 1
    if left ≤ heapSize and A[left] > A[i] then
        largest = left
    else
        largest = i
    end if
    if right ≤ heapSize and A[right] > A[largest] then
        largest = right
    end if
    if largest ≠ i then
        swap(A[i], A[largest])
        maxHeapify(A, largest)
    end if
end procedure`
  }
};

const AlgorithmExplanation = ({ activeAlgorithm }) => {
  const algorithm = algorithmInfo[activeAlgorithm];

  if (!algorithm) return null;

  return (
    <div className="algorithm-explanation">
      <h2>{algorithm.name}</h2>
      <div className="algorithm-description">
        <p>{algorithm.description}</p>
      </div>
      <div className="complexity-info">
        <h3>Time Complexity</h3>
        <ul>
          <li>Best Case: {algorithm.timeComplexity.best}</li>
          <li>Average Case: {algorithm.timeComplexity.average}</li>
          <li>Worst Case: {algorithm.timeComplexity.worst}</li>
        </ul>
        <h3>Space Complexity</h3>
        <p>{algorithm.spaceComplexity}</p>
      </div>
      <div className="pseudocode">
        <h3>Pseudocode</h3>
        <pre>{algorithm.pseudocode}</pre>
      </div>
    </div>
  );
};

export default AlgorithmExplanation; 
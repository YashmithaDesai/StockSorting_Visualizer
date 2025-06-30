import bubbleSort from './bubbleSort';
import quickSort from './quickSort';
import mergeSort from './mergeSort';
import heapSort from './heapSort';

export const sortingAlgorithms = {
  bubble: bubbleSort,
  quick: quickSort,
  merge: mergeSort,
  heap: heapSort
};

export const algorithmDescriptions = {
  bubble: {
    name: 'Bubble Sort',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: 'O(n²)',
    bestCase: 'O(n)',
    worstCase: 'O(n²)'
  },
  quick: {
    name: 'Quick Sort',
    description: 'A divide-and-conquer algorithm that works by selecting a pivot element and partitioning the array around it.',
    complexity: 'O(n log n)',
    bestCase: 'O(n log n)',
    worstCase: 'O(n²)'
  },
  merge: {
    name: 'Merge Sort',
    description: 'A divide-and-conquer algorithm that divides the array into smaller subarrays, sorts them, and then merges them back together.',
    complexity: 'O(n log n)',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)'
  },
  heap: {
    name: 'Heap Sort',
    description: 'A comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and then repeatedly extracts the maximum element.',
    complexity: 'O(n log n)',
    bestCase: 'O(n log n)',
    worstCase: 'O(n log n)'
  }
};
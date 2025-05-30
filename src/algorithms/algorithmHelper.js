import { bubbleSort } from './bubbleSort';
import { mergeSort } from './mergeSort';
import { quickSort } from './quickSort';
import { heapSort } from './heapSort';

export const sortingAlgorithms = {
  bubble: bubbleSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort
};

export const algorithmDescriptions = {
  bubble: {
    name: "Bubble Sort",
    complexity: "O(n²)",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order."
  },
  merge: {
    name: "Merge Sort",
    complexity: "O(n log n)",
    description: "Divides the unsorted list into n sublists, each containing one element, then repeatedly merges sublists to produce new sorted sublists."
  },
  quick: {
    name: "Quick Sort",
    complexity: "O(n log n) average, O(n²) worst",
    description: "Picks an element as pivot and partitions the array around the pivot, placing smaller elements before and larger after."
  },
  heap: {
    name: "Heap Sort",
    complexity: "O(n log n)",
    description: "Builds a max heap from the data and repeatedly extracts the maximum element, maintaining the heap property throughout."
  }
};
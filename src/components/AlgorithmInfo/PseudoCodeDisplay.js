import React from 'react';

const algorithmPseudoCode = {
  bubble: [
    "for i from 0 to array.length - 1",
    "  for j from 0 to array.length - i - 1",
    "    if array[j] > array[j + 1]",
    "      swap array[j] and array[j + 1]",
    "  end for",
    "end for"
  ],
  quick: [
    "function quickSort(array, low, high)",
    "  if low < high",
    "    pivot = partition(array, low, high)",
    "    quickSort(array, low, pivot - 1)",
    "    quickSort(array, pivot + 1, high)",
    "  end if",
    "",
    "function partition(array, low, high)",
    "  pivot = array[high]",
    "  i = low - 1",
    "  for j from low to high - 1",
    "    if array[j] <= pivot",
    "      i = i + 1",
    "      swap array[i] and array[j]",
    "  end for",
    "  swap array[i + 1] and array[high]",
    "  return i + 1"
  ],
  merge: [
    "function mergeSort(array)",
    "  if array.length <= 1",
    "    return array",
    "  middle = array.length / 2",
    "  left = mergeSort(array[0...middle])",
    "  right = mergeSort(array[middle...end])",
    "  return merge(left, right)",
    "",
    "function merge(left, right)",
    "  result = []",
    "  while left.length > 0 and right.length > 0",
    "    if left[0] <= right[0]",
    "      result.push(left.shift())",
    "    else",
    "      result.push(right.shift())",
    "  end while",
    "  return result + remaining left + remaining right"
  ],
  heap: [
    "function heapSort(array)",
    "  buildMaxHeap(array)",
    "  for i from array.length - 1 to 0",
    "    swap array[0] and array[i]",
    "    heapify(array, 0, i)",
    "  end for",
    "",
    "function buildMaxHeap(array)",
    "  for i from (array.length / 2) - 1 to 0",
    "    heapify(array, i, array.length)",
    "  end for",
    "",
    "function heapify(array, i, size)",
    "  largest = i",
    "  left = 2 * i + 1",
    "  right = 2 * i + 2",
    "  if left < size and array[left] > array[largest]",
    "    largest = left",
    "  if right < size and array[right] > array[largest]",
    "    largest = right",
    "  if largest != i",
    "    swap array[i] and array[largest]",
    "    heapify(array, largest, size)"
  ]
};

const PseudoCodeDisplay = ({ algorithm, currentStep }) => {
  const pseudoCode = algorithmPseudoCode[algorithm] || [];
  
  return (
    <div className="pseudo-code-display">
      <h4>Pseudo Code</h4>
      <pre className="pseudo-code">
        {pseudoCode.map((line, index) => (
          <div
            key={index}
            className={`code-line ${currentStep === index ? 'current-step' : ''}`}
          >
            {line}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default PseudoCodeDisplay; 
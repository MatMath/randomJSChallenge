/**
 * Sort an input of inputs using the native sort function
 * @param input
 * @returns {Array}
 */
function native(input, compare) {
  return input.sort(compare);
}

function swap(input, i, j) {
  const temp = input[i];
  // eslint-disable-next-line no-param-reassign
  input[i] = input[j];
  // eslint-disable-next-line no-param-reassign
  input[j] = temp;
  return input;
}

function partition(input, pivot, left, right) {
  let partitionIndex = left;
  // loops through the array from left to right
  for (let i = left; i < right; i++) {
    // if the value at left is too big, move it over one
    if (input[i] < input[pivot]) {
      swap(input, i, partitionIndex);
      partitionIndex++;
    }
  }

  swap(input, partitionIndex, pivot);
  return partitionIndex;
}

function qSort(input, left, right) {
  if (left < right) {
    const pivot = right;
    const partitionIndex = partition(input, pivot, left, right);

    qSort(input, left, partitionIndex - 1);
    qSort(input, partitionIndex + 1, right);
  }

  return input;
}

/**
 * Sort an input of inputs using the quicksort algorithm
 * @param input
 * @returns {Array}
 */
function quicksort(input, compare) {
  return qSort(input, 0, input.length - 1);
};

module.exports = {
  native,
  quicksort,
  partition,
  swap,
};
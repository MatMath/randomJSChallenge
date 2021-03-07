// https://leetcode.com/problems/longest-consecutive-sequence/
// Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

// Example 1:

// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

// Example 2:
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9

// Dumb option: Sort & loop trough
// Maybe smarter option: see if we have the element previous or after in a table.
// Current: List the boundry and return early if we are part of a group.

/* RESULT:  
  * Runtime: 88 ms, faster than 81.48% of TypeScript online submissions for Longest Consecutive Sequence.
  * Memory Usage: 41.6 MB, less than 29.63% of TypeScript online submissions for Longest Consecutive Sequence.
*/

export const findLongestSequenceInArray = (input: number[]): number => {
  if (input.length === 0) return 0
  let maxSequence = 0;
  const boundList: Bound[] = [[input[0], input[0]]];
  for (const value of input) {
    maxSequence = upperLowerBoundMatcher({ boundList, value, maxSequence })
  }
  return maxSequence + 1;
}

type high = number;
type low = number;
export type Bound = [low, high];
interface UpperLowerBoundMatcher {
  boundList: Bound[],
  value: number,
  maxSequence: number,
}
export const upperLowerBoundMatcher = (props: UpperLowerBoundMatcher):number => {
  const { boundList, value, maxSequence } = props
  for (let i = 0; i < boundList.length; i++) {
    const item = boundList[i];
    if (value === item[0] || value === item[1] || (value > item[0] && value < item[1])) {
      return maxSequence;
    }
    if (value + 1 === item[0]) {
      item[0] = value; // change low limit
      return Math.max(maxSequence, item[1] - item[0]);
    }
    if (value - 1 === item[1]) {
      item[1] = value; // change high limit
      if (boundList[i + 1] && shouldWeMergeBothItem(item, boundList[i + 1])) {
        // Merge the 2 into a replacement of low-high combination
        boundList.splice(i, 2, [item[0], boundList[i + 1][1]])
      }
      return Math.max(maxSequence, boundList[i][1] - boundList[i][0]);
    }
    if (value < item[1]) {
      // To keep the boundList sorted
      boundList.splice(i, 0, [value, value])
      return maxSequence;
    }
  }
  boundList.push([value, value]);
  return maxSequence;

}

const shouldWeMergeBothItem = (current: Bound, next: Bound): boolean => {
  return (current[1] === next[0] || current[1] + 1 === next[0])
}
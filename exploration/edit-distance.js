/**
 *
 *
 * @param {*} source the source string
 * @param {*} target output string to be transformed to
 * @return {*}
 */
function editDistance(source, target) {
  const m = source.length;
  const n = target.length;

  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Initialize the first row and column of the DP table
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i; // Deletion
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j; // Insertion
  }

  // Populate the DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const insertion = dp[i][j - 1] + 1;
      const deletion = dp[i - 1][j] + 1;
      const substitution =
        dp[i - 1][j - 1] + (source[i - 1] !== target[j - 1] ? 1 : 0);
      dp[i][j] = Math.min(insertion, deletion, substitution);
    }
  }

  // Retrieve the minimum edit distance
  const distance = dp[m][n];

  // Trace back the operations to obtain the steps to transform the source to the target
  const operations = [];
  let updatedWord = source;
  let i = m;
  let j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && source[i - 1] === target[j - 1]) {
      // Characters match, no operation needed
      i--;
      j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      // Deletion
      operations.push(`Delete ${source[i - 1]}`);
      updatedWord = updatedWord.slice(0, i - 1) + updatedWord.slice(i);
      i--;
    } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
      // Insertion
      operations.push(`Insert ${target[j - 1]}`);
      updatedWord =
        updatedWord.slice(0, i) + target[j - 1] + updatedWord.slice(i);
      j--;
    } else {
      // Substitution
      operations.push(`Substitute ${source[i - 1]} with ${target[j - 1]}`);
      updatedWord =
        updatedWord.slice(0, i - 1) + target[j - 1] + updatedWord.slice(i);
      i--;
      j--;
    }
  }
  operations.reverse();

  return {
    source: source, // the source string
    distance: distance, // the minimum edit distance between the source and target string
    operations: operations, // an array of strings representing the operations to transform  the `source` string to the `target` string
    updatedWord: updatedWord, // the transformed `source` string after applying the operations
  };
}

// Usage Example:
const result = editDistance("kitten", "sitting");
console.log(`Default Word: ${result.source}, Target Word: sitting`);
console.log(`Edit Distance: ${result.distance}`);
console.log(`Operations: ${result.operations.join(", ")}`);
console.log(`Updated Word: ${result.updatedWord}`);

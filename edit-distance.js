/**
 * Simplest Implementation of Edit Distance Algorithm
 * @param {*} source
 * @param {*} target
 * @returns
 */
// const str1 = "hitting";
// const str2 = "kitten";
// const levenshteinDistance = (str1 = "", str2 = "") => {
//   const track = Array(str2.length + 1)
//     .fill(null)
//     .map(() => Array(str1.length + 1).fill(null));
//   for (let i = 0; i <= str1.length; i += 1) {
//     track[0][i] = i;
//   }
//   for (let j = 0; j <= str2.length; j += 1) {
//     track[j][0] = j;
//   }
//   for (let j = 1; j <= str2.length; j += 1) {
//     for (let i = 1; i <= str1.length; i += 1) {
//       const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
//       track[j][i] = Math.min(
//         track[j][i - 1] + 1, // deletion
//         track[j - 1][i] + 1, // insertion
//         track[j - 1][i - 1] + indicator // substitution
//       );
//     }
//   }
//   return track[str2.length][str1.length];
// };
// console.log(levenshteinDistance(str1, str2));

// Output: 3

// function editDistance(source, target) {
//   const m = source.length;
//   const n = target.length;

//   const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

//   // Initialize the first row and column of the DP table
//   for (let i = 0; i <= m; i++) {
//     dp[i][0] = i; // Deletion
//   }
//   for (let j = 0; j <= n; j++) {
//     dp[0][j] = j; // Insertion
//   }

//   // Populate the DP table
//   for (let i = 1; i <= m; i++) {
//     for (let j = 1; j <= n; j++) {
//       const insertion = dp[i][j - 1] + 1;
//       const deletion = dp[i - 1][j] + 1;
//       const substitution =
//         dp[i - 1][j - 1] + (source[i - 1] !== target[j - 1] ? 1 : 0);
//       dp[i][j] = Math.min(insertion, deletion, substitution);
//     }
//   }

//   // Retrieve the minimum edit distance
//   const distance = dp[m][n];

//   // Trace back the operations to obtain the steps to transform the source to the target
//   const operations = [];
//   let i = m;
//   let j = n;
//   while (i > 0 || j > 0) {
//     if (i > 0 && j > 0 && source[i - 1] === target[j - 1]) {
//       // Characters match, no operation needed
//       i--;
//       j--;
//     } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
//       // Deletion
//       operations.push(`Delete ${source[i - 1]}`);
//       i--;
//     } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
//       // Insertion
//       operations.push(`Insert ${target[j - 1]}`);
//       j--;
//     } else {
//       // Substitution
//       operations.push(`Substitute ${source[i - 1]} with ${target[j - 1]}`);
//       i--;
//       j--;
//     }
//   }
//   operations.reverse();

//   return {
//     distance: distance,
//     operations: operations,
//   };
// }

// // Usage Example:
// const result = editDistance("kitten", "sitting");
// console.log(`Edit Distance: ${result.distance}`);
// console.log(`Operations: ${result.operations.join(", ")}`);

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
    source: source,
    distance: distance,
    operations: operations,
    updatedWord: updatedWord,
  };
}

// Usage Example:
const result = editDistance("sunday", "saturday");
console.log(`Default Word: ${result.source}, Target Word: sitting`);
console.log(`Edit Distance: ${result.distance}`);
console.log(`Operations: ${result.operations.join(", ")}`);
console.log(`Updated Word: ${result.updatedWord}`);

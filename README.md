# ✏️ [YouDoSudoku API](https://www.youdosudoku.com)

A REST API that allows you to generate Sudoku puzzles of varying difficulties.

## ⚡️ Technologies
[![image](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![image](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![image](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![image](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

## 🚀 API
As of right now there is one API route [`https://www.youdosudoku.com/api/`](https://www.youdosudoku.com/api/) and fetching from this URL will return one of over 200 billion pre-generated puzzles stored in the YouDoSudoku database.

By default the JSON response will contain a string representation of an easy puzzle and a string representation of the corresponding solution. However, you can alter your response format by sending a POST request. You can specify what puzzle difficulty you want, whether or not you want a solution, and whether you want a string representation or an array representation of your puzzle.

## 💭 Process
I started by trying to find a fast way to generate Sudoku puzzles. After researching Sudoku generation, I learned that constructing easy and medium puzzles was a relatively fast procedure, but making hard puzzles could take anywhere from a fraction of a second to twenty seconds.

So I decided to pre-generate "banks" of puzzles. There are three of these banks in the database, one for each difficulty, and each bank contains 50,000 unique puzzles alongside their corresponding solutions. When a developer sends a request for a puzzle, they receive a randomly selected puzzle from the puzzle banks.

But that’s not all! To decrease the likelihood of ever seeing the exact same puzzle twice, each puzzle is represented in the database by its corresponding increasing order permutation (i.e. the first number seen in the puzzle is 1, the second number seen is 2, etc.). Before sharing the puzzle with the developer, all values are changed according to a randomly generated permutation (i.e. all 1s become 9s, all 2s become 4s, etc.), and the puzzle is rotated 90º between zero and three times. The process of switching values according to a randomly generated permutation and rotation by 90º some number between 0 and 3 times yields 1,451,520 puzzles per puzzle in the bank. Therefore, the 150,000 unique puzzles in the database effectively become over 200 billion puzzles.

*(Note: It has been shown that if two puzzles A and B are not isometric then no amount of permuting and/or rotating will make A and B isometric.)*

## 🌪️ Challenges
Filling the puzzle banks with pre-generated puzzles was the hardest step, specifically because finding a satisfactory Sudoku generation algorithm that guaranteed unique solutions was important. I would like to thank [mfgravesjr](https://github.com/mfgravesjr/finished-projects/tree/master/SudokuGridGenerator) for sharing an algorithm that creates valid Sudoku solutions. Using that algorithm as a starting point, I was able to generate puzzles and then iteratively remove values, while preserving the solution's uniqueness, based on the desired difficulty.

## 🤔 Improvements
Adding more API routes to go beyond puzzle generation is something I would like to do in the future. I haven’t looked into solving algorithms but if there was a sufficiently fast algorithm I would love to offer puzzle solving as well.

## 📷 Images
![YDS API Light Theme](/public/yds-light.png)

![YDS API Dark Theme](/public/yds-dark.png)

/**
 * A mapping of programming languages to their corresponding Tailwind CSS background color classes
 * @constant
 * @type {Record<string, string>}
 * @description Used to display colored dots next to repository languages in the repository list
 * @example
 * languageColors['JavaScript'] // returns 'bg-yellow-300'
 * languageColors['TypeScript'] // returns 'bg-blue-500'
 */
export const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-300',
  TypeScript: 'bg-blue-500',
  Python: 'bg-green-500',
  Java: 'bg-red-500',
  'C++': 'bg-pink-500',
  Ruby: 'bg-red-600',
  PHP: 'bg-purple-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-500',
};

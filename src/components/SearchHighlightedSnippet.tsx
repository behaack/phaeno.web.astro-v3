import type { JSX } from "react";

export interface ISearchResult {
  snippet: string;
  searchStr: string; // this can be ignored or used to style matches
}

function HighlightedSnippet({ snippet }: ISearchResult) {
  const regex = /\{\{(.*?)\}\}/g;
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(snippet)) !== null) {
    // Push text before match
    if (match.index > lastIndex) {
      parts.push(snippet.slice(lastIndex, match.index));
    }

    // Push highlighted match
    parts.push(
      <mark key={match.index} className="bg-yellow-300">
        {match[1]}
      </mark>
    );

    lastIndex = regex.lastIndex;
  }

  // Push the remaining text
  if (lastIndex < snippet.length) {
    parts.push(snippet.slice(lastIndex));
  }

  return <span className="w-full">{parts}</span>;
}

export default HighlightedSnippet;
import type { articletypes, webtypes } from '@/assets/docTypes';
import { useMemo } from 'react';
import { BsFiletypeHtml } from "react-icons/bs";
import SearchHighlightedSnippet from './SearchHighlightedSnippet';

export interface ISearchItem {
  id: string;
  url: string;
  pageTitle: string;
  anchor: string;
  anchorTitle: string;
  description: string;
  documentType: webtypes | articletypes;
  snippet: string;
  count: number;
  score: number;
}

export interface IProps {
  list: ISearchItem[];
  index: number;
  item: ISearchItem;
  searchStr: string;
  active: boolean;
  linkRef: (node: HTMLAnchorElement | null) => void;
  optionId: string;
}

export default function SearchItem({ list, index, item, searchStr, active, linkRef, optionId }: IProps) {
  const isHeader = useMemo(() => {
    if (index === 0) return true;
    return list[index - 1].pageTitle !== list[index].pageTitle;
  }, [index, list]);

  const header = useMemo(() => (
    <li className="bg-[#789946] text-white p-2">
      <div className="flex gap-2 items-center">
        <BsFiletypeHtml size={16} />
        <h3 className="p-0 m-0 text-sm text-white font-semibold inline-flex items-center gap-2">
          {item.pageTitle}
        </h3>
      </div>
    </li>
  ), [item.pageTitle]);

  const link = useMemo(() => (
    <li
      role="option"
      aria-selected={active}
      id={optionId}
      className={`link-item py-1 hover:bg-amber-50 ${active ? 'bg-gray-100' : ''}`}
    >
      <a
        href={item.url}
        ref={linkRef}
        className="block"
        tabIndex={-1}
      >
        <div className="pl-7 flex items-center gap-2">
          <span>-</span>
          <div>
            <div className="flex items-center gap-2">
              <div className="p-0 m-0 text-sm font-semibold inline-flex items-center gap-2">
                <div>{item.anchorTitle}</div>
              </div>
              <div className="text-[8px] bg-gray-100 max-w-fit py-1 px-2 rounded-lg font-bold">
                Matches: {item.count}
              </div>
            </div>
            <div className="text-[10px]">
              <SearchHighlightedSnippet text={item.snippet} searchStr={searchStr} />
            </div>
          </div>
        </div>
      </a>
    </li>
  ), [item, searchStr, active, linkRef, optionId]);

  return (
    <>
      {isHeader && header}
      {link}
    </>
  );
}
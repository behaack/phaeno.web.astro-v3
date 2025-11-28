import type { articletypes, webtypes } from '@/assets/docTypes';
import { useMemo, useRef, useState } from 'react';
import { BsFiletypeHtml } from "react-icons/bs";
import HighlightedSnippet from './SearchHighlightedSnippet';

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
}


export default function SearchItem({ list, index, item, searchStr }: IProps) {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const i = 0;
  
  const isHeader = useMemo(() => {
    console.log(item, index)
    if (index === 0) { return true; }
    return (list[index - 1].pageTitle !== list[index].pageTitle);
  }, [index])

  const itemPageTitle = (item: ISearchItem): string => {
    return item.pageTitle.split(' | ')[0];
  }
  
  const header = useMemo(() => {
    return (
      <li className="bg-[#789946] text-white p-2">
        <div className="flex gap-2 items-center">
          <BsFiletypeHtml size={16} /> 
          <h3 
            className="p-0 m-0 text-sm text-white font-semibold inline-flex items-center gap-2"
          >
            { item.pageTitle }
          </h3>
        </div>
      </li>
    )
  }, [index])

  const link = useMemo(() => {
    return (
      <li className="pl-7">
        <div className="flex items-center gap-2">
          <span>-</span>
          <a href={item.url}>
            <div>
              <h3 className="p-0 m-0 text-sm font-semibold inline-flex items-center gap-2">
                <div>{ item.anchorTitle }</div>
              </h3>
              <div className="text-[10px]">
                <HighlightedSnippet snippet={item.snippet} searchStr={searchStr} />
              </div>
            </div>
          </a>
        </div>
      </li>
    )
  }, [index])

  return (
    <div>
    {isHeader 
      ? <>{ header }{ link }</>
      : <>{ link }</>
    }
    </div>
    // <li
    //   key={item.id}
    //   role="option"
    //   aria-selected={activeIndex === i}
    //   className={`p-2 m-0 ${activeIndex === i ? 'bg-gray-100' : ''}`}
    // >
      /* <a
        href={item.url}
        className="block hover:bg-gray-50 transition"
        ref={(el) => {
          if (el) resultRefs.current[i] = el;
        }}
      >
        <h3 className="p-0 m-0 text-sm font-semibold inline-flex items-center gap-2">
          <span className="text-[10px] font-bold">
            <BsFiletypeHtml size={16} /> 
          </span>
          <span>{item.anchorTitle || itemPageTitle(item)}</span>
        </h3>
        {item.anchorTitle && (
          <p className="text-xs text-gray-500 mt-1">In: {itemPageTitle(item)}</p>
        )}
        <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
          <HighlightedSnippet snippet={item.snippet} searchStr={searchStr} />
        </div>
        <div className="mt-1 text-[8px] bg-gray-100 max-w-fit py-1 px-2 rounded-lg font-bold">
          Matches: {item.count}
        </div>
      </a> */
    // </li>
  );
}
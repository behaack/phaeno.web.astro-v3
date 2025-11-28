import type { articletypes, webtypes } from '@/assets/docTypes';
import { useEffect, useRef, useState } from 'react';
import { FaMagnifyingGlass, FaX } from 'react-icons/fa6';
import { BsFiletypeHtml } from "react-icons/bs";
import SearchHighlightedSnippet from './SearchHighlightedSnippet';
import SearchItem from './SearchItem';

export interface ISearchResult {
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

export default function Search() {
  const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;
  const isFirstRender = useRef(true);
  const [open, setOpen] = useState(false);
  const [searchStr, setSearchStr] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [searchList, setSearchList] = useState<ISearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [ariaMessage, setAriaMessage] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const resultRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchStr.trim());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchStr]);

  const toggleSearch = () => {
    setOpen((prev) => !prev);
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!open && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const html = document.documentElement;
    const originalOverflow = html.style.overflow;
    html.style.overflow = open ? 'hidden' : originalOverflow;
    return () => {
      html.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    const focusableSelectors = [
      'a[href]',
      'button',
      'input',
      'textarea',
      'select',
      '[tabindex]:not([tabindex="-1"])',
    ];

    const trapFocus = (e: KeyboardEvent) => {
      if (!modalRef.current || e.key !== 'Tab') return;
      const focusables = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(focusableSelectors.join(',')),
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    if (open) document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [open]);

  useEffect(() => {
    setSearchStr('');
    setSearchList([]);
    setActiveIndex(-1);
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, searchList.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && activeIndex >= 0 && resultRefs.current[activeIndex]) {
        resultRefs.current[activeIndex]?.click();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, searchList]);

  useEffect(() => {
    const container = modalRef.current?.querySelector('.overflow-y-auto');
    const target = resultRefs.current[activeIndex];

    if (container && target) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const extraOffset = 8;

      if (targetRect.top < containerRect.top) {
        container.scrollTop -= containerRect.top - targetRect.top + extraOffset;
      } else if (targetRect.bottom > containerRect.bottom) {
        container.scrollTop += targetRect.bottom - containerRect.bottom + extraOffset;
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!(debouncedSearch.length >= 3)) {
      setSearchList([]);
      return;
    }
    const controller = new AbortController();
    const fetchResults = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}website/searchpages?search=${encodeURIComponent(searchStr)}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
          },
        );
        if (!res.ok) {
          let message = `Request failed (${res.status}).`;
          try {
            const detail = await res.json();
            if (detail?.message) message = detail.message;
          } catch {}
          if (res.status === 500)
            message = 'Whoops – something went wrong on our side. Please try again.';
          throw new Error(message);
        }
        const data = await res.json();
        setSearchList(data || []);
        setAriaMessage(`${data.length} search result${data.length !== 1 ? 's' : ''} found.`);
        resultRefs.current = new Array(data.length).fill(null);
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        console.error(err);
      }
    };
    fetchResults();
    return () => controller.abort();
  }, [debouncedSearch]);

  const itemPageTitle = (item: ISearchResult): string => {
    return item.pageTitle.split(' | ')[0];
  };

  return (
    <>
      <button
        ref={triggerRef}
        aria-expanded={open}
        aria-controls="search-modal"
        aria-label="Open site search"
        title="Search"
        onClick={toggleSearch}
        className="bg-inherit mx-1 text-black p-[10px] hover:bg-gray-200 focus:bg-inherit active:shadow-none hover:shadow-none active:transform-none hover:transform-none"
      >
        <FaMagnifyingGlass />
      </button>

      {open && (
        <div
          ref={modalRef}
          id="search-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-title"
          className="fixed inset-0 z-[9999] h-dvh w-dvw flex justify-center items-start bg-black/20 backdrop-blur-sm"
          onClick={handleBackdropClick} // Add click handler here
        >
          <div className="bg-white w-[calc(100vw-2rem)] md:w-1/2 mt-10 rounded-md max-h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
            <h2 id="search-title" className="sr-only">Search site</h2>
            <div className="flex justify-between items-center px-3 border-b border-gray-300">
              <div className="flex items-center gap-1 w-full">
                <FaMagnifyingGlass />
                <label htmlFor="site-search" className="sr-only">Search</label>
                <input
                  id="site-search"
                  ref={inputRef}
                  type="search"
                  role="searchbox"
                  aria-describedby="search-status"
                  className="flex-1 border-none outline-none shadow-none focus:outline-none focus:ring-0"
                  placeholder="Start typing to search..."
                  value={searchStr}
                  onChange={(e) => setSearchStr(e.target.value)}
                />
              </div>
              <button
                onClick={toggleSearch}
                className="bg-inherit text-black p-[10px] hover:bg-gray-200 focus:bg-inherit active:shadow-none hover:shadow-none active:transform-none hover:transform-none"
              >
                <FaX />
              </button>
            </div>
            <div className="px-1 overflow-y-auto">
              <div id="search-status" className="sr-only" aria-live="polite">
                {ariaMessage}
              </div>
              <ul role="listbox" className="list-none divide-y divide-gray-200 p-0 pb-2 m-0 gap-0">
                {searchList.map((item, index) => (
                  <SearchItem
                    list={searchList} 
                    index={index}
                    item={item} 
                    searchStr={searchStr} 
                  />
                ))}
              </ul>
              {!searchList.length && (
                <div className="text-center p-5 text-gray-700">
                  {searchStr.length === 0 && <span>Nothing here yet. Let’s find something!</span>}

                  {searchStr.length > 0 && searchStr.length <= 3 && (
                    <span>Keep typing... we’ll match full words after 3 characters.</span>
                  )}

                  {searchStr.length > 3 && !searchList.length && (
                    <span>No exact word matches found. Try typing the full name or word, or try a different term.</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
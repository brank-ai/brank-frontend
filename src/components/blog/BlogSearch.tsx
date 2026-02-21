'use client';

import { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Search } from 'lucide-react';
import { blogTheme } from './theme';
import { debounce } from '@/lib/utils';

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${blogTheme.colors.textSubtle};
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  background: ${blogTheme.colors.bgDepressed};
  box-shadow: ${blogTheme.shadows.deepField};
  border: none;
  border-radius: 12px;
  padding: 12px 16px 12px 44px;
  color: ${blogTheme.colors.textPrimary};
  font-size: 0.875rem;
  font-family: ${blogTheme.fonts.sans};
  outline: none;
  transition: box-shadow 200ms ease;

  &::placeholder {
    color: ${blogTheme.colors.textSubtle};
  }

  &:focus {
    box-shadow: ${blogTheme.shadows.deepField},
      0 0 0 1px rgba(0, 168, 255, 0.25);
  }
`;

interface BlogSearchProps {
  onSearch: (query: string) => void;
}

export default function BlogSearch({ onSearch }: BlogSearchProps) {
  const [value, setValue] = useState('');

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedSearch(value);
  }, [value, debouncedSearch]);

  return (
    <SearchWrapper>
      <SearchIcon>
        <Search size={18} />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </SearchWrapper>
  );
}

'use client';

import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { blogTheme } from './theme';
import BlogCard from './BlogCard';
import BlogSearch from './BlogSearch';
import { BlogPost } from '@/types/blog';

const ListingWrapper = styled.div`
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;

  @media (min-width: ${blogTheme.breakpoints.md}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 40px;
  }
`;

const TagsWrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const TagButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) =>
    $active ? blogTheme.colors.accent : blogTheme.colors.bgElevated};
  color: ${({ $active }) =>
    $active ? '#000000' : blogTheme.colors.textMuted};
  font-size: 0.75rem;
  padding: 6px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  font-family: ${blogTheme.fonts.sans};
  transition: all 200ms ease;
  min-height: 32px;

  &:hover {
    background: ${({ $active }) =>
      $active ? blogTheme.colors.accentHover : blogTheme.colors.bgSurfaceLight};
    color: ${({ $active }) =>
      $active ? '#000000' : blogTheme.colors.textSecondary};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;

  @media (min-width: ${blogTheme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  @media (min-width: ${blogTheme.breakpoints.xl}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 64px 24px;
  color: ${blogTheme.colors.textMuted};
  font-size: 1rem;
  font-family: ${blogTheme.fonts.sans};
`;

const EmptyTitle = styled.p`
  color: ${blogTheme.colors.textSecondary};
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const EmptyDescription = styled.p`
  color: ${blogTheme.colors.textSubtle};
  font-size: 0.875rem;
`;

interface BlogListingGridProps {
  posts: BlogPost[];
  tags: string[];
}

export default function BlogListingGrid({ posts, tags }: BlogListingGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(lower) ||
          post.excerpt.toLowerCase().includes(lower) ||
          post.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    }

    if (activeTag) {
      result = result.filter((post) => post.tags.includes(activeTag));
    }

    return result;
  }, [posts, searchQuery, activeTag]);

  const handleTagClick = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag));
  };

  return (
    <ListingWrapper>
      <TopBar>
        <BlogSearch onSearch={setSearchQuery} />
        <TagsWrapper>
          {tags.map((tag) => (
            <TagButton
              key={tag}
              $active={activeTag === tag}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </TagButton>
          ))}
        </TagsWrapper>
      </TopBar>

      {filteredPosts.length > 0 ? (
        <Grid>
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </Grid>
      ) : (
        <EmptyState>
          <EmptyTitle>No articles found</EmptyTitle>
          <EmptyDescription>
            Try adjusting your search or filter to find what you&apos;re looking
            for.
          </EmptyDescription>
        </EmptyState>
      )}
    </ListingWrapper>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ArrowLeft } from 'lucide-react';
import { blogTheme } from './theme';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

const HeaderWrapper = styled.header`
  max-width: 720px;
  margin: 0 auto;
  padding-top: 32px;

  @media (min-width: ${blogTheme.breakpoints.md}) {
    padding-top: 48px;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${blogTheme.colors.textMuted};
  font-size: 0.875rem;
  font-family: ${blogTheme.fonts.sans};
  text-decoration: none;
  margin-bottom: 32px;
  transition: color 200ms ease;
  min-height: 44px;

  &:hover {
    color: ${blogTheme.colors.accent};
  }
`;

const Title = styled.h1`
  color: ${blogTheme.colors.textPrimary};
  font-size: 1.875rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0 0 24px;
  font-family: ${blogTheme.fonts.sans};

  @media (min-width: ${blogTheme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (min-width: ${blogTheme.breakpoints.lg}) {
    font-size: 2.75rem;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const AuthorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: ${blogTheme.colors.bgElevated};
  flex-shrink: 0;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const AuthorName = styled.span`
  color: ${blogTheme.colors.textPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  font-family: ${blogTheme.fonts.sans};
`;

const PostMeta = styled.span`
  color: ${blogTheme.colors.textSubtle};
  font-size: 0.8125rem;
  font-family: ${blogTheme.fonts.sans};
`;

const TagsRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 32px;
`;

const TagPill = styled.span`
  background: ${blogTheme.colors.bgElevated};
  color: ${blogTheme.colors.accent};
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-family: ${blogTheme.fonts.sans};
`;

const CoverImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: ${blogTheme.shadows.softTileSm};
  background: ${blogTheme.colors.bgSurface};

  @media (min-width: ${blogTheme.breakpoints.md}) {
    border-radius: 16px;
    margin-bottom: 48px;
  }
`;

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <HeaderWrapper>
      <BackLink href="/blog">
        <ArrowLeft size={16} />
        Back to blog
      </BackLink>

      <Title>{post.title}</Title>

      <MetaRow>
        <AuthorAvatar>
          <Image
            src={post.author.avatar}
            alt={post.author.name}
            fill
            sizes="40px"
            style={{ objectFit: 'cover' }}
          />
        </AuthorAvatar>
        <AuthorInfo>
          <AuthorName>{post.author.name}</AuthorName>
          <PostMeta>
            {formatDate(post.publishedAt)} &middot; {post.readingTime} min read
          </PostMeta>
        </AuthorInfo>
      </MetaRow>

      <TagsRow>
        {post.tags.map((tag) => (
          <TagPill key={tag}>{tag}</TagPill>
        ))}
      </TagsRow>

      <CoverImageWrapper>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, 720px"
          style={{ objectFit: 'cover' }}
          priority
        />
      </CoverImageWrapper>
    </HeaderWrapper>
  );
}

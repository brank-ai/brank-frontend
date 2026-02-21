'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { blogTheme } from './theme';
import { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

const CardWrapper = styled(Link)`
  display: block;
  background: ${blogTheme.gradients.surface};
  border: 1px solid ${blogTheme.colors.borderSubtle};
  border-radius: 12px;
  box-shadow: ${blogTheme.shadows.softTileXs};
  overflow: hidden;
  transition: all 300ms ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${blogTheme.shadows.softTileSm};
    border-color: ${blogTheme.colors.borderHover};
  }
`;

const CardImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${blogTheme.colors.bgSurface};
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 60%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 1;
`;

const CardBody = styled.div`
  padding: 16px;

  @media (min-width: ${blogTheme.breakpoints.md}) {
    padding: 20px;
  }
`;

const CardTitle = styled.h2`
  color: ${blogTheme.colors.textPrimary};
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  line-height: 1.4;
  margin: 0 0 8px;
  font-family: ${blogTheme.fonts.sans};

  @media (min-width: ${blogTheme.breakpoints.md}) {
    font-size: 1.1875rem;
  }
`;

const CardExcerpt = styled.p`
  color: ${blogTheme.colors.textMuted};
  font-size: 0.8125rem;
  line-height: 1.6;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-family: ${blogTheme.fonts.sans};

  @media (min-width: ${blogTheme.breakpoints.md}) {
    font-size: 0.875rem;
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background: ${blogTheme.colors.bgElevated};
  flex-shrink: 0;
`;

const AuthorName = styled.span`
  color: ${blogTheme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 500;
  font-family: ${blogTheme.fonts.sans};
`;

const MetaDot = styled.span`
  color: ${blogTheme.colors.textSubtle};
  font-size: 0.625rem;
`;

const MetaText = styled.span`
  color: ${blogTheme.colors.textSubtle};
  font-size: 0.75rem;
  font-family: ${blogTheme.fonts.sans};
`;

const TagsRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const TagPill = styled.span`
  background: ${blogTheme.colors.bgElevated};
  color: ${blogTheme.colors.accent};
  font-size: 0.6875rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 500;
  letter-spacing: 0.02em;
  font-family: ${blogTheme.fonts.sans};
`;

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <CardWrapper href={`/blog/${post.slug}`}>
      <CardImageWrapper>
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority
        />
        <ImageOverlay />
      </CardImageWrapper>
      <CardBody>
        <CardTitle>{post.title}</CardTitle>
        <CardExcerpt>{post.excerpt}</CardExcerpt>
        <MetaRow>
          <AuthorAvatar>
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              sizes="24px"
              style={{ objectFit: 'cover' }}
            />
          </AuthorAvatar>
          <AuthorName>{post.author.name}</AuthorName>
          <MetaDot>&bull;</MetaDot>
          <MetaText>{formatDate(post.publishedAt)}</MetaText>
          <MetaDot>&bull;</MetaDot>
          <MetaText>{post.readingTime} min read</MetaText>
        </MetaRow>
        <TagsRow>
          {post.tags.map((tag) => (
            <TagPill key={tag}>{tag}</TagPill>
          ))}
        </TagsRow>
      </CardBody>
    </CardWrapper>
  );
}

'use client';

import React from 'react';
import Markdown from 'react-markdown';
import styled from 'styled-components';
import { blogTheme } from './theme';

const Article = styled.article`
  max-width: 720px;
  margin: 0 auto;
  color: ${blogTheme.colors.textSecondary};
  font-size: 1.0625rem;
  line-height: 1.8;
  font-family: ${blogTheme.fonts.sans};
  padding-bottom: 64px;

  @media (min-width: ${blogTheme.breakpoints.md}) {
    font-size: 1.125rem;
  }
`;

const MarkdownH1 = styled.h1`
  color: ${blogTheme.colors.textPrimary};
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
  margin: 48px 0 24px;
  font-family: ${blogTheme.fonts.sans};

  @media (min-width: ${blogTheme.breakpoints.md}) {
    font-size: 2.25rem;
  }
`;

const MarkdownH2 = styled.h2`
  color: ${blogTheme.colors.textPrimary};
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin: 40px 0 16px;
  font-family: ${blogTheme.fonts.sans};

  @media (min-width: ${blogTheme.breakpoints.md}) {
    font-size: 1.75rem;
  }
`;

const MarkdownH3 = styled.h3`
  color: ${blogTheme.colors.textPrimary};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 32px 0 12px;
  font-family: ${blogTheme.fonts.sans};

  @media (min-width: ${blogTheme.breakpoints.md}) {
    font-size: 1.375rem;
  }
`;

const MarkdownParagraph = styled.p`
  margin-bottom: 24px;
  color: ${blogTheme.colors.textSecondary};
`;

const MarkdownLink = styled.a`
  color: ${blogTheme.colors.accent};
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 200ms ease;

  &:hover {
    border-bottom-color: ${blogTheme.colors.accent};
  }
`;

const MarkdownBlockquote = styled.blockquote`
  border-left: 3px solid ${blogTheme.colors.accent};
  padding-left: 20px;
  margin: 24px 0;
  color: ${blogTheme.colors.textMuted};
  font-style: italic;

  p {
    margin-bottom: 0;
  }
`;

const MarkdownInlineCode = styled.code`
  background: ${blogTheme.colors.bgElevated};
  padding: 2px 6px;
  border-radius: 4px;
  font-family: ${blogTheme.fonts.mono};
  font-size: 0.875em;
  color: ${blogTheme.colors.accent};
`;

const MarkdownPre = styled.pre`
  background: ${blogTheme.colors.bgDepressed};
  box-shadow: ${blogTheme.shadows.deepField};
  border-radius: 12px;
  padding: 20px;
  overflow-x: auto;
  margin: 24px 0;
  font-family: ${blogTheme.fonts.mono};
  font-size: 0.8125rem;
  line-height: 1.6;
  color: ${blogTheme.colors.textSecondary};

  code {
    background: none;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
    color: inherit;
  }
`;

const MarkdownImage = styled.img`
  width: 100%;
  border-radius: 12px;
  margin: 32px 0;
`;

const MarkdownUl = styled.ul`
  margin: 16px 0 24px;
  padding-left: 24px;
  list-style-type: disc;

  li {
    margin-bottom: 8px;
    color: ${blogTheme.colors.textSecondary};
    padding-left: 4px;
  }
`;

const MarkdownOl = styled.ol`
  margin: 16px 0 24px;
  padding-left: 24px;
  list-style-type: decimal;

  li {
    margin-bottom: 8px;
    color: ${blogTheme.colors.textSecondary};
    padding-left: 4px;
  }
`;

const MarkdownHr = styled.hr`
  border: none;
  border-top: 1px solid ${blogTheme.colors.borderVisible};
  margin: 48px 0;
`;

const MarkdownStrong = styled.strong`
  color: ${blogTheme.colors.textPrimary};
  font-weight: 600;
`;

const MarkdownTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 24px 0;
  font-size: 0.875rem;
`;

const MarkdownTh = styled.th`
  text-align: left;
  padding: 12px 16px;
  border-bottom: 1px solid ${blogTheme.colors.borderVisible};
  color: ${blogTheme.colors.textPrimary};
  font-weight: 600;
  font-size: 0.8125rem;
  letter-spacing: 0.02em;
`;

const MarkdownTd = styled.td`
  padding: 12px 16px;
  border-bottom: 1px solid ${blogTheme.colors.borderSubtle};
  color: ${blogTheme.colors.textSecondary};
`;

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  return (
    <Article>
      <Markdown
        components={{
          h1: ({ children }) => <MarkdownH1>{children}</MarkdownH1>,
          h2: ({ children }) => <MarkdownH2>{children}</MarkdownH2>,
          h3: ({ children }) => <MarkdownH3>{children}</MarkdownH3>,
          p: ({ children }) => (
            <MarkdownParagraph>{children}</MarkdownParagraph>
          ),
          a: ({ href, children }) => (
            <MarkdownLink
              href={href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </MarkdownLink>
          ),
          blockquote: ({ children }) => (
            <MarkdownBlockquote>{children}</MarkdownBlockquote>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = className?.startsWith('language-');
            if (isBlock) {
              return (
                <MarkdownPre>
                  <code>{children}</code>
                </MarkdownPre>
              );
            }
            return <MarkdownInlineCode {...props}>{children}</MarkdownInlineCode>;
          },
          pre: ({ children }) => <>{children}</>,
          img: ({ src, alt }) => (
            <MarkdownImage src={src ?? ''} alt={alt ?? ''} />
          ),
          ul: ({ children }) => <MarkdownUl>{children}</MarkdownUl>,
          ol: ({ children }) => <MarkdownOl>{children}</MarkdownOl>,
          hr: () => <MarkdownHr />,
          strong: ({ children }) => (
            <MarkdownStrong>{children}</MarkdownStrong>
          ),
          table: ({ children }) => <MarkdownTable>{children}</MarkdownTable>,
          th: ({ children }) => <MarkdownTh>{children}</MarkdownTh>,
          td: ({ children }) => <MarkdownTd>{children}</MarkdownTd>,
        }}
      >
        {content}
      </Markdown>
    </Article>
  );
}

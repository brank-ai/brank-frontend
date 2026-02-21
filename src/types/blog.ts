export interface BlogAuthor {
  name: string;
  avatar: string;
  role?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  contentPath: string;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  readingTime: number;
  featured?: boolean;
}

export interface BlogData {
  posts: BlogPost[];
}

class Frontmatter {
  date: string;
  tags: string[];
  title: string;

  constructor(frontmatter: Frontmatter) {
    const {
      date,
      tags,
      title,
    } = frontmatter;

    this.date = date;
    this.tags = tags;
    this.title = title;
  }
}

export default class Post {
  id: number;
  excerpt: string;
  fields: {
    slug: string;
  };
  frontmatter: Frontmatter;

  constructor(post: Post) {
    const {
      id,
      excerpt,
      fields,
      frontmatter,
    } = post;

    this.id = id;
    this.excerpt = excerpt;
    this.fields = fields;
    this.frontmatter = new Frontmatter(frontmatter);
  }
}

import { Link } from 'gatsby';
import Style from './PostItem.style';
import PostInfo from '@/schema/post';

type PostItemProps = {
  info: PostInfo;
};

const PostItem = ({ info }: PostItemProps) => {
  const { date, tags, title } = info.frontmatter;

  return (
    <Style.Container>
      <Style.Date>{date}</Style.Date>

      <Link to={info.fields.slug}>
        <Style.Title>{title}</Style.Title>
      </Link>

      <Style.Tags>
        {tags.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </Style.Tags>
    </Style.Container>
  );
};

export default PostItem;

import { Link } from 'react-router-dom';

export default function Repos({ repo }) {
  return (
    <Link to={repo.name} className="repo">
      <div className="repo_infos">
        <div className="repo_name">
          <div className="flex_1">
            <i className="ri-git-repository-line"></i>
            <span className="name">{repo.name}</span>
            <span className="private">
              {repo.private ? 'private' : 'public'}
            </span>
          </div>
        </div>
        <div className="desc">{repo.description}</div>
        <div className="repo_info">
          <div className="lingua">
            <i className="ri-global-fill"></i>
            {repo.language ? repo.language : 'No Language'}
          </div>
          <div className="stars">
            <i className="ri-star-half-s-line"></i>
            {repo.stargazers_count}
          </div>
          <div className="forks">
            <i className="ri-git-branch-line"></i>
            {repo.forks}
          </div>
        </div>
      </div>
    </Link>
  );
}

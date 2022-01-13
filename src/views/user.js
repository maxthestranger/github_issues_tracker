import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Back from '../components/back/back';
import Repos from '../components/repos/repos';

export default function User() {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const params = useParams();
  const username = params.userName;

  // get users based on userInput
  useEffect(() => {
    let didCancel = false;

    async function getUser(username) {
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${username}`
        );

        if (!didCancel) {
          setUser(data);
        }
      } catch (e) {
        console.log(e);
      }

      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=10&sort=created=desc`
        );

        if (!didCancel) {
          setRepos(data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getUser(username);
    return () => {
      didCancel = true;
    };
  }, [username]);

  let navigate = useNavigate();

  return (
    <div className="wrapper">
      <Back navigate={navigate} />
      <img src={user.avatar_url} alt="avatar" className="img" />
      <h2 className="title">@{user.login}</h2>
      <div className="info">
        <p>
          <i className="ri-user-location-fill"></i>{' '}
          {user.location ? user.location : 'World'}
        </p>{' '}
        <span className="slash"></span>
        <p>
          <i className="ri-git-repository-line"></i> {user.public_repos}
        </p>{' '}
        <span className="slash"></span>
        <a
          href={`https://twitter.com/${user.twitter_username}`}
          target="_blank"
          rel="noreferrer"
        >
          <i className="ri-twitter-line"></i> @
          {user.twitter_username ? user.twitter_username : ''}
        </a>
      </div>

      <div className="repos">
        {repos
          ? repos.map((repo) => <Repos key={repo.id} repo={repo} />)
          : 'No Repos Found'}
      </div>
    </div>
  );
}

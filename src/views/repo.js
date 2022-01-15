import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Back from '../components/back/back';

export default function Repo() {
  const [repo, setRepo] = useState({});
  const [language, setLanguage] = useState({});
  const params = useParams();
  const userName = params.userName;
  const repoName = params.repoName;

  // get repos based on its name
  useEffect(() => {
    let didCancel = false;

    async function getRepo() {
      // repos
      try {
        const { data } = await axios.get(
          `https://api.github.com/repos/${userName}/${repoName}`
        );

        if (!didCancel) {
          setRepo(data);
        }
      } catch (e) {
        console.log(e);
      }

      // languages
      try {
        const { data } = await axios.get(
          `https://api.github.com/repos/${userName}/${repoName}/languages`
        );

        if (!didCancel) {
          setLanguage(data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    getRepo();
    return () => {
      didCancel = true;
    };
  }, [userName, repoName]);

  let navigate = useNavigate();

  return (
    <div className="wrapper">
      <Back navigate={navigate} />
      <h2 className="title">~{repo.name}</h2>
      <div className="layout">
        <div className="layout_main">
          <div className="between">
            <div className="search">
              <input type="text" />
            </div>

            <div className="newIssue">
              <Link to="/" className="btn">
                <span>New Issue</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="layout_sidebar">
          <div className="border_grid">
            <div className="border_grid_row hide_md">
              <div className="border_grid_cell">
                <h2 className="h4">About</h2>
                <p className="p">{repo.description}</p>
                <div className="mt_2">
                  <i className="ri-scales-fill"></i>
                  {repo.license ? repo.license.name : 'No Licence'}
                </div>
                <div className="mt_2">
                  <i className="ri-star-half-line"></i>
                  {repo.stargazers_count} Stars
                </div>
                <div className="mt_2">
                  <i className="ri-eye-line"></i>
                  {repo.watchers_count} Watching
                </div>
                <div className="mt_2">
                  <i className="ri-git-pull-request-line"></i>
                  {repo.forks_count} Forks
                </div>
              </div>
            </div>
            <div className="border_grid_row">
              <div className="border_grid_cell">
                <h2 className="h4">Contributors</h2>
                <ul className="list_none">
                  <li>
                    <img src="" alt="avatar" width="32" height="32" />
                    <span></span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border_grid_row">
              <div className="border_grid_cell">
                <h2 className="h4">Languages</h2>
                <ul className="list_style_none">
                  {Object.entries(language).map(([key, value], index) => (
                    <li key={index}>
                      <span>
                        <span className="lingua_name">{key}</span>
                        <span>{value}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

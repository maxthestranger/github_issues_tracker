import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Repo() {
  const [repo, setRepo] = useState({});
  const params = useParams();
  const userName = params.userName;
  const repoName = params.repoName;

  // get repos based on its name
  useEffect(() => {
    let didCancel = false;

    async function getRepo() {
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
    }

    getRepo();
    return () => {
      didCancel = true;
    };
  }, [userName, repoName]);

  console.log(repo);

  return (
    <div className="wrapper">
      {/* <Back navigate={navigate} /> */}
      <p>{repoName}</p>
    </div>
  );
}

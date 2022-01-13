import { Link } from 'react-router-dom';

export default function Suggestion({ users }) {
  return (
    <div className="user">
      {users
        ? users.map((user) => (
            <Link to={user.login} key={user.id}>
              <img src={user.avatar_url} alt="avatar" />
              <p className="name">{user.login}</p>
              <p></p>
            </Link>
          ))
        : 'No user yet'}
    </div>
  );
}

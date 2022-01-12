export default function Suggestion({ users }) {
  return (
    <div>
      {users
        ? users.map((user) => (
            <div key={user.id}>
              <img src={user.avatar_url} alt="avatar" width="50" height="50" />
              <p>{user.login}</p>
              <p></p>
            </div>
          ))
        : 'No user yet'}
    </div>
  );
}

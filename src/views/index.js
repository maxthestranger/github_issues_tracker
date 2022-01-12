import axios from 'axios';
import { useState } from 'react';
import Search from '../components/search/search';
import Suggestion from '../components/suggestion/suggestion';

export default function Home() {
  // userInput state
  const [userName, setUserName] = useState({
    username: '',
    typing: false,
    typingTimeOut: 0,
  });
  const [users, setUsers] = useState([]);

  // handle user input
  function handleChange(e) {
    let userInput = e.target.value;

    if (userName.typingTimeOut) {
      clearTimeout(userName.typingTimeOut);
    }

    setUserName({
      username: userInput,
      typing: false,
      typingTimeOut: setTimeout(function () {
        getUsers(userName.username);
      }, 1000),
    });
  }

  // get users based on userInput
  async function getUsers(username) {
    try {
      const { data } = await axios.get(
        `https://api.github.com/search/users?per_page=10&q=${username}&in:login`
      );

      setUsers(data.items);
      console.log(username);
    } catch (e) {
      console.log(e);
    }
  }

  console.log(users, userName.username);
  return (
    <>
      <Search userName={userName.username} handleChange={handleChange} />
      <Suggestion users={users} />
    </>
  );
}

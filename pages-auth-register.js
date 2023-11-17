// pages/auth/register.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  const handleRegister = async () => {
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (!result.error) {
      router.push('/');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {session ? (
        <p>You are already logged in as {session.user.name}.</p>
      ) : (
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
      )}
    </div>
  );
}

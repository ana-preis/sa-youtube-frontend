import { useState, createContext, ReactNode } from 'react';

export const UserContext = createContext({});

interface Props {
  children: ReactNode;
}

const UserProvider = ( props : Props) => {
  const { children } = props;
  const [user, setUser] = useState<string>();
  const [token, setToken] = useState();

  setUser("oie");

  return (
    <UserContext.Provider value={{ user, token}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
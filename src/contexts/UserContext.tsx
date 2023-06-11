import { useState, createContext, ReactNode } from 'react';
import { MockUserType } from '../mocks/MockUser';
import { UserType } from '../types/User';

export const UserContext = createContext({});

interface Props {
  children: ReactNode;
}

const UserProvider = ( props : Props) => {
  const { children } = props;
  const [user, setUser] = useState<UserType>();
  const [token, setToken] = useState();

  setUser(MockUserType);

  return (
    <UserContext.Provider value={{ user, token}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;
import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// context element
const UserContext = createContext();

function UserContextProvider({ children }) {
  // useState to set variables and updateVariables
  const [user, setUser] = useState(null);
  const [savedList, setSavedList] = useState(null);
  const [postList, setPostList] = useState(null);
  const [isClicked, setClick] = useState([]);
  const [search, setSearch] = useState(null);
  const userValue = useMemo(
    () => ({
      user,
      setUser,
      savedList,
      setSavedList,
      postList,
      setPostList,
      search,
      setSearch,
      isClicked,
      setClick,
    }),
    [user, savedList, postList, search, isClicked],
  );
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}
// user object and functionality to set the user
UserContextProvider.propTypes = {
  children: PropTypes.any.isRequired,
};

export { UserContext, UserContextProvider };

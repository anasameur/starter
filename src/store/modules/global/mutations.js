export default {
  SET_USER: (state, user) => {
    state.user = user;
  },
  SET_HELLO_WORLD_MESSAGE: (state, helloWorldMessage) => {
    state.helloWorldMessage = helloWorldMessage;
  },
  START_SEARCH: (state, searchQuery) => {
    state.searchQuery = searchQuery;
    state.searchInProgress = true;
  },
  END_SEARCH: (state, result) => {
    state.searchInProgress = false;
    // TODO This is where you should handle the search results. Typically, set it in the state and display them in the view via a getter.
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(result));
  },
  END_SEARCH_ERROR: (state, error) => {
    state.searchInProgress = false;
    // TODO This is where you should handle the search error.
    // eslint-disable-next-line no-console
    console.error(error);
  },
};

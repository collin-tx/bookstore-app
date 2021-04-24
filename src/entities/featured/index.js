import { GET_FEATURED } from "../../actions/constants";

export const getFeaturedBook = firebase => dispatch => {
  firebase.database().ref('featured').on('value', (snapshot) => {
    const data = snapshot.val();

    dispatch({
      type: GET_FEATURED,
      payload: data
    });
  });

  return false;
}

export const addComment = (firebase, book, comment) => {
  const user = firebase.auth()?.currentUser;
  firebase.database().ref('featured/' + Object.keys(book) + '/book/comments')
    .push({
        username: (user?.displayName ?? 'User') ,
        key: comment,
        userId: user?.uid || '999&guest=user&666'
    });
}

export const updateComment = (firebase, book, key, newComment) => {
  firebase.database().ref('featured/' + Object.keys(book) + '/book/comments/' + key)
    .update({
      key: newComment
    });
}

export const deleteComment = (firebase, book, key) => {
  firebase.database().ref('featured/' + Object.keys(book) + '/book/comments/' + key)
    .remove();
}

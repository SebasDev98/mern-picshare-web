export function saveUserAndToken(user, token) {
  const { localStorage } = window;

  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", JSON.stringify(token));
}

export function deleteUserAndToken() {
  const { localStorage } = window;

  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function isLogedIn() {
  const { user, token } = getUserAndToken();

  if (!user || !token || !user._id) {
    return false;
  }

  return true;
}

export function getUserAndToken() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    user,
    token,
  };
}

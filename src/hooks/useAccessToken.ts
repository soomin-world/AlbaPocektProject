const useAccessToken = (accessToken: string) => {
  localStorage.setItem("is_login", accessToken);
  return accessToken;
};

export default useAccessToken;

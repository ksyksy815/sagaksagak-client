const passwordCheck = (password) => {
  const regex = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  if (password.length < 8 && password.length > 0) {
    return "1";
  } else if (!regex.test(password)) {
    if (password.length === 0) {
      return "passwordAvail";
    }
    return "2";
  } else {
    return "passwordAvail";
  }
};

const usernameCheck = (username) => {
  const regex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;

  if (username.length < 2 && username.length > 0) {
    return "3";
  } else if (!regex.test(username)) {
    if (username.length === 0) {
      return "usernameAvail";
    }
    return "4";
  } else {
    return "usernameAvail";
  }
};

const emailCheck = (email) => {
  const regex =
    /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  if (email.length > 0) {
    if (!regex.test(email)) return "5";
    else return "emailAvail";
  } else {
    return "emailAvail";
  }
};

const checkAll = (username, email, password) => {
  const usernameRegex = /^[가-힣ㄱ-ㅎa-zA-Z0-9._-]{2,}$/;
  const emailRegex =
    /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  const passwordRegex =
    /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

  return (
    usernameRegex.test(username) &&
    emailRegex.test(email) &&
    passwordRegex.test(password)
  );
};

export { passwordCheck, usernameCheck, emailCheck, checkAll };

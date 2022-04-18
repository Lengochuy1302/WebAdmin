import React from "react";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();



function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut , addRoom, signUp};

// ###########################################################

const refreshPage = () => {
  window.location.reload();
};

function loginUser(dispatch, login, password, history, setIsLoading, setError) {
  fetch("http://192.168.1.137:8000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: login,
      password: password,
    }),
  })
  .then((response) => response.json())
  .then((res) => {
    if (login === "Admin" && password === "admin") {
      history.push("/app/dashboard");
    } else {
      if (res.success === true) {
        localStorage.setItem("id_token", res.IDUSER);
        localStorage.setItem("email_token", res.EMAIL);
        dispatch({ type: "LOGIN_SUCCESS" });
        setError(null);
        setIsLoading(false);
        history.push("/app/dashboard");
       } else {
           alert(""+ res.message);
       }
    }

  })
}

function signUp(dispatch,email, login, password, history, setIsLoading, setError) {
  console.log(email);
  console.log(login);
 console.log(password);
 if (login !== password) {
  alert("Mật khẩu không khớp");
  return;
}

fetch("http://192.168.1.137:8000/singup", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    tentaikhoans: email,
    matkhaus: login,
  }),
})  
.then((response) => response.json())
.then((res) => {
  if (res.success === true) {
      alert("Tạo thành công!");
      refreshPage();
   } else {
     alert("Tài khoản tồn tại!");
   }
})
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  localStorage.removeItem("email_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function addRoom(history) {
  history.push("/app/typography");
}


const storedUser = localStorage.getItem("user");
const storedUserType = localStorage.getItem("userType");

// set the initial state to the stored value, or to null if no value is found
console.log(storedUser);
const jwtoken = document.cookie.split(";").find(cookie => cookie.trim().startsWith("jwtoken="));
console.log(jwtoken);
export const initialState = jwtoken  ? { user: JSON.parse(storedUser), userType: storedUserType } : { user: null, userType: null };


// export const initialState = storedUser ? { user: JSON.parse(storedUser), userType:storedUserType} : { user: null, userType: null };

export const reducer = (state, action) => {
  switch (action.type) {
    case "USER":
      // store the user information in localStorage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload } ;
    case "USER_TYPE":
      // store the user type in localStorage
      localStorage.setItem("userType", action.payload);
      return { ...state, userType: action.payload };
    default:
      return state;
  }
};




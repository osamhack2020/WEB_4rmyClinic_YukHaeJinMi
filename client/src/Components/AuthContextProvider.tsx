import React, { createContext } from 'react';
import { ReactCookieProps, withCookies } from "react-cookie";
import { authUser, removeToken } from "../_lib/mutations";

interface AuthContext {
  login?: (email: string, password: string) => Promise<boolean>,
  logout?: () => void,
  email?: string,
}
export const AuthContext = createContext<AuthContext>({});

type PayLoad = {
  email: string,
  exp: number,
  origIat: number
}

type AuthContextState = {
  accessToken?: string,
  refreshToken?: string,
  email?: string,
  verified: boolean,
}
class AuthContextProvider extends React.Component<ReactCookieProps, AuthContextState> {
  constructor(props: ReactCookieProps) {
    super(props);
    this.state = { verified: false };
  }

  componentDidMount = async () => {

  }

  login = async (email: string, password: string): Promise<boolean> => {
    const payload = await authUser({ email, password }) as PayLoad;
    console.log("login : ", payload);
    console.log("cookie : ", this.props.cookies);
    if (payload) {
      this.setState({ email: payload.email });
      return true;
    }
    return false;
  }

  logout = () => {
    removeToken();
    this.setState({ accessToken: "", refreshToken: "", email: "" });
  }

  render() {

    return (
      <AuthContext.Provider value={{
        login: this.login,
        logout: this.logout,
        email: this.state.email,
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default withCookies(AuthContextProvider);
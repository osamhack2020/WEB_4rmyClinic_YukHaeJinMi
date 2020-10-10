import React, { createContext } from 'react';
import { JWTPayLoad } from "../_lib/environment";
import { authUser, deleteToken, deleteRefreshToken, verifyToken } from "../_lib/mutations";
import { refreshToken } from "../_lib/mutations/auth/refreshToken";

interface AuthContext {
  login?: (email: string, password: string) => Promise<boolean>,
  logout?: () => void,
  email?: string,
  verified?: boolean,
}
export const AuthContext = createContext<AuthContext>({});

type AuthContextState = {
  email?: string,
  verified: boolean,
}
export default class AuthContextProvider extends React.Component<{}, AuthContextState> {
  constructor(props: any) {
    super(props);
    this.state = { verified: false };
  }

  componentDidMount = async () => {
    try {
      const payload = await verifyToken();
      const { email } = payload;
      this.setState({ email, verified: true });
    } catch (err) {
      try {
        const payload = await refreshToken();
        const { email } = payload;
        this.setState({ email, verified: true });
      } catch (err) {
        this.setState({ email: '', verified: false });
      }
    };
  }

  login = async (email: string, password: string): Promise<boolean> => {
    const payload = await authUser({ email, password }) as JWTPayLoad;
    console.log("login : ", payload);
    if (payload) {
      this.setState({ email: payload.email, verified: true });
      return true;
    }
    return false;
  }

  logout = () => {
    deleteToken();
    deleteRefreshToken();
    this.setState({ email: "", verified: false });
  }

  render() {

    return (
      <AuthContext.Provider value={{
        login: this.login,
        logout: this.logout,
        ...this.state
      }}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
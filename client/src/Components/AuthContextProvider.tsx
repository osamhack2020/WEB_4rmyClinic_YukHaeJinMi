import React, { createContext } from 'react';
import { ReactCookieProps, withCookies } from "react-cookie";
import { fetchToken, refreshToken, verifyToken } from '../_lib/auth';
type Tokens = {
  accessToken: string;
  refreshToken: string;
}

interface AuthContext {
  login?: (email: string, password: string) => Promise<boolean>,
  logout?: () => void,
  email?: string,
}
export const AuthContext = createContext<AuthContext>({});

// TODO : to make secure
const setCookieOptions = {
  // secure: true,
  // httpOnly: true,
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
    const accessToken = this.getToken();
    const refreshToken = this.getRefreshToken();

    this.setState({ accessToken, refreshToken }, async () => {
      const verified = await this.verifyToken();
      this.setState({ verified });

      if (verified) this.setState({ email: "user@login.ed" }); // TODO : jwt parsing - use user's data
      else this.setState({ accessToken: "", refreshToken: "" });
    });
  }

  shouldComponentUpdate = (_: ReactCookieProps, nextState: AuthContextState) => {
    return (nextState.verified !== this.state.verified) ||
      (this.state.accessToken !== nextState.accessToken || this.state.refreshToken !== nextState.refreshToken);
  }

  componentDidUpdate = () => {
    const verified = this.verifyToken();
    if (!verified && this.state.refreshToken) this.refreshToken();

    if (verified) this.setState({ email: "user@login.ed" }); // TODO : jwt parsing - use user's data
  }

  login = async (email: string, password: string): Promise<boolean> => {
    const tkn = await fetchToken(email, password);
    if (tkn) {
      tkn.access && this.setToken(tkn.access);
      tkn.refresh && this.setRefreshToken(tkn.refresh);
      return true;
    }
    return false;
  }

  logout = () => {
    this.setState({ accessToken: "", refreshToken: "", email: "" });
    this.removeToken();
  }

  // setToken?: (accessToken: string) => void; // set token to cookie
  // setRefreshToken?: (refreshToken: string) => void; // set refresh token to cookie
  // getToken?: () => string; // get token from cookie
  // getRefreshToken?: () => string; // get refresh token from cookie
  // refreshToken?: (refreshToken: string) => void; // get refreshToken & refresh the token

  private removeToken = () => {
    this.props.cookies?.remove("token");
    this.props.cookies?.remove("refreshToken");
  }

  private setToken = (accessToken: string) => {
    this.props.cookies?.set("token", accessToken, setCookieOptions);
    this.setState({ accessToken });
  }

  private setRefreshToken = (refreshToken: string) => {
    this.props.cookies?.set("refreshToken", refreshToken, setCookieOptions);
    this.setState({ refreshToken });
  }

  private getToken = (): string => {
    return this.props.cookies?.get("token");
  }

  private getRefreshToken = (): string => {
    return this.props.cookies?.get("refreshToken");
  }

  private refreshToken = async () => {
    // api request to server /api/token/refresh
    const rtkn = this.state.refreshToken;
    const tkn = rtkn && await refreshToken(rtkn);
    const accessToken = tkn && tkn.access;
    accessToken && this.setState({ accessToken });
  }

  private verifyToken = async (): Promise<boolean> => {
    // api request to server /api/token/verify
    // will be called when this.state.token has changed (componentDidUpdate)
    const tkn = this.state.accessToken;
    if (tkn) {
      const ok = await verifyToken(tkn);
      !ok && this.setState({ accessToken: "", refreshToken: "" });
      return ok;
    }
    return false;
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
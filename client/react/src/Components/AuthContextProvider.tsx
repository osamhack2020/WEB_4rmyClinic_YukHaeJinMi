import React, { createContext } from 'react';
import { fetchQuery, graphql } from "react-relay";
import environment from "../_lib/environment";
import { authUser, deleteToken, deleteRefreshToken, verifyToken } from "../_lib/mutations";
import { Viewer } from "../_lib/mutations/auth/authUser";
import { refreshToken } from "../_lib/mutations/auth/refreshToken";
import { AuthContextProviderQuery } from "./__generated__/AuthContextProviderQuery.graphql";


interface AuthContext {
  login?: (email: string, password: string) => Promise<boolean>,
  logout?: () => void,
  viewer: Viewer | null,
}
export const AuthContext = createContext<AuthContext>({ viewer: null });

type AuthContextState = {
  viewer: Viewer | null
}
export default class AuthContextProvider extends React.Component<{}, AuthContextState> {
  constructor(props: any) {
    super(props);
    this.state = { viewer: null };
  }
  getUserFromEmail = async (email: string) => {
    const data = await fetchQuery<AuthContextProviderQuery>(environment, graphql`
          query AuthContextProviderQuery($email: String!) {
            getUserFromEmail(email: $email) {
              id
              nickname
              imgUri
              isCounselor
            }
          }
        `,
      { email }
    );
    const user = data.getUserFromEmail;
    const viewer = user && { id: user.id, nickname: user.nickname, imgUri: user.imgUri, isCounselor: user.isCounselor };
    viewer && this.setState({ viewer });
  }
  componentDidMount = async () => {
    try {

      const payload = await verifyToken();
      const { email } = payload;
      await this.getUserFromEmail(email);
      console.log("verifyToken for ", this.state.viewer?.nickname);

    } catch (err) {

      try {
        const payload = await refreshToken();
        const { email } = payload;
        await this.getUserFromEmail(email);
        console.log("refreshToken for ", this.state.viewer?.nickname);
      } catch (err) {
        console.log("verify & refresh failed");
        this.setState({ viewer: null });
      }

    }
  };

  login = async (email: string, password: string): Promise<boolean> => {
    const viewer = await authUser({ email, password });
    console.log("logined user : ", viewer.id);
    this.setState({ viewer });
    return true;
  }

  logout = () => {
    deleteToken();
    deleteRefreshToken();
    this.setState({ viewer: null });
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
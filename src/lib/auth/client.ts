



'use client';

import type { User } from '@/types/user';

import apolloClient from '../../graphqlclient.js';

import {ApolloProvider, gql} from "@apollo/client";


function generateToken(): string {
  const arr = new Uint8Array(12);
  window.crypto.getRandomValues(arr);
  return Array.from(arr, (v) => v.toString(16).padStart(2, '0')).join('');
}

const user = {
  id: 'USR-000',
  avatar: '/assets/avatar.png',
  firstName: 'Sofia',
  lastName: 'Rivers',
  email: 'sofia@devias.io',
} satisfies User;

export interface SignUpParams {
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

class AuthClient {
  async signUp(params : SignUpParams): Promise<{ error?: string }> {

    const { email, password } = params;
    // Make API request

    // We do not handle the API, so we'll just generate a token and store it in localStorage.

    const token = generateToken();
    localStorage.setItem('custom-auth-token', token);

    let userExists : any = await apolloClient.query({
      query: gql`query GetUsers($login: StringFilter) {
          getUsers(login: $login) {
            id
            login
            password  
          }
        }`,variables: {
          login: {
            value: email,
            filter: "eq"
          }
        }
    })

    if (userExists.data.getUsers.length !== 0) {
      return {error: 'user already exists!'};
    }

    let allUsers : any = await apolloClient.query({
      query: gql`query GetUsers {
          getUsers {
            id
            login
            password  
          }
        }`
    })

  let newToken = generateToken();

    await apolloClient.mutate({
      mutation: gql`mutation InsertUsers($login: String, $password: String, $token: String) {
        insertUsers(login: $login, password: $password, session_token: $token) {
        id  
        }
      }`,variables: {
          login: email,
          password: password,
          token: newToken
        }
    })

    await apolloClient.mutate({
      mutation: gql`
      mutation InsertUserInfo($roleId: Int, $userId: Int) {
        insertUserInfo(roleId: $roleId, userId: $userId) {
          id
        }
      }
      `,
      variables: {
        roleId: 1,
        userId: allUsers.data.getUsers[allUsers.data.getUsers.length - 1].id + 1
      }
    })

    // localStorage.setItem('login', email);
    // localStorage.setItem('password', password);
    localStorage.setItem('session_token', newToken);
    localStorage.setItem('id', allUsers.data.getUsers[allUsers.data.getUsers.length - 1].id + 1);
    return {};
  }

  async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
    return { error: 'Social authentication not implemented' };
  }

  async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
    const { email, password } = params;

    // Make API request

    // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
    const query = await apolloClient.query({
      query: gql`query GetUsers($login: StringFilter, $password: StringFilter) {
          getUsers(login: $login, password: $password) {
            id
            login
            password
            session_token  
          }
        }`,variables: {
          login: {
            value: email,
            filter: "eq"
          }, password: {
            value: password,
            filter: "eq"
          }
        }
    })

    let results = query.data.getUsers;
        if (results.length === 0) {
          return { error: 'Invalid credentials' };
        } else {
          const token = generateToken();
          localStorage.setItem('custom-auth-token', token);
          localStorage.setItem('id', results[0].id);
          // localStorage.setItem('login', results[0].login);
          // localStorage.setItem('password', results[0].password);
          localStorage.setItem('session_token', results[0].session_token);
      
          return {};
        }
  }

  async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Password reset not implemented' };
  }

  async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
    return { error: 'Update reset not implemented' };
  }

  async getUser(): Promise<{ data?: User | null; error?: string }> {
    // Make API request

    // We do not handle the API, so just check if we have a token in localStorage.
    const token = localStorage.getItem('custom-auth-token');

    if (!token) {
      return { data: null };
    }

    return { data: user };
  }

  async signOut(): Promise<{ error?: string }> {
    localStorage.removeItem('login');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
    localStorage.removeItem('custom-auth-token');
    localStorage.removeItem('session_token');

    return {};
  }
}

export const authClient = new AuthClient();


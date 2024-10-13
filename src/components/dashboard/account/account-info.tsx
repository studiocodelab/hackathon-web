

'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import apolloClient from '../../../graphqlclient.js';

import gql from 'graphql-tag';

const user = {
  avatar: '/assets/avatar.png',
  id: localStorage.getItem('id'),
} as const;

const GET_LOGIN = gql`
query GetUsers($sessionToken: StringFilter) {
  getUsers(session_token: $sessionToken) {
    login
  }
}
`

export function AccountInfo(): React.JSX.Element {

  const [state, setState] = React.useState({login: ''});

  if (state.login === '') {

  apolloClient.query({
    query: GET_LOGIN
    , variables: {
      sessionToken: {
        filter: "eq",
        value: localStorage.getItem('session_token')
      }
    }
  }).then((data) => {
    setState({login: data.data.getUsers[0].login})
  })
}

  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{state.login}</Typography>
            <Typography color="text.secondary" variant="body2">
            <b>user id: {user.id}</b>
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        {/* <Button fullWidth variant="text">
          Upload picture
        </Button> */}
      </CardActions>
    </Card>
  );
}


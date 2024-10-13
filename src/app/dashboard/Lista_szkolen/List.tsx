'use client';

import {gql} from '@apollo/client';
import {useQuery, ApolloProvider} from '@apollo/client';
import apolloClient from '@/graphqlclient';
import { Card } from '@mui/material';
import { padding } from '@mui/system';
import i18n from '../../../translation.js'

const GET_TRAINING = gql`
query Query {
    getTraining {
      id
      title
      date
      description
      length
      maxUsers
    }
  }
`


const CODES_FOR_LANGUAGES : any = {
    'en' : 'en-US',
    'pl': 'pl-PL'
  }

  let options : any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default function Page(): React.JSX.Element {
    return (
    <ApolloProvider client={apolloClient}>
      <List/>
    </ApolloProvider>
    )
}

function List(): React.JSX.Element {  
    const {data, loading, error} = useQuery(GET_TRAINING);  

    return (loading ? <p>Loading...</p> : data.getTraining.filter((element : any) => {return new Date(element.date) > new Date(Date.now())}).map((training: any) => {
      return (
        <Card style={{padding: 10, margin: 10}}>
            <div key={training.id}>
                <h1>{training.title}</h1>
                <h3>Tematyka:</h3>
                <p>{training.description}</p>
                <h3>Data:</h3>
                <h5>{new Date(training.date).toLocaleDateString(CODES_FOR_LANGUAGES[i18n.language], options)}</h5>
                <h3>Czas trwania (godziny):</h3>
                <h5>{training.length}</h5>
                <h3>Maksymalna ilość uczestników:</h3>
                <h5>{training.maxUsers}</h5>
            </div>  
        </Card>
    )}));
}
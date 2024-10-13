'use client';

import {gql} from '@apollo/client';
import {useQuery, ApolloProvider} from '@apollo/client';
import apolloClient from '@/graphqlclient';
import { Card } from '@mui/material';
import { padding } from '@mui/system';
import i18n from '../../../translation.js'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

    return (loading ? <p>Loading...</p> : <> <h1 style={{marginLeft: 20}}>Archiwalne szkolenia</h1> {data.getTraining.filter((element : any) => {return new Date(element.date) < new Date(Date.now())}).map((training: any) => {
      return (
        <Card style={{padding: 10, margin: 10}}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ArrowDownwardIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 700, fontSize: 20 }}>
                {training.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{new Date(training.date).toLocaleDateString(CODES_FOR_LANGUAGES[i18n.language], options)}</Typography>
              </AccordionSummary>
                <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell >Czas trwania:</TableCell>
                        <TableCell >Maksymalna ilość uczetników:</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow
                        key={training.id}
                      >
                        <TableCell component="th" scope="row">
                          {training.length}
                        </TableCell>
                        <TableCell >{training.maxUsers}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                  <h3>Opis:</h3>
                  <p>{training.description}</p>
                  {/* <h3>Czas trwania (godziny):</h3>
                  <h5>{training.length}</h5>
                  <h3>Maksymalna ilość uczestników:</h3>
                  <h5>{training.maxUsers}</h5> */}
                </AccordionDetails>
            </Accordion>
        </Card>
    )})}</>);
}
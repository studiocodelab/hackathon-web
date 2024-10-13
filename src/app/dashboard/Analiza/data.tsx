'use client';

import apolloClient from "@/graphqlclient";
import { ApolloProvider, from, useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Traffic } from '@/components/dashboard/overview/traffic';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from "react";


export default function Data()
{
    return (
        <ApolloProvider client={apolloClient}>
            <Analyze/>
        </ApolloProvider>
    )
}

const GET_SURVEYS = gql`
query GetSurveys {
  getSurveys {
    aswer
    id
    userInfoId
  }
}
`

function Analyze()
{

    const {data, loading, error} = useQuery(GET_SURVEYS);

    const [experience, setExperience] = useState([0,0,0]);
    const [knowledge, setKnowledge] = useState([0,0,0]);
    const [practical, setPractical] = useState([0,0,0]);
    const [expectations, setExpectations] = useState([0,0,0]);

    function sum(a : number[]) {
        return a.reduce((a, b) => a + b, 0);
    }

    useEffect(() => {

        if (!loading) {
            let lexperience = [0,0,0];
            let lknowledge = [0,0,0];
            let lpractical = [0,0,0];
            let lexpectations = [0,0,0];
            console.log(data);
            data.getSurveys.forEach((survey : any) => {
                let anwsers : any = JSON.parse(survey.aswer);
                if (anwsers[0] === 5) {
                    lexperience[0]++;
                } else if (anwsers[0] === 4) {
                    lexperience[1]++;
                } else {
                    lexperience[2]++;
                }
                if (anwsers[1] === 5) {
                    lknowledge[0]++;
                } else if (anwsers[1] === 4) {
                    lknowledge[1]++;
                } else {
                    lknowledge[2]++;
                }
                if (anwsers[2] === 5) {
                    lpractical[0]++;
                } else if (anwsers[2] === 4) {
                    lpractical[1]++;
                } else {
                    lpractical[2]++;
                }
                if (anwsers[3] === 5) {
                    lexpectations[0]++;
                } else if (anwsers[3] === 4) {
                    lexpectations[1]++;
                } else {
                    lexpectations[2]++;
                }
    
    
            })
            setExperience(lexperience);
            setKnowledge(lknowledge);
            setPractical(lpractical);
            setExpectations(lexpectations);
        }

    }, [loading])


    return (
    <> {loading ? null :  (
        <>
        <h1>Wyniki ankiet</h1>
        <Grid container spacing={3}>
            <Grid lg={4} md={6} xs={12}>
                <Traffic chartSeries={[experience[0] / sum(experience) * 100, experience[1] / sum(experience) * 100, experience[2] / sum(experience) * 100]} labels={['5/5', '4/5', '<4/5']} sx={{ height: '100%' }} title={"Wrażenia związane z udziałem w szkoleniu"} />
            </Grid>
            <Grid lg={4} md={6} xs={12}>
                <Traffic chartSeries={[knowledge[0] / sum(knowledge) * 100, knowledge[1] / sum(knowledge) * 100, knowledge[2] / sum(knowledge) * 100]} labels={['5/5', '4/5', '<4/5']} sx={{ height: '100%' }} title={"Nabyty poziom wiedzy"}/>
            </Grid>
            <Grid lg={4} md={6} xs={12}>
                <Traffic chartSeries={[practical[0] / sum(practical) * 100, practical[1] / sum(practical) * 100, practical[2] / sum(practical) * 100]} labels={['5/5', '4/5', '<4/5']} sx={{ height: '100%' }} title={"Ocena części praktycznej"}/>
            </Grid>
            <Grid lg={4} md={6} xs={12}>
                <Traffic chartSeries={[expectations[0] / sum(expectations) * 100, expectations[1] / sum(expectations) * 100, expectations[2] / sum(expectations) * 100]} labels={['5/5', '4/5', '<4/5']} sx={{ height: '100%' }} title={"Spełnienie oczekiwań"}/>
            </Grid>
        </Grid>
        </>
        )}
    </>
    )
}
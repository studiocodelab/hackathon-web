'use client';
import {Stack, Typography, Grid, Button, Input, Select, MenuItem, TextareaAutosize, TextField} from '@mui/material';
import {useState} from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {gql} from '@apollo/client';
import apolloClient from '@/graphqlclient';
import { Files } from '@phosphor-icons/react';

export default function Page(): React.JSX.Element {
  return (
    <Creator/>
  );
}

const PUSH_FILE = gql`
mutation PushFile($fileName: String, $data: String) {
  pushFile(fileName: $fileName, data: $data)
}`

const INSERT_TRAINING = gql`
mutation InsertTraining($title: String, $description: String, $date: String, $length: Float, $maxUsers: Int) {
  insertTraining(title: $title, description: $description, date: $date, length: $length, maxUsers: $maxUsers) {
    id
  }
}
`

const INSERT_MATERIAL = gql`
mutation InsertMaterials($fileName: String, $trainingId: Int) {
  insertMaterials(fileName: $fileName, trainingId: $trainingId) {
    id
  }
}`

function dateToSQL(date : Date) : string {
   return date.getUTCFullYear() + '-' +
    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + date.getUTCDate()).slice(-2) + ' ' + 
    ('00' + date.getUTCHours()).slice(-2) + ':' + 
    ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + date.getUTCSeconds()).slice(-2);
}

function getBase64(file : any) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 function getForMultipleFiles(files : any)
 {
    let datas : any = [];
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        const reader : any = new FileReader();
        reader.onloadend = () => {
            // Use a regex to remove data url part
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');
    
            datas.push({title: file.name, data: base64String});
            // Logs wL2dvYWwgbW9yZ...
        };
        reader.readAsDataURL(file);
    }
    return datas;
 }
 

function Creator() : any {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [hours, setHours] = useState(0);
    const [maxUsers, setMaxUsers] = useState(0);
    const [date, setDate] = useState<any>('');
    const [filesData, setFilesData] = useState<any>('');

    async function create() {
        await apolloClient.mutate({
            mutation: INSERT_TRAINING,
            variables: {
                title: title,
                description: description,
                date: dateToSQL(date),
                length: hours,
                maxUsers: maxUsers
            }
        });

        let data : any = [];
        while (data.length === 0) {
            data = (await apolloClient.query({query: gql`query GetTraining($title: StringFilter) {
                getTraining(title: $title) {
                  id
                }
              }`,fetchPolicy: 'no-cache' , variables: {title: {filter: "eq", value: title}}})).data.getTraining;
        }


        let files = filesData.map((file : any) => {return {title: `${title.replaceAll(' ', '_')}_${file.title}`, data: file.data}});
        for (let i = 0; i < files.length; ++i) {
            await apolloClient.mutate({mutation: PUSH_FILE, variables: {fileName: files[i].title, data: files[i].data}});
            await apolloClient.mutate({mutation: INSERT_MATERIAL, variables: {fileName: files[i].title, trainingId: data[0].id}});
        }
        window.location.replace('/dashboard/Lista_szkolen')
        // await apolloClient.mutate({
        //     mutation: INSERT_TRAINING,
        //     variables: {
        //         title: title,
        //         description: description,
        //         date: dateToSQL(date),
        //         length: hours,
        //         maxUsers: maxUsers
        //     }
        // });
        // window.location.replace('/dashboard/Lista_szkolen')
    }

    return (
            <Stack spacing={3} margin={10} width={'90%'}>
            <Grid container spacing={3} marginTop={2}>
                <Typography variant="h4">Dodaj nowe szkolenie:</Typography>
            </Grid>
            <Grid container spacing={3} marginTop={1}>
              <Typography variant="h6">Tytuł</Typography>
              <Grid lg={12} md={6} xs={12} marginBottom={2}>
                <Input type='text' placeholder='Tytuł' onChange={(event) => {setTitle(event.target.value)}}/>
              </Grid>
              <Typography variant="h6" style={{marginBottom: 5}}>Opis</Typography>
              <Grid lg={12} md={8} xs={12} marginBottom={2}>
                <TextareaAutosize onChange={(event) => {setDescription(event.target.value)}} minRows={4} style={{resize: 'none', width: '100%'}}/>
              </Grid>
              <Typography variant="h6">Czas trwania (godziny):</Typography>
              <Grid lg={12} md={6} xs={12} marginBottom={2}>
                <Input type='number' placeholder='Czas trwania' onChange={(event) => {setHours(Number(event.target.value))}}/>
              </Grid>
              <Typography variant="h6">Maksymalna liczba uczestników:</Typography>
              <Grid lg={12} md={6} xs={12} marginBottom={2}>
                <Input type='number' placeholder='Opis' onChange={(event) => {setMaxUsers(Number(event.target.value))}}/>
              </Grid>
              <Typography variant="h6">Data:</Typography>
              <Grid lg={12} md={6} xs={12} marginBottom={2} marginTop={2}>
              <DateTimePicker label="Basic date picker" onChange={(newValue : any) => setDate(new Date(newValue))} />
              </Grid>
              <Typography variant="h6">Pliki:</Typography>
                <Grid lg={12} md={6} xs={12} marginBottom={2} marginTop={2}>
                <TextField
                fullWidth={true}
                id="outlined-basic"
                type="file"
                inputProps={{
                    multiple: true
                }}
                onChange={(event : any) => {setFilesData(getForMultipleFiles(event.target.files))}}/>
              </Grid>
              <Grid lg={12} md={6} xs={12}>
                <Button variant="contained" style={{fontSize: '110%'}} onClick={create}>Create</Button>
              </Grid>
            </Grid>
          </Stack>
    )
}
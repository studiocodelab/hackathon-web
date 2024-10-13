import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import {ApolloProvider, gql} from '@apollo/client';
import {useQuery} from '@apollo/client';
import List from './List';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

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

export default function Page(): React.JSX.Element {

  return ( 
    <List/>
  )
}

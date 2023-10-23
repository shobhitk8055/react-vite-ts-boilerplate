import { Table } from '@/components/Elements/Table/Table'
import ContentWrapper from '@/components/Layout/ContentWrapper'
import React from 'react'

export const Users = () => {
  return (
    <ContentWrapper title="Users">
      <h3 className='pb-3'>Users</h3>
     <Table />
    </ContentWrapper>
  )
}

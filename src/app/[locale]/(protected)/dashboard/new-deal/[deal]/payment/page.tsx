import BankTransferPayment from '@/components/bank-transfer-payment'
import React from 'react'

const page = ({params}:{params:{deal:string}}) => {
  return (
    <BankTransferPayment dealId={params.deal}/>
  )
}

export default page
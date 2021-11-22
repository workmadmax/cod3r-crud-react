import React, { useState } from "react"
import Button from "../components/Button"
import Form from "../components/Form"
import Layout from "../components/Layout"
import Table from "../components/Table"
import Cliente from "../core/Cliente"

export default function Home() {

  const clientes = [
    new Cliente('MADMAX42', 42, '1'),
    new Cliente('Mr. Feijas', 35, '2'),
    new Cliente('Boombla', 23, '3'),
    new Cliente('Gaules', 10, '4')
  ]

  function clienteSelect(cliente: Cliente) {
    console.log(cliente.name)
  }

  function clienteDelete(cliente: Cliente) {
    console.log(`Delete .... ${cliente.name}`)
  }

  function saveClient(cliente: Cliente) {
    console.log(cliente)
  }

  const [visible, setVisible] = useState<'table' | 'form'>('table')

  return (
    <div className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-purple-500 to-blue-600 text-white
    `}>
      <Layout title='Simple Registration 42 born to code'>
        {visible === 'table' ? (
        <>
        <div className="flex justify-end">
          <Button className="mb-4" color="green" onClick={() => setVisible('form')}>
            New Client
          </Button>
        </div>
       <Table 
          clientes={clientes} 
          clienteSelect={clienteSelect} 
          clienteDelete={clienteDelete}
       />
        </>
        ) : (
          <Form 
            cliente={clientes[0]}
            clienteChange={saveClient}
            cancel={() => setVisible('table')}
          />
        )}

      </Layout>
    </div>
  )
}

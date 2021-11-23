import React, { useEffect, useState } from "react"
import CollectionCliente from "../backend/db/CollectionCliente"
import Button from "../components/Button"
import Form from "../components/Form"
import Layout from "../components/Layout"
import Table from "../components/Table"
import Cliente from "../core/Cliente"
import RepositoryClient from "../core/RepositoryClient"
import useClientes from "../hooks/useClientes"

export default function Home() {

  const {
    cliente,
    clientes,
    newCliente,
    saveCliente,
    clienteSelect,
    clienteDelete,
    visibleTable,
    displayTable
  } = useClientes()

  return (
    <div className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-purple-500 to-blue-600 text-white
    `}>
      <Layout title='Simple Registration 42 born to code'>
        {visibleTable ? (
        <>
        <div className="flex justify-end">
          <Button className="mb-4" color="green" onClick={newCliente}>
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
            cliente={cliente}
            clienteChange={saveCliente}
            cancel={displayTable}
          />
        )}

      </Layout>
    </div>
  )
}

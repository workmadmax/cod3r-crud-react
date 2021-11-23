import React, { useEffect, useState } from "react"
import CollectionCliente from "../backend/db/CollectionCliente"
import Button from "../components/Button"
import Form from "../components/Form"
import Layout from "../components/Layout"
import Table from "../components/Table"
import Cliente from "../core/Cliente"
import RepositoryClient from "../core/RepositoryClient"

export default function Home() {

  const repo: RepositoryClient = new CollectionCliente()
  
  const [cliente, setCliente] = useState<Cliente>(Cliente.void())
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [visible, setVisible] = useState<'table' | 'form'>('table')

  useEffect(obterTodos, [])

  function obterTodos() {
    repo.getAll().then(cliente => {
      setClientes(clientes)
      setVisible('table')
    })
  }

  function clienteSelect(cliente: Cliente) {
    setCliente(cliente)
    setVisible('form')
  }

  async function clienteDelete(cliente: Cliente) {
    await repo.delete(cliente)
    obterTodos()
  }

  function newCliente(cliente: Cliente) {
    setCliente(Cliente.void())
    setVisible('form')
  }
  
  async function saveCliente(cliente: Cliente) {
    await repo.save(cliente)
    obterTodos()
  }


  return (
    <div className={`
      flex h-screen justify-center items-center
      bg-gradient-to-r from-purple-500 to-blue-600 text-white
    `}>
      <Layout title='Simple Registration 42 born to code'>
        {visible === 'table' ? (
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
            cancel={() => setVisible('table')}
          />
        )}

      </Layout>
    </div>
  )
}

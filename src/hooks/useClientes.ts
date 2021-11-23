import { useEffect, useState } from "react"
import CollectionCliente from "../backend/db/CollectionCliente"
import Cliente from "../core/Cliente"
import RepositoryClient from "../core/RepositoryClient"
import useTableOrForm from "./useTableOrForm"

export default function useClientes() {

    const repo: RepositoryClient = new CollectionCliente()

    const { visibleTable, displayTable, displayForm} = useTableOrForm()
  
    const [cliente, setCliente] = useState<Cliente>(Cliente.void())
    const [clientes, setClientes] = useState<Cliente[]>([])

  
    useEffect(obterTodos, [])
  
    function obterTodos() {
      repo.getAll().then(cliente => {
        setClientes(cliente)
        displayTable()
      })
    }
  
    function clienteSelect(cliente: Cliente) {
      setCliente(cliente)
      displayForm()
    }
  
    async function clienteDelete(cliente: Cliente) {
      await repo.delete(cliente)
      obterTodos()
    }
  
    function newCliente(cliente: Cliente) {
      setCliente(Cliente.void())
      displayForm()
    } 
    
    async function saveCliente(cliente: Cliente) {
      await repo.save(cliente)
      obterTodos()
    }

    return {
        cliente,
        clientes,
        newCliente,
        saveCliente,
        clienteDelete,
        clienteSelect,
        obterTodos,
        visibleTable,
        displayTable,
    }
}
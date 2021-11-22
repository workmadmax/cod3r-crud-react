import Cliente from "../core/Cliente";
import { IconEdit, IconTrash } from "./Icons";

interface TableProps {
    clientes: Cliente[]
    clienteSelect?: (cliente: Cliente) => void
    clienteDelete?: (cliente: Cliente) => void

}

export default function Table(props: TableProps) {

    const displayAction = props.clienteDelete || props.clienteSelect

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4" >Code</th>
                <th className="text-left p-4" >Name</th>
                <th className="text-left p-4" >Age</th>
                {displayAction ? <th className="p-4" >Actions</th> : false}
            </tr>
        )
    }

    function renderData() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id} className={`
                    ${i % 2 === 0 ? 'bg-purple-300' : 'bg-purple-200'}
                `}>
                    <td className="text-left p-4" >{cliente.id}</td>
                    <td className="text-left p-4" >{cliente.name}</td>
                    <td className="text-left p-4" >{cliente.age}</td>
                    {displayAction ? renderActions(cliente) : false}
                </tr>
            )
        })
    }

    function renderActions(cliente: Cliente) {
        return (
            <td className="flex justify-center">
                {props.clienteSelect ? (

                    <button onClick={() => props.clienteSelect?.(cliente)} className={`
                    flex justify-center items-center
                    text-green-600 rounded-full
                    hover:bg-purple-50 p-2 m1
                `}>
                        {IconEdit}
                    </button>
                ) : false}
                {props.clienteDelete ? (

                    <button onClick={() => props.clienteDelete?.(cliente)} className={`
                    flex justify-center items-center
                    text-red-600 rounded-full
                    hover:bg-purple-50 p-2 m1
                `}>
                        {IconTrash}
                    </button>
                ) : false}
            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`
                text-gray-50
                bg-gradient-to-r from-purple-500 to bg-purple-900
            `}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}
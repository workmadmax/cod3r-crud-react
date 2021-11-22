import { useState } from "react";
import Cliente from "../core/Cliente";
import Button from "./Button";
import Input from "./Input";

interface FormProps {
    cliente: Cliente
    clienteChange?: (cliente: Cliente) => void 
    cancel?: () => void
}

export default function Form(props: FormProps) {

    const id = props.cliente?.id
    const [name, setName] = useState(props.cliente?.name ?? '')
    const [age, setAge] = useState(props.cliente?.age ?? 0)

    return (
        <div className="">
            {id ? (
                <Input 
                    readonly
                    text="Code" 
                    value={id}
                    className="mb-4"
                />
            ) : false}
            <Input
                text="Name" 
                value={name}
                valueChange={setName}
                className="mb-4"
            />
            <Input 
                text="Age" 
                type="number" 
                value={age}
                valueChange={setAge}
            />
            <div className="flex justify-end mt-5">
                <Button color="blue" className="mr-2" onClick={() => props.clienteChange?.(new Cliente(name, +age, id))}>
                    {id ? 'Change' : 'Save'}
                </Button>
                <Button onClick={props.cancel} color="red">
                    Cancel
                </Button>
            </div>
        </div>
    )
}
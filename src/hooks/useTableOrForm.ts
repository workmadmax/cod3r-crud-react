import { useState } from "react";


export default function useTableOrForm() {
    const [visible, setVisible] = useState<'table' | 'form'>('table')

    const displayTable = () => setVisible('table')
    const displayForm = () => setVisible('form')

    return {
        visibleForm: visible === 'form',
        visibleTable: visible === 'table',
        displayTable,
        displayForm,
    }
}
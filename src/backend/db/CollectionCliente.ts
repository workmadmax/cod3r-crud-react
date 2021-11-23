import firebase from "../config";
import Cliente from "../../core/Cliente";
import RepositoryClient from "../../core/RepositoryClient";

export default class CollectionCliente implements RepositoryClient {

    #converter = {
        toFirestore(cliente: Cliente) {
            return {
                name: cliente.name,
                age: cliente.age,
            }
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.name, dados.age, snapshot.id)
        }
    }

    async save(cliente: Cliente): Promise<Cliente> {
        if (cliente?.id) {
            await this.#collection().doc(cliente.id).set(cliente)
            return cliente
        } else {
            const docRef = await this.#collection().add(cliente)
            const doc = await docRef.get()
            return doc.data()
        }
    }

    async delete(cliente: Cliente): Promise<void> {
        return this.#collection().doc(cliente.id).delete()
    }

    async getAll(): Promise<Cliente[]> {
        const query = await this.#collection().get()
        return query.docs.map(doc => doc.data()) ?? []
    }

    #collection() {
        return firebase.firestore().collection('clientes').withConverter(this.#converter)
    }
}
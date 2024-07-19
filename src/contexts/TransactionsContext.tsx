import { createContext, useEffect, useState } from 'react'

interface Transaction {
	id: number
	description: string
	type: 'income' | 'outcome'
	price: number
	category: string
	createdAt: string
}

interface TransactionContextType {
	transactions: Transaction[]
	fetchTransaction: (query: string) => Promise<void>
}

interface TransactionsProviderProps {
	children: React.ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([])

	async function fetchTransaction(query?: string) {
		const url = new URL('http://localhost:3000/transactions')

		if (query) {
			url.searchParams.append('q', query)
		}
		const response = await fetch(url)
		const data = await response.json()

		setTransactions(data)
	}

	useEffect(() => {
		fetchTransaction()
	}, [])
	return (
		<TransactionContext.Provider value={{ transactions, fetchTransaction }}>
			{children}
		</TransactionContext.Provider>
	)
}

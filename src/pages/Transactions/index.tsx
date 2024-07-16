import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
	PriceHighLight,
	TransactionsContainer,
	TransactionsTable,
} from './styles'

interface Transaction {
	id: number
	description: string
	type: 'income' | 'outcome'
	price: number
	category: string
	createdAt: string
}

export function Transactions() {
	const [transactions, setTransactions] = useState<Transaction[]>([])
	useEffect(() => {
		fetch('http://localhost:3000/transactions').then(response =>
			response.json().then(data => setTransactions(data)),
		)
	}, [])

	return (
		<div>
			<Header />
			<Summary />

			<TransactionsContainer>
				<SearchForm />
				<TransactionsTable>
					<tbody>
						{transactions.map(transaction => (
							<tr key={transaction.id}>
								<td width={'50%'}>{transaction.description}</td>
								<td>
									<PriceHighLight variant={transaction.type}>
										{transaction.price}
									</PriceHighLight>
								</td>
								<td>{transaction.category}</td>
								<td>{transaction.createdAt}</td>
							</tr>
						))}
					</tbody>
				</TransactionsTable>
			</TransactionsContainer>
		</div>
	)
}

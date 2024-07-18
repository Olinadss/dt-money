import * as Dialog from '@radix-ui/react-dialog'
import * as zod from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	CloseButton,
	Content,
	Overlay,
	TransactionType,
	TransactionTypeButton,
} from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

const newTransactionFormSchema = zod.object({
	description: zod.string(),
	price: zod.number(),
	category: zod.string(),
	type: zod.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = zod.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
	const {
		control,
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<NewTransactionFormInputs>({
		resolver: zodResolver(newTransactionFormSchema),
	})

	async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
		await new Promise(resolve => setTimeout(resolve, 2000))

		console.log(data)
	}

	return (
		<Dialog.Portal>
			<Overlay className='overlay' />
			<Content>
				<Dialog.Title>Nova Transação</Dialog.Title>

				<CloseButton>
					<X size={24} />
				</CloseButton>

				<form onSubmit={handleSubmit(handleCreateNewTransaction)}>
					<input
						type='text'
						placeholder='Descrição'
						required
						{...register('description')}
					/>
					<input
						type='number'
						placeholder='Preço'
						required
						{...register('price', { valueAsNumber: true })}
					/>
					<input
						type='text'
						placeholder='Categoria'
						required
						{...register('category')}
					/>

					<Controller
						control={control}
						name='type'
						render={({ field: { onChange, value } }) => (
							<TransactionType onValueChange={onChange} value={value}>
								<TransactionTypeButton
									variant='income'
									type='button'
									value='income'
								>
									<ArrowCircleUp size={24} /> Entrada
								</TransactionTypeButton>
								<TransactionTypeButton
									variant='outcome'
									type='button'
									value='outcome'
								>
									<ArrowCircleDown size={24} /> Saída
								</TransactionTypeButton>
							</TransactionType>
						)}
					/>

					<button type='submit' disabled={isSubmitting}>
						Cadastrar
					</button>
				</form>
			</Content>
		</Dialog.Portal>
	)
}

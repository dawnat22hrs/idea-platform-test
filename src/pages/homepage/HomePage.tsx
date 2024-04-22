import { useState, useEffect } from 'react'
import style from './homepage.module.scss'
import data from '../../entities/tickets.json'
import { ITicket, Ticket } from '../../components/ticket/Ticket'
import { Controller } from '../../components/controller/Controller'
import { INumberOfTransfer } from '../../types/interfaces'

const numberOfTransfer: INumberOfTransfer[] = [
    {
        id: -1,
        number: 'Все'
    },
    {
        id: 0,
        number: 'Без пересадок'
    },
    {
        id: 1,
        number: '1 пересадка'
    },
    {
        id: 2,
        number: '2 пересадки'
    },
    {
        id: 3,
        number: '3 пересадки'
    },
]

export const HomePage = () => {
    const [selectedUnit, setSelectedUnit] = useState<number>(0)
    const [activeNumeberTransfer, setActiveNumeberTransfer] = useState<number[]>([])
    const [ tickets, setTickets] = useState<ITicket[]>([...data.tickets])

    const clickInput = (id: number) => {
        if (!activeNumeberTransfer.includes(id) && id !== -1) {
          setActiveNumeberTransfer([...activeNumeberTransfer, id])
          if (activeNumeberTransfer.length === numberOfTransfer.length - 2) {
            setActiveNumeberTransfer([...activeNumeberTransfer, -1, id])
          }
        } else if (id === -1 && !activeNumeberTransfer.includes(id)) {
          const newActiveNumeberTransfer = numberOfTransfer.reduce<number[]>(
            (acc, item) =>
              !acc.includes(item.id)
                ? [...acc, item.id]
                : acc,
            []
          )
          setActiveNumeberTransfer(newActiveNumeberTransfer)
        } else if (id === -1 && activeNumeberTransfer.includes(id)) {
          setActiveNumeberTransfer([])
        } else {
          setActiveNumeberTransfer(activeNumeberTransfer.filter((i) => i !== id).filter((i) => i !== -1))
        }
    }

    useEffect(() => {
        if (!activeNumeberTransfer.length) {
          setTickets([...data.tickets])
        } else {
          const filteredTickets = data.tickets.filter((ticket) =>
            activeNumeberTransfer.includes(ticket.stops)
          )
          setTickets(filteredTickets)
        }
      }, [activeNumeberTransfer])
 
    return (
        <main className={style.main}>
            <div className={style.content}>
                <Controller setSelectionUnitAction={setSelectedUnit} activeNumeberTransfer={activeNumeberTransfer} selectedUnit={selectedUnit} clickCheckbox={clickInput} numberOfTransfer={numberOfTransfer} />
                <div className={style.tickets}>
                    {
                        tickets.map((ticket: ITicket, index: number) => <Ticket key={index} {...ticket} unit={selectedUnit}/>)
                    }
                </div>
            </div>
        </main>
    )
}
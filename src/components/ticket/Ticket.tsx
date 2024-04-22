import { CURRENCIES } from '../../types/enums'
import style from './ticlet.module.scss'
import moment from 'moment'

export interface ITicket {
    origin: string,
    origin_name: string,
    destination: string,
    destination_name: string,
    departure_date: string,
    departure_time: string,
    arrival_date: string,
    arrival_time: string,
    carrier: string,
    stops: number,
    price: number,
    unit?: number,
}

export const Ticket = ({ origin, origin_name, destination, destination_name, departure_date, departure_time, arrival_date, arrival_time,stops, price, unit }: ITicket) => {
    let unitValue = 1

    switch(unit) {
        case 0:
            unitValue = CURRENCIES.RUB
            break
        case 1:
            unitValue = CURRENCIES.USD
            break
        case 2:
            unitValue = CURRENCIES.EUR
            break
    }

    return (
        <div className={style.ticket}>
            <div className={style.buyBlock}>
                <div className={style.title}>
                    <h3>TURKISH AIRLINES</h3>
                </div>
                <button className={style.btn} onClick={() => console.log(`Ура! Вы купили билет в ${destination_name}`)}><span>Купить</span><span>за {unit ? (price * unitValue).toFixed(2) : price}</span></button>
            </div>
            <div className={style.info}>
                <div className={style.timeBlock}>
                    <span className={style.time}>{departure_time}</span>  
                    <div className={style.line}>{stops} пересадка <div className={style.triangle}/></div>
                    <span className={style.time}>{arrival_time}</span>
                </div>
                <div className={style.data}>
                    <div className={style.container}>
                        <span className={style.bold}>{origin}, {origin_name}</span>
                        <span className={style.date}>{moment(departure_date, "DD.MM.YY").format("DD MMMM YYYY, ddd")}</span>
                    </div>
                    <div className={style.container}>
                        <span className={style.bold}>{destination}, {destination_name}</span>
                        <span className={style.date}>{moment(arrival_date, "DD.MM.YY").format("DD MMMM YYYY, ddd")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
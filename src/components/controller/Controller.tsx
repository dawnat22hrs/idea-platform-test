import style from './controller.module.scss'
import { IUnit, INumberOfTransfer } from '../../types/interfaces'
import { CURRENCIES } from '../../types/enums'

interface IController {
    selectedUnit: number,
    setSelectionUnitAction: (value: number) => void,
    numberOfTransfer: INumberOfTransfer[],
    activeNumeberTransfer: number[],
    clickCheckbox: (id: number) => void,
}

const units: IUnit[] = [
    {
        id: 0,
        unit: 'RUB',
        value: CURRENCIES.RUB,
    },
    {
        id: 1,
        unit: 'USD',
        value: CURRENCIES.USD,
    },
    {
        id: 2,
        unit: 'EUR',
        value: CURRENCIES.EUR,
    },
]

export const Controller = ({ setSelectionUnitAction, selectedUnit, clickCheckbox, numberOfTransfer, activeNumeberTransfer }:IController) => {

    const getActive = (id: number) => selectedUnit === id ? {color: '#FFF', background: '#0ea5e9', outline: '1px solid #0ea5e9'} : {}

    return (
        <div className={style.controller}>
            <div className={style.currency}>
                <span>ВАЛЮТА</span>
                <div className={style.units}>
                    {units.map((item: IUnit) => <div key={item.id} className={style.unit} style={getActive(item.id)} onClick={() => setSelectionUnitAction(item.id)}>{item.unit}</div>)}
                </div>
            </div>
            <div className={style.numberOfTransferBlock}>
                <span>КОЛИЧЕСТВО ПЕРЕСАДОК</span>
                <ul className={style.numberOfTransfer}>
                    {
                        numberOfTransfer.map((item: INumberOfTransfer) => <li key={item.id} ><input type='checkbox' checked={activeNumeberTransfer.includes(item.id)} id={item.id.toString()} onChange={() => clickCheckbox(item.id)} className={style.checkbox}/><div className={style.customCheckIcon}/> <label className={style.checkboxLabel} htmlFor={item.id.toString()}>{item.number}</label><span className={style.mark}>ТОЛЬКО</span></li>)
                    }
                </ul>
            </div> 
        </div>
    )
}
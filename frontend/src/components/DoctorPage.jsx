import NavBar from "./NavBar.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

const pacientsFetchInit = 'PACIENTS_FETCH_INIT'
const pacientsFetchSuccess = 'PACIENTS_FETCH_SUCCESS'
const pacientsFetchFailure = 'PACIENTS_FETCH_FAILURE'
const PACIENTS_QUERY = 'https://supraorbital-unindemnified-ettie.ngrok-free.dev/agendamentos'


const pacientsReducer = (state,action) => {
    switch(action.type){
      case pacientsFetchInit:
        return {...state,isLoading:true,isError:false,};
      case pacientsFetchSuccess:
        return{...state,isLoading:false,isError:false,data:action.payload,}
      case pacientsFetchFailure:
        return{...state,isLoading:false,isError:true,}
      default:
        throw new Error()
    }
}

const driversFetchInit = 'drivers_FETCH_INIT'
const driversFetchSuccess = 'drivers_FETCH_SUCCESS'
const driversFetchFailure = 'drivers_FETCH_FAILURE'
const DRIVERS_QUERY = 'https://supraorbital-unindemnified-ettie.ngrok-free.dev/motorista'

const UPDATE_SCHEDULE_QUERY = 'https://supraorbital-unindemnified-ettie.ngrok-free.dev/agendamento/atualizarAgendamento/';

const driversReducer = (state,action) => {
    switch(action.type){
      case driversFetchInit:
        return {...state,isLoading:true,isError:false,};
      case driversFetchSuccess:
        return{...state,isLoading:false,isError:false,data:action.payload,}
      case driversFetchFailure:
        return{...state,isLoading:false,isError:true,}
      default:
        throw new Error()
    }
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default function DoctorPage() {

    const [pacients, dispatchPacients] = React.useReducer(pacientsReducer,{data:[],isLoading:false,isError:false});
    const [drivers, dispatchDrivers] = React.useReducer(driversReducer, {data:[], isLoading:false, isError:false});

    
    const [isOpen, setIsOpen] = useState(false);

    const [notification, setNotification] = useState(false);

    useEffect(() => {
        dispatchPacients({ type: pacientsFetchInit });
        axios.get(PACIENTS_QUERY, {'headers': { 'ngrok-skip-browser-warning': '1' } })
        .then((result) => {
                console.log(result)
                dispatchPacients({
                    type: pacientsFetchSuccess,
                    payload: result.data,
                });
            })
            .catch(() =>
                dispatchPacients({ type: pacientsFetchFailure })
            );
    }, []);
    

    
    useEffect(() => {
        dispatchDrivers({ type: driversFetchInit });
        axios.get(DRIVERS_QUERY, {'headers': { 'ngrok-skip-browser-warning': '1' } })
        .then((result) => {
                console.log(result)
                dispatchDrivers({
                    type: driversFetchSuccess,
                    payload: result.data,
                });
            })
            .catch(() =>
                dispatchPacients({ type: driversFetchFailure })
            );
    }, []);

    const escolherMotorista = () => {
        setIsOpen(false);
        setNotification(true);

        setTimeout(() => setNotification(false), 3000);

        atualizarAgendamento(id,data);
    };

    const atualizarAgendamento = (id, data) => {
        axios.put(UPDATE_SCHEDULE_QUERY + id, data)
    }
    
    return (
        <>
        <header>
            <NavBar />
        </header>

        <section>
            <article className="flex flex-col gap-8 jutify-center m-10">
                    {pacients.data.slice(0, 7).map((pacient) => {
                        return (
                            <section key={pacient.id}>
                                <p className="bg-white rounded-md px-10 py-5 flex flex-row justify-between items-center">
                                    <span className="font-bold">AGENDAMENTO: {pacient.nomepaciente}</span>
                                    <button onClick={() => setIsOpen(true)} className="bg-black text-white rounded-lg px-5 py-3">
                                        CONFIRMAR
                                    </button>
                                </p>
                            </section>
                        )
                    })}

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <h2 className="text-xl font-bold mb-4">MOTORISTAS DISPONÍVEIS</h2>
                    {drivers.data.slice(0, 5).map((driver) => {
                        return (
                            <div>
                            <p className="bg-white rounded-md px-10 py-5 flex flex-row justify-between gap-20 items-center">
                            <span className="font-bold">{driver.nome}</span>
                            <button onClick={escolherMotorista} className="bg-black text-white rounded-lg px-5 py-3">ESCOLHER</button>
                            </p>
                            </div>
                        )
                    })}
                </Modal>
                {notification && (
                    <div className="fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
                        Motorista escolhido com sucesso! 🚗
                    </div>
                )}
            </article>
            <article>
                
            </article>
        </section>
        </>
    )
}

import React, { useEffect } from "react";
import NavBar from "./NavBar.jsx";
import axios from "axios";

const agendamentosFetchInit = 'AGENDAMENTOS_FETCH_INIT'
const agendamentosFetchSuccess = 'AGENDAMENTOS_FETCH_SUCCESS'
const agendamentosFetchFailure = 'AGENDAMENTOS_FETCH_FAILURE'
const AGENDAMENTOS_QUERY = 'https://hamza-malacoid-vanesa.ngrok-free.dev/agendamentos'

const agendamentosReducer = (state,action) => {
    switch(action.type){
      case agendamentosFetchInit:
        return {...state,isLoading:true,isError:false,};
      case agendamentosFetchSuccess:
        return{...state,isLoading:false,isError:false,data:action.payload,}
      case agendamentosFetchFailure:
        return{...state,isLoading:false,isError:true,}
      default:
        throw new Error()
    }
}

export default function PacientPage() {
    const [agendamentos, dispatchAgendamentos] = React.useReducer(agendamentosReducer, {data:[],isLoading:false,isError:false});

    useEffect(() => {
      dispatchAgendamentos({ type: agendamentosFetchInit });;
      axios.get(AGENDAMENTOS_QUERY, { headers: { 'ngrok-skip-browser-warning': '1' } })
           .then((result) => {
              dispatchAgendamentos({ type: agendamentosFetchSuccess, payload: result.data });
           })
           .catch(() =>{
            dispatchAgendamentos({ type: agendamentosFetchFailure });
           })
    }, []);

    console.log(agendamentos);
     
    return (
        <>
        <header>
            <NavBar />
        </header>
        <div className="flex justify-around" >
        <form className="w-40 ml-20 mt-5">
            <h2 className="text-center text-3xl text-white bg-black mt-20 w-100 mb-5">AGENDE SUA CORRIDA</h2>
            <p className="text-xl text-center  bg-black text-white">DATA</p>
            <input className="bg-white rounded-md w-100 "  type="text" />

            <p className="text-xl text-center  bg-black text-white mt-3">HORA</p>
            <input className="bg-white rounded-md w-100 "  type="text" />

            <p className="text-xl text-center  bg-black text-white mt-3">MOTIVO</p>
            <input className="bg-white rounded-md w-100" type="text" />

            <p className="text-xl text-center  bg-black text-white mt-3">JUSTIFICATIVA</p>
            <input className="bg-white rounded-md w-100" type="text" />
            
        </form>
        <section className="rounded-xl bg-black  w-lg mt-22">
            <h2 className="text-center text-3xl text-white mt-5">AGENDAMENTOS</h2>
            <p className="text-center text-xl text-white mt-5">Abaixo estão listados todos os seus agendamentos</p>
            {agendamentos.data.slice(0, 5).map((agendamento) => {
                return (
                    <section key={agendamento.key}>
                        <p className="bg-white text-black rounded-md mt-10 px-10 py-5 flex flex-row justify-between items-center">{agendamento.motivo}</p>
                    </section>
                )
            })}
        </section>
        </div>
        </>
    )
}

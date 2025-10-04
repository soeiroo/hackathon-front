import NavBar from "./NavBar.jsx";

const agendamentosFetchInit = 'AGENDAMENTOS_FETCH_INIT'
const agendamentosFetchSuccess = 'AGENDAMENTOS_FETCH_SUCCESS'
const agendamentosFetchFailure = 'AGENDAMENTOS_FETCH_FAILURE'
const AGENDAMENTOS_QUERY = 'https://supraorbital-unindemnified-ettie.ngrok-free.dev/agendamentos'

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
    return (
        <>
        <header>
            <NavBar />
        </header>
        <h2 className="text-center text-3xl text-white bg-black mt-20 w-100 ml-20">AGENDE SUA CORRIDA</h2>
        <form className="w-40 ml-20 mt-5">
            <p className="text-xl text-center  bg-black text-white">DATA</p>
            <input className="bg-white rounded-md w-100 "  type="text" />

            <p className="text-xl text-center  bg-black text-white mt-3">HORA</p>
            <input className="bg-white rounded-md w-100 "  type="text" />

            <p className="text-xl text-center  bg-black text-white mt-3">MOTIVO</p>
            <input className="bg-white rounded-md w-100" type="text" />

            <p className="text-xl text-center  bg-black text-white mt-3">JUSTIFICATIVA</p>
            <input className="bg-white rounded-md w-100" type="text" />
            
        </form>
        <section className="bg-white rounded-xl my-20">
        </section>
        </>
    )
}

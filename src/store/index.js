import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas:[],
    tarea: {
      id:'',
      nombre:'',
      categorias: [],
      estado:'',
      numero:0
    }
  },
  mutations: {
    set(state, payload){
      state.tareas.push(payload)
      localStorage.setItem('tareas', JSON.stringify(state.tareas))
      //console.log(state.tareas);
    },
    // se crea un filtro que al presionar eliminar crea un array sin el elmento que se pincho
    eliminar(state , payload){
      state.tareas = state.tareas.filter(item => item.id !== payload)
      localStorage.setItem('tareas', JSON.stringify(state.tareas))
    },
    // actualizar
    tarea(state, payload){ // payload es mi id es tarea
      if(!state.tareas.find(item => item.id === payload)){ // si no encuentra la tarea o el Id
        router.push('/')
      }else{
        state.tarea = state.tareas.find(item => item.id === payload)
      }
    },
    update(state, payload){ // payload es el obj tareas
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
      localStorage.setItem('tareas', JSON.stringify(state.tareas))
    },
    cargar(state, payload){
      state.tareas = payload
    }
  },
  actions: {
    cargarLocalStorage({commit}){  // final ,para almacenar en el navegador
      if(localStorage.getItem('tareas')){
        const tareas = JSON.parse(localStorage.getItem('tareas'))
        commit('cargar' , tareas)
        return
      }
      localStorage.setItem('tareas', JSON.stringify([]))
    },
    setTareas({commit}, tarea){
      commit('set',tarea)
    },
    deleteTareas({commit}, id){
      commit('eliminar', id)
    },
    // actualizar
    setTarea({commit}, id){
      commit('tarea', id)
    },
    updateTarea({commit}, tarea){
      commit('update', tarea)
    }
  },
  modules: {
  }
})

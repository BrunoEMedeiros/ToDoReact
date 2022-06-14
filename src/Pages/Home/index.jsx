import { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../../Components/Card'

export function Home() {

  const [studantName, setStudantName] = useState('Coloque seu nome');
  const [students, setStudants] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: ''});

  function handleAddStudent(){
    const newStudent = {
      name: studantName,
      time: new Date().toLocaleTimeString("pt-br", 
       {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
       }
      )
    };

    setStudants(prevState => [...prevState, newStudent]);
  }

  useEffect(() =>{

    async function fetchData(){
      const res = await fetch('https://api.github.com/users/BrunoEMedeiros');
      const data = await res.json();
      setUser(
        {
          name: data.login,
          avatar: data.avatar_url
        }
      )
    }

    fetchData();
    
  }, [students])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder='Digite o nome...' 
        onChange={e => setStudantName(e.target.value)}
      />

      <button type='button' onClick={handleAddStudent}>
        Adicionar
      </button>
      {
        students.map(estudante => (
          <Card
            key={estudante.time} 
            name={estudante.name} 
            time={estudante.time}
          />
        ))
      }
    </div>
  )
}
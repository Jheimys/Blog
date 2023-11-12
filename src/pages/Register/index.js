import { useState } from 'react'
import styles from './Register.module.css'

const Register = () => {
  const [displayname, setDisplayname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setComfirmPassword] = useState('')
  const [error , setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')

    const user ={
      displayname,
      email,
      password
    }

    if(password !== confirmPassword){
      setError('As senhas precisam ser iguais!')
    }

    console.log(user)

  }

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            name="displayname"
            required
            placeholder="Nome do usuário"
            value={displayname}
            onChange={(e) => setDisplayname(e.target.value)}
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="email"
            name="email"
            required
            placeholder="E-mail do usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            name="password"
            required
            placeholder="Isira sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <span>Confimação de senha:</span>
          <input
            type="password"
            name="confirmPassword"
            required
            placeholder="Confirme a sua senha"
            value={confirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
          />
        </label>
        <button className="btn">Cadastrar</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Register
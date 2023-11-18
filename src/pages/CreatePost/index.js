import React, { useState } from 'react'
import styles from './CreatePost.module.css'
import { useInsertDocuments } from '../../hooks/useInsertDocuments'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError,  setFormError] = useState('')

  const { insertDocument, response } = useInsertDocuments('posts')

  const {user} = useAuthValue()
  console.log("User:", user)
  

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    setFormError('')

    //validar img URL
    try {
      new URL(image)

    } catch (error) {
      setFormError('A imagem precisa ser um URL')
    }

    //criar array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //checar os valores
    if(!title || !image || !tags || !body){
      setFormError('Por favor, preencha todos os campos!')
    }

    if(formError) return
    
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

   
    //redirect to home page
    navigate('/')
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o quiser e compartilhe seu conhecimento</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input 
            type='text'
            name='title'
            value={title}
            placeholder='Pense em um bom título...'
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input 
            type='text'
            name='image'
            value={image}
            placeholder='Insira uma imagem que representa seu post'
            required
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          <span>Conteúdos:</span>
          <textarea 
            name='body'
            value={body}
            placeholder='Insira o conteúdo do post'
            required
            onChange={(e) => setBody(e.target.value)}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type='text'
            name='tags'
            value={tags}
            placeholder='Insira as tags separadas por vígulas'
            required
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        {!response.loading && <button className="btn" > 
          Cadastrar 
        </button>}

        {response.loadind && <button className="btn" disabled> Aguarde...</button> }

        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
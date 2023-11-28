import React, { useEffect, useState } from 'react'
import styles from './EditPost.module.css'
import { useUpDateDocuments } from '../../hooks/useUpdateDocuments'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError,  setFormError] = useState('')

  const { updateDocument, response } = useUpDateDocuments('posts')

  useEffect(() => {
    if(post){
      setTitle(post.title)
      setBody(post.body)
      setImage(post.image)

      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }

  }, [post])

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
    
    const data = { 
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

   
    //redirect to home page
    navigate('/dashboard')
  }

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando Post</h2>
      <p>Altere os dados do post</p>
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
        <p className={styles.preview_title}>Preview da imagem atual:</p>
        <img 
          className={styles.image_preview}
          src={post.image}
          alt={post.title}
        />
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
          Editar 
        </button>}

        {response.loadind && <button className="btn" disabled> Aguarde...</button> }

        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
        </>
      )}
    </div>
  )
}

export default EditPost
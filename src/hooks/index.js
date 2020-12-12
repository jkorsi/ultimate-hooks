import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) =>
{
  const [value, setValue] = useState('')

  const onChange = (event) =>
  {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

function getId()
{
  return Math.floor(Math.random() * 1000000)
}

//USE RESOURCE
export const useResource = (baseUrl) =>
{ 
  const [resources, setResources] = useState([])
  console.log('Resources:', resources)


  //CREATE
  const create = async (newObject) =>
  {
    console.log('Creating.. New object:', newObject)
    const objectWithId = {
      ...newObject,
      id: getId()
    }
    console.log('Creating.. New object with id:', objectWithId)

    const response = await axios.post(baseUrl, objectWithId)
    console.log('Response:', response)
    setResources(resources.concat(response.data))    
  }

  const service = {
    create
  }

  //EFFECT AND GETALL
  useEffect(() =>
  {
    const getAll = async () =>
    {
      const response = await axios.get(baseUrl)
      console.log('Response data:', response.data)
      setResources(response.data)
    }
    getAll()
  }, [baseUrl])

  return [
    resources, service
  ]
}
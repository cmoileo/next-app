"use client"
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import {Input, Textarea, Button, Select, SelectItem} from "@nextui-org/react";

const PostForm = () => {
  const { register, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data.body);
    } catch (error) {
      throw error
    }
  }
  
  const onSubmit = async (data) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
     throw error
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input key={"default"} {...register('title')} id="title" type="text" label="Titre" />
      </div>

      <div>
        <Textarea {...register('content')} id="content" label="Contenu" />
      </div>

      <div>
        <Select 
          label="Catégorie" 
          {...register('categoryId')} id="categoryId"
        >
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div>
        <Input {...register('picture')} id="picture" type="text" label="URL de l'image" />
      </div>

      <Button type='submit' size="lg">
        Enregistrer
      </Button> 
    </form>
  );
};

export default PostForm;
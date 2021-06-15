import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chat from '../../img/comments.svg'

//Definição das validações de cada campo
const validationSchema = yup.object({
  email: yup
    .string('Digite seu email')
    .email('DIgite um email válido')
    .required('Email é obrigatório'),
  name: yup
    .string('Digite seu nome')
    .required('Campo obrigatório'),
  comment: yup
    .string('Digite seu comentário')
    .required('Campo obrigatório')
});

//função que renderiza os campos utilizando formik e material-UI
function FormComment({ clicked }) {
  const formik = useFormik({
    //define os valores iniciais
    initialValues: {
      name: '',
      email: '',
      comment: '',
    },

    //importa as validações
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //passei essa função que seguem como gatilho pra atualizar a lista de comentários
      clicked({ clicked: true });

      //Passos
      //1º - cria-se a variável comments como um array vazio
      //2º - verifica se já tem algo na storage do navegador caso sim ele 
      //adiciona a variavel criada
      //3º - sobrescreve no storage do navegador o novvo array com os novos 
      //valores e os antigos caso existissem
      //Obs: a Função stringify transforma todo o array para o formato string
      //possibilitando ele ser salvo no storage do navegador. Por outro lado, 
      //o JSON.parce é responsavel por recuperar essa variável ao seu formato
      // original

      let comments = []
      if (localStorage.getItem('comment')) {
        comments = JSON.parse(localStorage.getItem('comment'))
      }
      localStorage.setItem('comment',
        JSON.stringify([...comments,
        {
          name: values.name,
          email: values.email,
          comment: values.comment,
          thumbsUp: '0',
          thumbsDown: '0',
        }]))

    },
  });

  return (
    // Aqui é renderizado o form, faz-se uso do material-ui, afim de agilizar 
    //com processo de contrução, toda documentação pode ser encontrada aqui:
    // https://material-ui.com/pt/

    <div>
      <div className='categories'>
        <img src={Chat} alt="" />
        <h3>
          Movies
        </h3>
      </div>
      <form
        className='form'
        onSubmit={formik.handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <TextField
            id="name"
            name="name"
            label="Nome"
            type="text"
            variant="outlined"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
        <TextField
          fullWidth
          id="comment"
          name="comment"
          label="Comentário"
          type="text"
          multiline
          rows={4}
          margin="normal"
          variant="outlined"
          value={formik.values.comment}
          onChange={formik.handleChange}
          error={formik.touched.comment && Boolean(formik.errors.comment)}
          helperText={formik.touched.comment && formik.errors.comment}
        />

        <Button
          className='post-button'
          variant="contained"
          fullWidth
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default FormComment
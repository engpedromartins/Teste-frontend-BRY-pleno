import React, { useEffect, useState } from 'react';

import User from '../../img/comment-user.svg'
import ThumbsUp from '../../img/thumbs-up.svg'
import ThumbsDown from '../../img/thumbs-down.svg'

function CommentList(handleUpdate) {
  // 1ª pega os comentarios do storage do navegador e armazena na variavel lista
  // 2ª seta a variavel lista como o valor inicial da variavel de estado listComent de trás pra frente
  const list = JSON.parse(localStorage.getItem('comment'))
  const [listComment, setListcomment] = useState(list?.reverse())

  //função que atualiza a lista de comentarios sempre que o handleupdate é chamado
  useEffect(() => {
    let newList = JSON.parse(localStorage.getItem('comment'))
    setListcomment(newList?.reverse())
  }, [handleUpdate])

  // função que decrementa o contador de "likes"
  function setThumbsDown(obj) {
    const index = listComment.indexOf(obj)
    let newList = listComment.slice()
    let count = obj.thumbsDown

    newList[index].thumbsDown = count - 1
    localStorage.setItem('comment', JSON.stringify(newList.reverse()))

    setListcomment(newList.reverse())
  }

  //função que incrementa o contador de "Likes"
  function setThumbsUp(obj) {
    const index = listComment.indexOf(obj)
    let newList = listComment.slice()
    let count = parseInt(obj.thumbsUp)

    newList[index].thumbsUp = count + 1
    localStorage.setItem('comment', JSON.stringify(newList.reverse()))

    setListcomment(newList.reverse())
  }


  return (
    //varre a variavel lisComment é monta o html com a descrição de cada campo...
    <div>

      {listComment?.map((comment) => {
        return (
          <div key={comment.name} className='box-comment'>
            <img src={User} alt="" />
            <div style={{
              display: 'flex', flexDirection: 'column'
            }}>
              <p>
                {comment.comment}
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                alignItems: 'center',
                margin: '0px'
              }}>
                <button className='btn-down' onClick={() => setThumbsDown(comment)}>
                  <b>{comment.thumbsDown}</b>  <img src={ThumbsDown} alt="" />
                </button>
                <button className='btn-up' onClick={() => setThumbsUp(comment)}>
                  <b>{comment.thumbsUp}</b> <img src={ThumbsUp} alt="" />
                </button>

              </div>
            </div>
          </div>
        )
      }
      )}
    </div>
  )
}
export default CommentList
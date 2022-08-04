//メモのタイトルとコンテンツを表示するコンポーネント
import React from 'react'
import { Memo } from '../models/models'
import { Input, TextField } from '@mui/material'
import '../styles/ShowMemo.css'
import { deleteMemo, saveMemo } from './api'

interface props {
  memo: Memo
  setMemo: React.Dispatch<React.SetStateAction<Memo>>
  categId: number
  token: string
  canSave: boolean
  canDelete: boolean
}

const ShowMemo: React.FC<props> = ({
  memo,
  setMemo,
  categId,
  token,
  canSave,
  canDelete,
}) => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  React.useEffect(() => {
    setTitle(memo.title)
    setContent(memo.content)
  }, [memo])

  const handleSaveMemo = async () => {
    try {
      await saveMemo(memo.id, title, content, token, categId)
    } catch (error) {
      console.warn(error)
    }
  }

  const handleDeleteMemo = async () => {
    try {
      await deleteMemo(memo.id, token)
      const emptyMemo = { id: 0, categoryId: 0, title: '', content: '' }
      setMemo(emptyMemo)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <div className="show-memo">
      <label key={memo.id}>
        <div>Title</div>
        <Input
          type="text"
          id="memo-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!canSave}
          fullWidth
        />
        <div>Content</div>
        <TextField
          id="memo-content"
          variant="standard"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={!canSave}
          fullWidth
        />
      </label>
      <div>
        <button
          id="save-memo"
          disabled={!canSave}
          onClick={() => handleSaveMemo()}
        >
          SAVE
        </button>
        <button
          id="delete-memo"
          disabled={!canDelete}
          onClick={() => handleDeleteMemo()}
        >
          DELETE
        </button>
      </div>
    </div>
  )
}

export default ShowMemo

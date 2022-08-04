//カテゴリー・メモの一覧を表示するコンポーネント
//TODO:
//１つのカテゴリーを選択した後、別のカテゴリーを選択すると元々選択していたカテゴリーが展開されたままになるので、
//カテゴリーごとに縮小・展開の状態用のisOpen(src/models/models.tsに定義)を持っておくようにする
import React from 'react'
import '../styles/TreeNode.css'
import { addMemo, fetchCategories, fetchMemo, fetchMemoTitles } from './api'
import { Memo, Category, MemoTitle } from '../models/models'
import DescriptionIcon from '@mui/icons-material/Description'

interface props {
  setMemo: React.Dispatch<React.SetStateAction<Memo>>
  categId: number
  setCategId: React.Dispatch<React.SetStateAction<number>>
  token: string
}

const TreeNode: React.FC<props> = ({ setMemo, categId, setCategId, token }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const [categories, setCategories] = React.useState<Category[]>([])
  const [memoTitles, setMemoTitles] = React.useState<MemoTitle[]>([])

  //展開・縮小を管理する
  const handleOpenCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOpen(e.target.checked)
  }
  React.useEffect(() => {
    fetchCategories(token)
      .then(setCategories)
      .catch((error) => console.warn(error))
  }, [])

  const handleCategoryClick = async (_categoryId: number) => {
    try {
      await fetchMemoTitles(_categoryId, token).then(setMemoTitles)
      setCategId(_categoryId)
    } catch (error) {
      console.warn(error)
    }
  }

  const handleShowMemo = async (memoId: number) => {
    try {
      await fetchMemo(memoId, token).then(setMemo)
    } catch (error) {
      console.warn(error)
    }
  }

  const handleAddMemo = async () => {
    try {
      const newMemo = {
        id: Date.now(),
        categoryId: categId,
        title: 'new',
        content: 'new',
      }
      await addMemo(newMemo, token, categId)
      setMemo(newMemo)
    } catch (error) {
      console.warn(error)
    }
  }

  return (
    <>
      <div className="TreeNode">
        {categories.map((category) => (
          <label key={category.id} id={`category-${category.id}`}>
            <input
              type="checkbox"
              onChange={handleOpenCategory}
              onClick={() => handleCategoryClick(category.id)}
            />
            <span
              className="TreeNode_icon "
              id={`category-${category.id}-title`}
            />
            {category.name}
            {isOpen &&
              category.id === categId &&
              memoTitles.map((memoTitle) => (
                <div key={memoTitle.id} id={`memo-${memoTitle.id}`}>
                  <DescriptionIcon />
                  <input
                    type="submit"
                    value={memoTitle.title}
                    onClick={() => handleShowMemo(memoTitle.id)}
                  />
                </div>
              ))}
          </label>
        ))}
        <button
          id="new-memo"
          disabled={!isOpen}
          onClick={() => handleAddMemo()}
        >
          NEW
        </button>
      </div>
    </>
  )
}

export default TreeNode

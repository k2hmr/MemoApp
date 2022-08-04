import React from 'react'
import { Memo } from '../models/models'
import '../styles/App.css'
import TreeNode from './TreeNode'
import ShowMemo from './ShowMemo'
import Login from './Login'
import { Grid, Paper, styled, Box } from '@mui/material'

const GridItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  padding: theme.spacing(0.5),
  color: theme.palette.text.secondary,
}))

function App() {
  const [memo, setMemo] = React.useState<Memo>({
    id: 0,
    categoryId: 0,
    title: '',
    content: '',
  })
  const [isLoggedin, setIsLoggedin] = React.useState<boolean>(false)
  const [token, setToken] = React.useState<string>('')
  //コンポーネント間で使用するカテゴリーID
  const [categId, setCategId] = React.useState<number>(0)
  const [canSave, setCanSave] = React.useState<boolean>(false)
  const [canDelete, setCanDelete] = React.useState<boolean>(false)

  React.useEffect(() => {
    //memoに既存のメモデータ(idが0以外)が設定されていれば編集・削除可能
    setCanSave(memo.id !== 0)
    setCanDelete(memo.id !== 0)
  }, [memo])

  return (
    <div style={{ margin: 'auto' }}>
      <Login
        isLoggedin={isLoggedin}
        setIsLoggedin={setIsLoggedin}
        token={token}
        setToken={setToken}
      />
      <div className="container">
        {isLoggedin && (
          //BoxとGridを使ってカテゴリー・メモ一覧とメモの内容の表示を横並びにする
          <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <GridItem>
                  <TreeNode
                    setMemo={setMemo}
                    categId={categId}
                    setCategId={setCategId}
                    token={token}
                  />
                </GridItem>
              </Grid>
              <Grid item xs={8}>
                <ShowMemo
                  memo={memo}
                  setMemo={setMemo}
                  categId={categId}
                  token={token}
                  canSave={canSave}
                  canDelete={canDelete}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </div>
    </div>
  )
}
export default App

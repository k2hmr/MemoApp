//ログイン機能のコンポーネント
import React from 'react'
import { AppBar, Button, IconButton, Input, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { checkUuidValidity } from '../validator/uuidInput'
import '../styles/Login.css'

interface props {
  isLoggedin: boolean
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

const Login: React.FC<props> = ({
  isLoggedin,
  setIsLoggedin,
  token,
  setToken,
}) => {
  //useMemoを使うことで初回のみトークンをバリデーションする処理を実行記録しておき、
  //値が必要となった2回目以降は、都度計算する必要をなくしてパフォーマンス向上を期待できる
  const isTokenValid = React.useMemo(() => checkUuidValidity(token), [token])
  return (
    <div>
      <AppBar position="relative">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
            <div style={{ margin: 10 }}>MemoApp</div>
          </IconButton>
          <label>
            <div>Access Token</div>
            <Input
              id="access_token"
              placeholder="access token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              disabled={isLoggedin || isTokenValid}
              autoComplete="off"
            />
          </label>
          <Button
            variant="text"
            color="inherit"
            id="login"
            onClick={() => {
              setIsLoggedin(true)
            }}
            disabled={isLoggedin || !isTokenValid}
          >
            LOGIN
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Login

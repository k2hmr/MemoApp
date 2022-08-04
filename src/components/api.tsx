//APIと連携する関数のまとめ
//TODO: SWRなどを利用してキャッシュをなるべく最新に保つようにする
import { Memo, Category, MemoTitle } from '../models/models'
import axios from 'axios'
import { REACT_APP_API_URL } from '../constant'

const client = axios.create({
  baseURL: REACT_APP_API_URL,
})

export async function fetchCategories(token: string): Promise<Category[]> {
  const headers = {
    'Content-Type': 'application/json',
    'X-ACCESS-TOKEN': token,
  }
  return client.get('/category', { headers: headers }).then((res) => res.data)
}

export async function fetchMemoTitles(
  categoryId: number,
  token: string
): Promise<MemoTitle[]> {
  const headers = {
    'Content-Type': 'application/json',
    'X-ACCESS-TOKEN': token,
  }
  const params = {
    category_id: categoryId,
  }
  return client
    .get('/memo', { headers: headers, params: params })
    .then((res) => res.data)
}

export async function fetchMemo(memoId: number, token: string): Promise<Memo> {
  const headers = {
    'Content-Type': 'application/json',
    'X-ACCESS-TOKEN': token,
  }
  return client
    .get(`/memo/${memoId}`, { headers: headers })
    .then((res) => res.data)
}

export async function addMemo(
  memo: Memo,
  token: string,
  categId: number
): Promise<void> {
  const headers = {
    'Content-Type': 'application/json',
    'X-ACCESS-TOKEN': token,
  }
  const postData = {
    category_id: categId,
    title: memo.title,
    content: memo.content,
  }
  return client
    .post('/memo', postData, { headers: headers })
    .then((res) => console.log('response body:', res.status))
}

export async function saveMemo(
  memoId: number,
  newTitle: string,
  newContent: string,
  token: string,
  categId: number
): Promise<void> {
  const headers = {
    'Content-Type': 'application/json',
    'X-ACCESS-TOKEN': token,
  }
  const putData = {
    category_id: categId,
    title: newTitle,
    content: newContent,
  }
  return client
    .put(`/memo/${memoId}`, putData, { headers: headers })
    .then((res) => console.log('response body:', res.status))
}

export async function deleteMemo(memoId: number, token: string): Promise<void> {
  const headers = {
    'Content-Type': 'application/json',
    'X-ACCESS-TOKEN': token,
  }
  return client
    .delete(`/memo/${memoId}`, { headers: headers })
    .then((res) => console.log('response body:', res.status))
}

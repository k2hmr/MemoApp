//APIから取得できるデータの型を定義
export interface Category {
  id: number
  name: string
}

export interface MemoTitle {
  id: number
  title: string
}

export interface Memo {
  id: number
  categoryId: number
  title: string
  content: string
}

//カテゴリーごとに展開・縮小の状態を管理できるようにする予定
export interface IsOpenPerCategory {
  categoryId: number
  isOpen: boolean
}

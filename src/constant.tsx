//タイプミス防止やリファクタリングを行いやすくするファイル
//本来は.envファイルを用意して以下のように読み込むようにしています
// export const REACT_APP_API_URL = process.env.REACT_APP_API_URL || ''
export const REACT_APP_API_URL = 'https://challenge-server.tracks.run/memoapp'

//Github Actionsなどについて
//コミット時に自動でPrettierがかかることで、クリーンなコードを常に維持できる
//GitActionsで自動でESLintがかかり、環境に依存することなくクリーンコードの確認ができる
//GitActionsで自動でテストが実行され、環境に依存することなくテストの確認ができる(テストは未実装)

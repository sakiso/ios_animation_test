# iOS Animation Performance Test

iOSでの各種映像ファイル（MP4、Animated WebP）の再生性能をテストするためのWebアプリケーションです。

## 機能

- **MP4動画の再生テスト**: HTML5 video要素を使用した動画再生性能の測定
- **Animated WebPのテスト**: 画像要素での動的WebP表示性能の測定
- **パフォーマンス比較**: ファイルサイズ、読み込み時間、CPU使用率、メモリ使用量の比較
- **iOS特化情報**: iOSデバイス固有の最適化情報とアドバイス
- **レスポンシブデザイン**: iPhone、iPad、デスクトップで最適表示

## テスト項目

1. **ファイルサイズ比較**
2. **読み込み時間測定**
3. **メモリ使用量監視**
4. **フォーマット対応状況**
5. **パフォーマンススコア算出**

## 使用方法

1. iOSデバイスでGitHub Pagesのページにアクセス
2. 自動的にテストが開始される
3. MP4とWebPの再生/表示を確認
4. パフォーマンス結果を比較・検証

## サポートブラウザ

- iOS Safari 14+
- Chrome for iOS
- Firefox for iOS
- その他WebKit系ブラウザ

## GitHub Pages設定

このリポジトリはGitHub Pagesで公開されています。
設定 → Pages → Source: Deploy from a branchでmain branchのルートディレクトリを選択してください。

## ファイル構成

```
/
├── index.html      # メインページ
├── style.css       # スタイルシート
├── script.js       # JavaScript機能
├── assets/         # テスト用メディアファイル
│   ├── mp4.mp4     # MP4動画ファイル
│   └── webp.webp   # Animated WebPファイル
└── README.md       # このファイル
```

## 開発者向け情報

このアプリケーションは以下の技術を使用しています：

- HTML5 (Video API, Canvas API)
- CSS3 (Grid, Flexbox, CSS Variables)
- Vanilla JavaScript (ES6+)
- Performance API
- Fetch API

## カスタマイズ

新しいメディアファイルを追加する場合は：

1. `assets/` ディレクトリに新しいファイルを追加
2. `index.html` に新しいセクションを追加
3. `script.js` に対応する処理を実装

## ライセンス

MIT License

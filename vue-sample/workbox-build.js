import { generateSW } from "workbox-build";

generateSW({
  // ここに設定を書いていく
  cacheId: "web-cache-test", // キャッシュ名
  swDest: "dist/service-worker.js", // 作成されたService Workerのファイルの出力先
  globDirectory: "dist", // 事前キャッシュ対象ディレクトリ
  globPatterns: ["**/*.{js,html,css,png,jpg,woff2,woff,ttf,svg,ico}"], // キャッシュ対象のファイルの条件
  skipWaiting: true, // 新しいService Workerを即座にアクティブにする
  clientsClaim: true, // 新しいService Workerがページを直ちにコントロールする
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // キャッシュするファイルの最大値。デフォルトは2MB。プロジェクトの規模に合わせて必要なサイズに設定する
  navigateFallback: '/index.html', // 存在しないルートにアクセスしたときに返すファイル
  // 動的キャッシングの設定
  runtimeCaching: [
    {
      // urlPatternに一致するリクエストが来た場合(この場合は末尾が.mp4のリクエスト)に処理する
      urlPattern: ({ url }) => url.pathname.endsWith(".mp4"),
      handler: "CacheFirst", // キャッシュ戦略。今回はCacheFirstを指定
      options: {
        cacheName: "video-cache", // キャッシュ名。Cache APIで利用するcacheの名前を指定する
        rangeRequests: true, // レンジリクエストをサポートする
        cacheableResponse: {
          statuses: [200], // キャッシュ対象のレスポンスコードを指定
        },
      },
    },
  ],
}).then(({ count, size, warnings }) => {
  if (warnings.length > 0) {
    console.warn(
      "Warnings encountered while generating a service worker:",
      warnings.join("\n")
    );
  }

  console.log(
    `Generated a service worker, which will precache ${count} files, totaling ${size} bytes.`
  );
});

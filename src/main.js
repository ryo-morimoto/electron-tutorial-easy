// アプリケーション作成用のモジュールを読み込み
const {app, BrowserWindow} = require('electron');

// メインウィンドウ
let mainWindow;

function createWindow() {
    // メインウィンドウ作成
    mainWindow = new BrowserWindow({
        // ウェブページの機能設定
        webPreferences: {
            // Nodeインテグレーションを有効にするかどうか。
            nodeIntegration: true,
            // Electron APIと指定されたpreloadスクリプトを別々のJavaScriptコンテキストで実行するかどうか。
            contextIsolation: false
        },
        width: 800, height: 600,
    });

    // メインウィンドウに表示するURLを指定する。
    // （今回はmain.jsと同じディレクトリのindex.html）
    mainWindow.loadFile('index.html');

    // デベロッパーツールの起動
    mainWindow.webContents.openDevTools();

    // メインウィンドウが閉じられた時の処理
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// 初期化が完了したときの処理
app.on('ready', createWindow);

// すべてのウィンドウが閉じたときの処理
app.on('window-all-closed', () => {
    // macOSの時以外はアプリケーションを終了させます。
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// アプリケーションがアクティブになった時の処理(Macだと、Dockがクリックされたとき)
app.on('activate', () => {
    // メインウィンドウが消えている場合は再度メインウィンドウを作成する
    if (mainWindow === null) {
        createWindow();
    }
})
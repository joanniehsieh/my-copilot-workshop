# 待辦清單 Web App

這是一個在 **GitHub Copilot 實戰工作坊**中完成的待辦清單 Web App。專案以簡潔的介面協助使用者管理日常待辦事項，並透過 GitHub Copilot 的 Agent Mode、MCP 與 agentic workflow 完成開發流程練習。

## 線上展示

**https://<你的帳號>.github.io/<你的repo名稱>/**

> 請將上面的網址替換成實際的 GitHub Pages 網址。

## 功能

- 新增待辦事項，輸入空白內容時不會新增。
- 勾選待辦事項並標記完成，完成項目會顯示刪除線與淡化效果。
- 刪除單筆待辦事項。
- 顯示整體未完成待辦事項數量。
- 清單沒有項目時顯示提示文字。
- 使用「全部」、「未完成」與「已完成」篩選清單。
- 篩選結果為空時顯示對應提示文字。
- 切換淺色與深色模式，手動選擇會保存至 `localStorage`。
- 未手動選擇主題時，依照作業系統的 `prefers-color-scheme` 設定顯示。
- 清除所有已完成項目，操作前會顯示確認對話框。
- 待辦資料保存至 `localStorage`，重新整理後仍可保留。
- 採用卡片式版面並支援手機螢幕。

## 技術

- 使用 HTML、CSS 與原生 JavaScript。
- 不使用任何框架或套件，沒有 `package.json` 或建置流程。
- 不引用外部 CDN，可直接離線開啟。
- 使用 CSS 變數管理配色，支援淺色與深色主題。
- 使用瀏覽器 `localStorage` 保存待辦資料與主題偏好。
- 使用 `textContent`、`createElement` 與原生 DOM API 產生清單內容。

## 開發方式

- 使用 GitHub Copilot **Agent Mode**，根據需求建立與修改 `index.html`、`styles.css` 和 `app.js`。
- 使用 `.vscode/mcp.json` 設定 MCP，讓 Copilot 能連接 Microsoft Learn 與 GitHub 相關工具。
- 使用 Microsoft Learn 文件工具查詢 `prefers-color-scheme` 與網頁無障礙色彩對比建議。
- 使用 `.github/copilot-instructions.md` 定義專案的技術限制、程式風格與協作規則。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義處理 GitHub issue 的 agentic workflow，流程包含讀取 issue、提出計畫、建立分支、修改、驗證、提交與建立 Pull Request。

## 我學到什麼

- 如何用清楚、完整的需求描述，讓 Agent Mode 一次處理多個前端檔案。
- 如何使用 MCP 讓 AI 查詢官方文件與 GitHub repository 資訊。
- 如何將專案規範與重複性工作流程寫成可版控的 Markdown 指示檔與 prompt。
- 如何透過分支、commit 與驗證流程降低修改風險。
- 如何在加入深色模式時，同時考慮系統偏好與色彩對比的可存取性。

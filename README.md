# 祖安语录桌面版

![MIT Licence](https://img.shields.io/github/license/zihluwang/zuanbot)

> 本仓库为 [cndiandian/zuanbot.com](https://github.com/cndiandian/zuanbot.com) 的客户端版本。

## 有什么用

可以随机输出一条骂人的句子，有**口吐芬芳**与**火力全开**两个模式。

## 词库下载

[GitHub 下载](/src-tauri/resources/data.db)、[阿里云盘](https://www.aliyundrive.com/s/StTs9ojDAEF)、[蓝揍云](https://shadiao.lanzouw.com/b0116bgub) `密码hck1` 、 [诚通网盘](https://url08.ctfile.com/d/14688008-46477369-3732e0) `密码9919`

在线文档：[Notion文档](https://dians.notion.site/d865fac077f1430f9510d020f8713c8e)、[口吐芬芳(谷歌文档)](https://docs.google.com/document/d/1SskgYtDpYL6P_4qmX2A1ndBl8MY5NeDcBaYPxS-yxIo/edit?usp=sharing) 、[火力全开(谷歌文档)](https://docs.google.com/document/d/14YG9qaNDZk275av-Iss6B6YY-eDTdkS5w_my3f7349A/edit?usp=sharing)

## 如何使用

下载对应操作系统的安装包，执行安装即可。

包类型（文件后缀）：

- Windows: `x64.msi`
- macOS
  - Intel: `x64.dmg`
  - Apple Silicon: `aarch64.dmg`

由于没有代码签名，在 Mac 上会因为没有开启允许所有开发者而提示软件损坏，此时可以打开**终端**，并输入 `xattr -d com.apple.quaratine /Applications/zuanbot.app` 再打开软件。

## 什么原理

收集整理了N条骂人的句子，然后随机读取一条输出即可。

核心代码就一行：

```sql
SELECT * FROM `main` ORDER BY RANDOM() limit 1
```

## 词库都是怎么来的

最初来源于网络收集了一些，后来基本就都是各位用户的投稿了，投稿渠道现已关闭。
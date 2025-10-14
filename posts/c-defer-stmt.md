---
title: 'Defer Statement'
date: '2025-10-14'
time: '10:00:00'
tags: ['defer', 'C', 'llvm', 'gcc']
---

前幾天晚上在看 Google 推播的一些文章，裡面包含了一個 llvm-project 的 @Link(PR, https://github.com/llvm/llvm-project/pull/162848)。  
我還蠻訝異的，這個在 C 中新增 defer statement 的提案，其實已經很多年了。  
當年從 C 換去寫 Go 之後，一直覺得 defer 這東西真的很好用。  
後來也看到相關的 C 提案，只是一直都沒有實作的消息，一直到現在。  
然後突然想到，既然 llvm 都支援了， gcc 應該也會支援吧。  
於是查了一下，確實也有相關的 @Link(patches, https://patchwork.ozlabs.org/project/gcc/list/?series=467675) 正在等待 review。

<br>

終於，以前為了解決 memory release 到處 goto 的問題，應該可以稍微減少一點了。  
不過，要等到 kernel / driver 會普遍大量使用，我覺得還有一段路要走吧。  
更何況，也不見得會為了這個 defer statement 回頭去做 refactor。  
畢竟軟體業界最常說的就是：「If it works, don't touch it」。  
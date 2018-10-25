# Fakin-Reader v2.0

## 2.0更新
- 删除对大佬api接口的依赖
- 优化阅读器代码
- 增加用户阅读设置（字体、阅读模式）
- 左右滑动翻页增加阅读记录（加入书架的书籍，打开会加载到上次退出前的阅读记录）
- 阅读器对于首次打开用户增加引导页

## 部署
~~先git大佬的api接口~~


git本仓库
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```
## 实现功能

- [x] 小说书架

- [x] 分类查询

- [x] 书单查询

- [x] 排行榜

- [x] 搜索

- [x] 小说详情

- [x] 小说换源

- [x] 阅读历史记录

## 截图
![cat.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/cat.png)
![mybooks.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/mybooks.png)
![rank.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/rank.png)
![booklist.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/booklist.png)
![reader.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/reader.png)
![bookDetail.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/bookDetail.png)
![cat-list.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/cat-list.png)
![index.png](https://github.com/ZpsssLll/vue-zpReader/blob/master/screenshot/index.png)


### 提示
换源功能已经实现，但是由于每个书源返回的书籍信息在解析的时候不会完全相同，所以在进行换源的时候，无法记录当前章节的当前页，只会记录当前当前（例如你看到了第一章第二页，当你换源阅读的时候，只会显示第一章第一页）

### 部署
apache和nginx部署全部失败，因为api接口返回404，但是我本地正常的，最后用express反向代理成功了，这几天我会找一个服务器来进行部署！
1
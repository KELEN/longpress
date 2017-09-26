#### 使用方法

```javascript
var el = document.getElementById("test");
new LongPress(el, {
    interval: 1000,
    onProgress: function (percent) {
        console.log(percent)
    },
    onComplete: function () {
        console.log("complete");
    }
});
```

#### 参数
| 方法 | 说明 |
| ------ | ------ |
| interval | 延迟毫秒数 |

#### 监听方法

| 方法 | 参数 | 说明 |
| ------ | ------ | ------ |
| onProgress | percent |  百分比 |
| onComplete | 无 | 触发回调 |
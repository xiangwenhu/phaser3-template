1. 引入phaser注意
```ts
import 'Phaser';

import  phaser from  'Phaser';
```
前者配置陪 externals，开发模式也会被打入包体。

<br>

2. service worker 资源缓存问题
如果不使用`copy-webpack-plugin`来复制图片资源，而是自己编写脚本来复制。
图片的缓存路径不会被写入`sw.js`

<br>

3. 图片压缩采用的是 `m-tinypng` 压缩, 是等webpack编译完毕后，再执行的操作
因为`image-webpack-loader`没发挥作用。






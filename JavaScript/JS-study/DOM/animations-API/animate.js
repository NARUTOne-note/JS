/**
 * CSS 动画给我们的页面带来了无限的酷炫效果，但是它有自己的局限性，不能灵活地控制播放和暂停，不能追踪动画的进度。既然 CSS 无法做到的事，那就只能交给 JS 来做了。
 * 新推出的 Web Animations API 正是用来解决 CSS 动画问题的，CSS 动画能做的它都能做，CSS 动画不能做的它也能做
 * @example 
 *  var animation = element.animate(keyframes, options)
 * @param keyframes 关键帧数组集合
 * @param options 动画参数
 * @returns Animation 对象
 * ! polyfill: https://github.com/web-animations/web-animations-js
 */

var ele = document.getElementById('ele')
var animation = ele.animate([
  {
    transform: 'translateX(0)',
  }, {
    transform: 'translateX(50px)',
    offset: 0.4, // offset 加一个帧节点控制进程，取值为 0-1
  },{
    transform: 'translateX(200px)',
    opacity: 0,
    offset: 1
  }
], {
  duration: 3000,
  iterations: Infinity
})

// ? 等价css
/**
 * 
 * 
 * @keyframes moves {
    40% {
      transform: translateX(50px)
    }
    100% {
      transform: translateX(200px),
      opacity: 0,
    }
  }
 */

setTimeout(function () {
  animation.pause();
  // animation.play()
}, 2000)

var animations = ele.getAnimations(); // 返回元素的animate动画实例

// 某个动画执行完毕
animation.onfinish = () => {
  console.log('执行完毕')
}

Promise.all(
  animations.map(
    animation => animation.finished
  )
).then(
  console.log('所有动画执行完毕')
)

// 正在播放的动画
var runningAnimations = animations.filter(
  // 所有取值为 pending（挂起）running（运行）paused（暂停）finished（完成）idle（无法解析）
  animation => animation.playState === 'running' 
)

// 批量暂定
animations.forEach(
  animation => animation.pause()
)
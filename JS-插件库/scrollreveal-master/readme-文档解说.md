## Scroll Reveal 滚动显示

1. scroll       /skrəʊl/        vt 滚动
2. reveal       /rɪ'viːl/       vt 显示
3. scale        /skeɪl/         n  比例
4. rotate       /rə(ʊ)'teɪt/    vi 旋转， 循环
5. transition:  /træn'zɪʃ(ə)n/  n  过渡， 转换
7. delay        /dɪ'leɪ/        n  延迟， 延期
8. consider     /kən'sɪdə/      v  考虑，关心，体谅

6. + linear /'lɪnɪə/: adj.线的     线性动画-->     没有任何缓动的动画称为线性动画。 css3的动画效果为:
   + ease-out：                    缓出动画-->     缓出使动画在开头处比线性动画更快但在结尾处减速。缓出一般最适合界面，开头时快速使动画有反应快的感觉，在结尾仍允许有一点自然的减速。
   + ease-in:                      缓入动画-->     缓入动画开头慢结尾快，与缓出动画正好相反。(页面中几乎用不到)
   + ease-in-out:                  缓入缓出动画-->  缓入并缓出与汽车加速和减速相似，使用得当时，可以实现比单纯缓出更生动的效果



### var  defaultConfig = {

1. "bottom", "left", "top", "right" <br/>
**origin: "left",** 

2. Can be any valid CSS distance(距离), e.g. "5em", "10%", "20vw", etc. <br/>
**distance: "20px",**       // 从多远的距离开始执行函数

3. Time in milliseconds 时间(毫秒) <br/>
**duration: 500,**          // 运动持续时常 <br/>
**delay: 0,**               // 延迟时间 <br/>

4. Starting angles in degrees起始角度(以度为单位), will transition from these values to 0 in all exes. <br/>
**rotate: {x: 0, y: 0, z: 0},** <br/>
 
5. Starting opacity value(初始不透明度值0)，before transitioning to the computed opacity <br/>
**opacity:0,**

6. Starting scale value(初始缩放比例值0.9), will transition(过渡，转换) from this value to 1 <br/>
**scale: 0.9,**

7. Accepts any valid CSS easing(接受任何css缓动效果), e.g. 'ease', 'ease-in-out', 'linear', etc. <br/>
**easing:"cubic-bezier(0.6, 0.2，0.1，1)",** <br/>

8. `<html>` is the default reveal container. You can pass(传递) either: <br/>
 (1.) DOM Node(DOM节点), e.g. document.querySelector('.fooContainer')  <br/>
 (2.) Selector(选择器), e.g. '.fooContainer' <br/>
**container: window.document.documentElement,** <br/>

9. true/false to control reveal animations on mobile. <br/>
**mobile: true,**  <br/>

- 10 <br/>(1.) true: reveals occur every time elements become visible 每次元素变的可见时显示(即ScrollReveal再次执行) <br/>
          (2.) false: revels occur once as elements become visible 只在元素第一次变得可见时执行一次 <br/>
**reset: false,**  <br/>

- 11 <br> (1.) 'always' — delay for all reveal animations 每次动画都延迟  <br>
     (2.) 'once'   — delay only the first time reveals occur    <br>
     (3.) 'onload' - delay only for animations triggered by first load  <br>
**useDelay: "always",**

12. change when an element is considered in the viewport(关心元素在视口中的改变). 
        The default value of o.20 means 20% fo an element must be visible for its reveal to occur. <br>
**viewFactor: 0.2,** <br>

13. Pixel values that alter the container boundaries. 改变容器边界的像素值  e.g. Set `{ top: 48 }`, 
        if you have a 48px tall fixed toolbar. -- Visual Aid: https://scrollrevealjs.org/assets/viewoffset.png <br> 
**viewOffset: {tops: 0, right: 0, bottom:0, left: 0},** <br>

14. Callbacks that fire for each triggered element reveal, and reset.每个触发元素触发的回调显示并重置。 <br>
**beforeReveal: function(domEl){},** <br>
**beforeReset: function(domEl){},** <br>

15. Callbacks that fire for each completed element reveal, and reset. 每个完成的元素触发的回调显示并重置。 <br>
**afterReveal: function(domEl){},** <br>
**afterReset: function(domEl){}** <br>
## };

### 3. Advanced
    3.1. Sequenced Animations
    You can pass a sequence interval (in milliseconds) to the reveal() method, making sequenced animations a breeze.
    Note: The interval is the time until the next element in the sequence begins its reveal, which is separate from the time until the element’s animation completes. 
    In this example, the animation duration is 2 seconds, but the sequence interval is 50 milliseconds.
    您可以将一个序列间隔（以毫秒为单位）传递给reveal（）方法，使序列动画变得轻而易举。
    注意：间隔是直到序列中的下一个元素开始显示的时间，它与元素的动画完成之间的时间是分开的。在此示例中，动画持续时间为2秒，但序列间隔为50毫秒。
    // interval passed to reveal
    window.sr = ScrollReveal({ duration: 2000 });
    sr.reveal('.box', 50);
    
    // or...
    
    // interval and custom config passed to reveal
    window.sr = ScrollReveal();
    sr.reveal('.box', { duration: 2000 }, 50);
    
    
    3.2. Working With DOM Nodes
    You are not just limited to using selectors with reveal(), it also accepts a Node or Node List as the first argument.
    您不仅仅限于使用具有reveal（）的选择器，它也接受一个Node或Node List作为第一个参数。
    sr.reveal(document.getElementById('foo'));
    sr.reveal(document.querySelectorAll('.bar'));
    
    
    3.3. Custom/Multiple Containers
    The default container is the viewport, but you can assign any container to any reveal set.
    Tip: ScrollReveal works just as well with horizontally scrolling containers too!
    
        <div id="fooContainer">
          <div class="foo"> Foo 1 </div>
          <div class="foo"> Foo 2 </div>
          <div class="foo"> Foo 3 </div>
        </div>
        
        <div id="barContainer">
          <div class="bar"> Bar 1 </div>
          <div class="bar"> Bar 2 </div>
          <div class="bar"> Bar 3 </div>
        </div>
        
        
        window.sr = ScrollReveal();
        // as a DOM node...
        var fooContainer = document.getElementById('fooContainer');
        sr.reveal('.foo', { container: fooContainer });
        
        // as a selector...
        sr.reveal('.bar', { container: '#barContainer' });
        
        
    3.4. Asynchronous Content    
    The sync() method updates asynchronously loaded content with any existing reveal sets.
    Example: 
    
       <!-- index.html -->
       <div id="fooContainer">
         <div class="foo">foo</div>
         <div class="foo">foo</div>
         <div class="foo">foo</div>
       </div>
       
       <!-- ajax.html -->
       <div class="foo">foo async</div>
       <div class="foo">foo async</div>
       <div class="foo">foo async</div>
        
       <script type="text/javscript">
            var fooContainer, content, sr, xmlhttp;
            
            fooContainer = document.getElementById('fooContainer');
            
            sr = ScrollReveal();
            sr.reveal('.foo', { container: fooContainer });
            
            // Setup a new asynchronous request...
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                if (xmlhttp.status == 200) {
            
                  // Turn our response into HTML...
                  var content = document.createElement('div');
                  content.innerHTML = xmlhttp.responseText;
                  content = content.childNodes;
            
                  // Add each element to the DOM...
                  for (var i = 0; i < content.length; i++) {
                    fooContainer.appendChild(content[ i ]);
                  };
            
                  // Finally!
                  sr.sync();
                }
              }
            }
            
            xmlhttp.open('GET', 'ajax.html', true);
            xmlhttp.send();
       </script>
    
    4.2. Improve User Experience
    In most cases, your elements will start at opacity: 0 so they can fade in. However, since JavaScript loads after the page begins rendering, 
    you might see your elements flickering as they begin rendering before being hidden by ScrollReveal's JavaScript.
    The ideal solution is to set your reveal elements visibility to hidden in the <head> of your page, 
    to ensure they render hidden while your JavaScript loads:
    在大多数情况下，您的元素将以不透明度开始：0，以便它们可以淡入。但是，由于JavaScript在页面开始渲染之后加载，所以当ScrollReveal的JavaScript被隐藏之前，
    您可能会看到元素在渲染之前闪烁。理想的解决方案是将您的显示元素的可见性设置为隐藏在页面的<head>中，以确保在JavaScript加载时隐藏它们：
    
    Continuing our example from 4.1.
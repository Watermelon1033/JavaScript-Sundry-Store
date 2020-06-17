License
-------

The MIT License

Copyright 2016 Julian Lloyd

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




### 页面中元素上执行完 scrollReveal 效果之后的样式为:
<p 
    class="foo" 
    data-sr-id="2" 
    style="; visibility: visible;  
            -webkit-transform: translateY(0); 
            opacity: 1;
            transform: translateY(0); 
            opacity: 1;
            -webkit-transition: -webkit-transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; 
            transition: transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; "> 文字
          
</p>





### 页面中 ScrollReveal 构造函数中声明的 全局属性有: 
  - sr.store = {
        elements: {},
        containers: [],
    };
  - sr.sequences = {};
  - sr.history = [];
  - sr.uid = 0;
  - sr.initialized = false;
  

### reveal()    
    执行完当前 for 循环后是这样: sequence.elemIds 数组中的项是在下面的 if (sequence) {} 方法中推入
         *   sequence =  sr.sequences = {
         *       1: {
         *           id:       1,
         *           interval: 50,
         *           elemIds:  [2, 3, 4, 5, 6, 7, 8, 9],
         *           active:   false,
         *       }
         *   }
  


## for循环执行之后的 sr.store 

    sr.store = {
         elements: {
            2: {
                config: {
                    afterReset: f(domEl), afterReveal: f(domEl),
                    beforeReset: f(domEl), beforeReveal: f(domEl),
                    axis: "Y",
                    container: html,
                    delay: 0,
                    distance: "20px",
                    easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
                    mobile: true,
                    opacity: 0,
                    origin: "bottom",
                    reset: true,
                    rotate: {x: 0, y: 0, z: 0},
                    scale: 0.9,
                    useDelay: "always",
                    viewFactor: 0.2,
                    viewOffset: {top: 0, right: 0, bottom: 0, left: 0},
                },
    
                domEl: p.foo,
                id: 2,
                revealing: true,
                seen: false,
                sequence: {id: 1, index: 0, timer: null},
                styles: {
                    computed: {
                        opacity: "1",
                        transition: ""
                    },
                    inline: "; visibility: visible",
                    transform: {
                        // initial 初始化时 transform 的样式
                        initial: " -webkit-transform: translateY(20px) scale(0.9); opacity: 0",
                        transform: "translateY(20px) scale(0.9); opacity: 0;",
    
                        // target 目的样式
                        target: " -webkit-transform: translateY(0); opacity: 1;transform: translateY(0); opacity: 1;",
    
                        // traget(魔法种类): 现在看起来主要是定义 scale(缩放)，但还不明白前面为什么是 undefined
                        traget: "undefined scale(1) scale(1)"
                    },
                    transition: {
                        // delayed: 延迟的， instant: 立即的
                        delayed: "-webkit-transition: -webkit-transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s",
                        transition: "transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; ",
                        instant: "-webkit-transition: -webkit-transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s",
                        transition: "transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; ",
                    }
                },
                timer: null
            },
            3: {,
            4: {},
            5: {},
            6: {},
            7: {},
            8: {},
            9: {},
        },
        container: [ html,]
    }
 




* 最后 elem对象 (就是代表每个要添加scrollReveal的元素) 会变成这样
 * elem = {
 *      config: {
 *          afterReset: f(domEl),  afterReveal: f(domEl),
 *          beforeReset: f(domEl), beforeReveal: f(domEl),
 *          axis:   "Y",  container: html,  delay:  0,
 *          distance: "20px", easing: "cubic-bezier(0.6, 0.2, 0.1, 1)",
 *          mobile: true, opacity: 0, origin: "bottom", reset: true,
 *          rotate: {x:0, y:0, z:0}, scale: 0.9， useDelay: "always",
 *          viewFactor: 0.2, viewOffset: {top:0, right:0, bottom:0, left:0},
 *       },
 *       domEl: p.foo，
 *       id: 2,
 *       revealing: true,
 *       seen: true，
 *       sequence: { id:1, index:0, timer:null },
 *       styles: {
 *           computed: {
 *               opacity: "1",
 *               transition: ""
 *           },
 *           inline: "; visibility: visible",
 *           transform: {
 *               // initial 初始化时 transform 的样式
 *               initial: " -webkit-transform: translateY(20px) scale(0.9); opacity: 0;
 *                          transform: translateY(20px) scale(0.9); opacity: 0;",
 *
 *               // target 目的样式
 *               target: " -webkit-transform: translateY(0); opacity: 1;transform: translateY(0); opacity: 1;",
 *
 *               // traget(魔法种类): 现在看起来主要是定义 scale(缩放)，但还不明白前面为什么是 undefined
 *               traget: "undefined scale(1) scale(1)"
 *           }
 *           transition: {
 *               // delayed: 延迟的， instant: 立即的
 *               delayed: "-webkit-transition: -webkit-transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
 *                          transition: transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; ",
 *               instant: "-webkit-transition: -webkit-transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s;
 *                          transition: transform 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s, opacity 2s cubic-bezier(0.6, 0.2, 0.1, 1) 0s; ",
 *           }
 *       },
 *       timer: null，
 * }
 *
 *  domEl:  "",
 *  id: 2,
 *  revealing: true,
 *  seen: true,
 *  sequence: {
 *      id: 1,
 *      index: 0,
 *      timer: null
 *  },
 * styles:{
 *      computed: {"opacity": '1', "transition":''},
 *     inline:'; visibility: visible; ',
 *      transform:{},
 *      transition:{}
 * },
 *  timer:null
 
 
 
 
 
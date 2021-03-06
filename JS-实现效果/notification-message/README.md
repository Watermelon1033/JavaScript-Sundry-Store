Created Date 20180611

#### 消息通知


#### 分页 (仿 github):



##### 分页大致分为2种情形:
  - 1 当总页数 (totalNum) 小于等于 8 时，一次创建完整。
  - 2 当总页数大于 8 时情况稍微复杂，我们来假设有 100 页，也就是說需要創建 100 個 頁碼(pagination)
  下面主要解说这种情况。
    + a. li.gap 代表的元素是 >= 2 ; 
   
   
   
##### 渲染: 

  - (1.) Previous  **1**  2  3  4  5  ...  8  9  Next  
  - (2.) Previous  1  2  3  **4**  5  6  7  8  9  Next
 

  - (3.) Previous  1  2  3  **4**  5  6  ...  11  12  Next
  - (4.) Previous  1  2  3  4  **5**  6  7  ...  11  12  Next
  - (5.) Previous  1  2  3  4  5  **6**  7  8  ...  11  12  Next
  - (6.) Previous  1  2  ...  5  6  **7**  8  9  10  11  12  Next
  - (7.) Previous  1  2  ...  6  7  **8**  9  10  11  12  Next
  - (8.) Previous  1  2  ...  7  8  **9**  10  11  12  Next
  - (9.) Previous  1  2  ...  8  9  **10**  11  12  Next
  - (9-2.) Previous  1  2  ...  8  9  10 **11**  12  Next
  - (9-3.) Previous  1  2  ...  8  9  10  11  **12**  Next
 
 
  - (10.) Previous  1  2  3  **4**  5  6  ...  99  100  Next
  - (11.) Previous  1  2  3  4  **5**  6  7  ...  99  100  Next
  - (12.) Previous  1  2  3  4  5  **6**  7  8  ...  99  100  Next
  - (13.) Previous  1  2  ...  5  6  **7**  8  9  ...  99  100  Next
  - (14.) Previous  1  2  ...  6  7  **8**  9  10  ...  99  100  Next
  - (15.) Previous  1  2  ...  8  9  **10**  11  12  ...  99  100  Next
  - (16.) Previous  1  2  ...  91  92  **93**  94  95  ...  99  100  Next
  - (17.) Previous  1  2  ...  92  93  **94**  95  96  ...  99  100  Next
  - (18.) Previous  1  2  ...  93  94  **95**  96  97  98  99  100  Next
  - (19.) Previous  1  2  ...  94  95  **96**  97  98  99  100  Next
  - (20.) Previous  1  2  ...  95  96  **97**  98  99  100  Next
  - (21.) Previous  1  2  ...  96  97  **98**  99  100  Next
  - (22.) Previous  1  2  ...  96  97  98  99  **100**  Next
  
 
  + 如何渲染 :
   - A. 首先 1,2,3,4,5 是总页数大于 8 后, 页面默认生成的 5 个按钮，点击 按钮4 后，按钮5 后面生成元素的原则是: <br/>
       ( ※ 分页总页数: totalPages ()  <br/>
         ※ 组件开头显示的最大按钮个数: startShowMaxBtn (8)  <br/>
         ※ 组件开头显示的默认按钮个数: startShowDefaultBtn (5)  <br/>
         ※ 组件末尾显示的最大按钮个数: lastShowMaxBtn  (8)   <br/>
         ※ 組件末尾显示的最小按钮个数: lastShowMinBtn  (5) ) <br/>
         
       + a. (totalPages - startShowDefaultBtn(5)) <= lastShowMinBtn(5) 
        就是情形(2.) 如果按钮5 后 9-5 = 4  <= 5 就已经成立了，这里直接渲染了全部9个按钮， 此为第一种判断情况。
        
       + b. totalPages > startShowMaxBtn(8) 默認就生成 情形(1.). 點擊按钮4 按鈕5 后生成 按钮6 的判斷:  
            - 1). 根据 情形(3.) 先來看开头的判断: 当前 按钮4 处于选中状态，数字5 后是不是生成 数字6 的前半部分的判断是 
             { (startShowDefaultBtn + 1) 是否 <= 8 (startShowMaxBtn) }, 这一点通过 情形(3.)(4.)(5.)(10.)(11.)(12.) 可以观察出  
            - 2). 其次來看當前點擊的 按鈕7 後的數字, (數字8~12)5 <= lastShowMinBtn(5), 生成的渲染視圖
                對應情形為(6.)(7.)(8.)(9.)(18.)(19.)(20.)(21.)(22.)
            - 3). 最後來看 情形(13.) 按鈕7 當前處於選中裝填，(數字 8-100)91 > lastShowMinBtn(5), 生成渲染視圖如: 
                (13.)(14.)(15.)(16.)(17.)   
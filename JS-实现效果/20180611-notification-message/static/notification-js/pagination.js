
'use strict';

/*
 * paginate   /'pædʒɪneɪt/      vt.分頁
 * pagination /ˌpædʒɪ'neɪʃ(ə)n/  n.页码
 */


// 分页組件 pagination component (組合使用構造函數模式與原型模式)
function PAG(totalPages) {
    if (!totalPages) return;

    // 创建一个全局的 store(存储) 对象
    this.store = {
        totalPages: totalPages,
        recordPagNum: 0,
    };
}

PAG.prototype = {

    constructor: PAG,

    initialize: function (parametersObj) {
        let store = this.store;

        // 保存分页组件的容器
        store.container = Tools.selectorEle(parametersObj.container, false) || "body";

        // 中英文标识
        store.EN = parametersObj.EN;

        // 分页组件开头显示的最大按钮个数
        store.startShowMaxBtn = parametersObj.startShowMaxBtn;
        // 当总页数(totalNum) > startShowMaxBtn 时, 组件开头显示的默认按钮个数
        store.startShowDefaultBtn = parametersObj.startShowDefaultBtn;

        // 分页组件末尾显示的最大按钮个数
        store.lastShowMaxBtn = parametersObj.lastShowMaxBtn;
        // 末尾显示的最小按钮个数
        store.lastShowMinBtn = parametersObj.lastShowMinBtn;

        // 中间显示的按钮个数: 当前后都有 li.gap 且处于显示状态时，最中间的"页码"按钮显示个数
        store.centerShowBtns = parametersObj.centerShowBtns || 5;


        // 页码的父级 ul
        store.pagUl = parametersObj.pagUl || "#pagination";

        // "上一页"按钮
        store.previousBtn = "" || ".previous-btn";
        // "下一页"按钮
        store.nextBtn = "" || ".next-btn";


        // 当前选中的分页
        store.pagActive = parametersObj.pagActive || ".pag-active";


        // 数字页码(num-pag) (注: 即按钮内容为数字的页码)
        store.numPag = parametersObj.numPag || ".num-pag";

        if (store.totalPages <= store.startShowMaxBtn) {
            store.container.innerHTML = this.renderPureNumPag(store.totalPages, store);
        } else {
            store.container.innerHTML = this.renderComFirstPagDom(store.startShowDefaultBtn, store.totalPages, store)
        }


        this.switchPag();
    },


    // 公用: 生成上一页按钮
    commonRenderPreBtn: function (store) {
        let splicePreBtn = '';
        switch (store.EN) {
            case true:
                splicePreBtn += '<li class="previous-btn disabled">Previous</li>';
                break;

            case false:
                splicePreBtn += '<li class="previous-btn disabled">上一页</li>';
                break;
        }
        // console.log( splitPreBtn );
        return splicePreBtn;
    },

    // 渲染含有 data-num 属性的 li
    commonRenderNumPag: function (pages) {
        let i = 0;
        let spliceNumPag = '';
        for (; i < pages; i++) {
            switch (i) {
                case 0:
                    // 给当前 i = 0 的 li 添加 pag-active 处于选中状态
                    spliceNumPag += '<li class="pag-active num-pag" data-num=' + (i + 1) + '>' + (i + 1) + '</li>';
                    break;
                default:
                    spliceNumPag += '<li class="num-pag" data-num=' + (i + 1) + '>' + (i + 1) + '</li>';
            }
        }

        return spliceNumPag;
    },

    // 公用: 渲染下一页按钮
    commonRenderNextBtn: function (store) {
        let spliceNextBtn = '';
        switch (store.EN) {
            case true:
                spliceNextBtn += '<li class="next-btn">Next</li>';
                break;

            case false:
                spliceNextBtn += '<li class="next-btn">下一页</li>';
                break;
        }

        return spliceNextBtn;
    },


    // 渲染纯数字页码DOM
    renderPureNumPag: function (pages, store) {

        // 如果 pages 小于1 直接返回不创建分页
        if (pages < 1) return;

        let paginationStr = '<ul class="pagination" id="pagination">';

        // 生成上一页按钮
        paginationStr += this.commonRenderPreBtn(store);

        paginationStr += this.commonRenderNumPag(pages);

        paginationStr += this.commonRenderNextBtn(store);

        paginationStr += '</ul>';

        return paginationStr;

    },


    // 渲染复杂(complex)情况的第一种 DOM
    renderComFirstPagDom: function (startDefault, pages, store) {

        if (pages < 1) return;

        let paginationStr = '<ul class="pagination" id="pagination">';

        // 生成上一页按钮
        paginationStr += this.commonRenderPreBtn(store);

        paginationStr += this.commonRenderNumPag(startDefault);

        // 接着渲染 li.right-gap
        paginationStr += '<li class="gap right-gap">...</li>';

        // 渲染 li.right-gap 后的最后2个数字按钮
        paginationStr += '<li class="num-pag"  data-num=' + (pages - 1) + '>' + (pages - 1) + '</li>';
        paginationStr += '<li class="num-pag" data-num=' + pages + '>' + pages + '</li>';

        paginationStr += this.commonRenderNextBtn(store);

        paginationStr += '</ul>';

        return paginationStr;

    },

    // 渲染复杂情况的第二种情况: 开头2个按钮 + 左gap + 中间 5个页码按钮 + 右gap + 末尾2个按钮
    renderComSecPagDom: function (curLiDataNum, pages, store) {

        if (pages < 1) return;

        let paginationStr = '<ul class="pagination" id="pagination">';

        // 生成上一页按钮
        paginationStr += this.commonRenderPreBtn(store);

        // 渲染 开头 2个数字按钮
        paginationStr += '<li class="num-pag"  data-num=' + 1 + '>' + 1 + '</li>';
        paginationStr += '<li class="num-pag" data-num=' + 2 + '>' + 2 + '</li>';

        // 渲染 li.left-gap
        paginationStr += '<li class="gap right-gap">...</li>';

        let centerPag = '';
        for (let i = 0; i < 5; i++) {
            switch (i) {
                case 0:
                    centerPag += '<li class="num-pag" data-num=' + (curLiDataNum - 2) + '>' + (curLiDataNum - 2) + '</li>';
                    break;
                case 1:
                    centerPag += '<li class="num-pag" data-num=' + (curLiDataNum - 1) + '>' + (curLiDataNum - 1) + '</li>';
                    break;
                case 2:
                    centerPag += '<li class="num-pag" data-num=' + curLiDataNum + '>' + curLiDataNum + '</li>';
                    break;
                case 3:
                    centerPag += '<li class="num-pag" data-num=' + (curLiDataNum + 1) + '>' + (curLiDataNum + 1) + '</li>';
                    break;
                case 4:
                    centerPag += '<li class="num-pag" data-num=' + (curLiDataNum + 2) + '>' + (curLiDataNum + 2) + '</li>';
                    break;
            }
        }
        paginationStr += centerPag;

        // 渲染 li.right-gap
        paginationStr += '<li class="gap right-gap">...</li>';

        // 渲染 li.right-gap 后的最后2个数字按钮
        paginationStr += '<li class="num-pag"  data-num=' + (pages - 1) + '>' + (pages - 1) + '</li>';
        paginationStr += '<li class="num-pag" data-num=' + pages + '>' + pages + '</li>';

        paginationStr += this.commonRenderNextBtn(store);

        paginationStr += '</ul>';

        return paginationStr;
    },

    // 渲染复杂情况的第三种情况: 开头2个按钮 + 左gap + 右边( 5 <= 按钮数 <= 8 )
    renderComThirdPagDom: function (curLiDataNum, pages, store) {

        if (pages < 1) return;

        let paginationStr = '<ul class="pagination" id="pagination">';

        // 生成上一页按钮
        paginationStr += this.commonRenderPreBtn(store);

        // 渲染 开头 2个数字按钮
        paginationStr += '<li class="num-pag"  data-num=' + 1 + '>' + 1 + '</li>';
        paginationStr += '<li class="num-pag" data-num=' + 2 + '>' + 2 + '</li>';

        // 渲染 li.left-gap
        paginationStr += '<li class="gap right-gap">...</li>';


        // 如果为倒数第一个和倒数第二个 li.num-pag
        if ((pages - curLiDataNum) === 1) {
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 3) + '>' + (curLiDataNum - 3) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 2) + '>' + (curLiDataNum - 2) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 1) + '>' + (curLiDataNum - 1) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + curLiDataNum + '>' + curLiDataNum + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + pages + '>' + pages + '</li>';
        } else if ((pages - curLiDataNum) === 0) {
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 4) + '>' + (curLiDataNum - 4) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 3) + '>' + (curLiDataNum - 3) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 2) + '>' + (curLiDataNum - 2) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 1) + '>' + (curLiDataNum - 1) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + pages + '>' + pages + '</li>';
        } else {

            let len = pages - curLiDataNum;
            // console.log( "len: ", len );

            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 2) + '>' + (curLiDataNum - 2) + '</li>';
            paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum - 1) + '>' + (curLiDataNum - 1) + '</li>';
            for (let i = 0; i <= len; i++) {
                paginationStr += '<li class="num-pag"  data-num=' + (curLiDataNum + i) + '>' + (curLiDataNum + i) + '</li>';
            }
        }

        paginationStr += this.commonRenderNextBtn(store);
        paginationStr += '</ul>';

        return paginationStr;
    },


    // 页码切换
    switchPag: function () {

        let store = this.store;

        // console.log( store );

        // 把事件綁定到 container 上 利用事件委託
        EventUtil.addHandler(store.container, "click", function (event) {

            event = EventUtil.getEvent(event);
            let target = EventUtil.getTarget(event);


            // 移除 li 上已经添加的 pag-active
            let that = this;

            function removePagActive(allLis) {
                allLis = allLis || [].slice.call(that.getElementsByTagName("li"));
                allLis.forEach(function (item) {
                    if (Tools.hasClass(item, "pag-active")) Tools.removeClass(item, "pag-active");
                });
            }

            // 数字分页点击事件
            if (target.hasAttribute("data-num")) {

                // 当前元素已经处于选中状态就直接返回
                if (Tools.hasClass(target, "pag-active")) return;


                // "上一页/下一页"按钮
                let previousBtn = Tools.selectorEle(store.previousBtn, false);
                let nextBtn = Tools.selectorEle(store.nextBtn, false);

                // 如果 previous-btn / nex-btn class中含有 disable 首先移除
                if (Tools.hasClass(previousBtn, "disabled")) Tools.removeClass(previousBtn, "disabled");
                if (Tools.hasClass(nextBtn, "disabled")) Tools.removeClass(nextBtn, "disabled");


                let curLiDataNum = parseInt(target.getAttribute("data-num"), 10);


                // 純数字分頁按鈕事件
                if (store.totalPages <= store.startShowMaxBtn) {

                    removePagActive();

                    // 給當前元素添加 pag-active;
                    Tools.addClass(target, "pag-active");

                    // 如果 data-num = "1" 时要给"上一页"按钮添加 class=disabled
                    if (parseInt(target.getAttribute("data-num"), 10) === 1) {
                        if (Tools.hasClass(target.previousSibling, "disabled") === false) {
                            Tools.addClass(target.previousSibling, "disabled")
                        }
                    }

                    // 如果点击的是最后一页，就给 next-btn 添加 class= disabled
                    // 注: 判斷條件是找到最後一個數字按鈕和總頁數相比較
                    if (parseInt(target.getAttribute("data-num"), 10) === store.totalPages) {
                        if (Tools.hasClass(target.nextSibling, "disabled") === false) {
                            Tools.addClass(target.nextSibling, "disabled")
                        }
                    }

                }
                else {
                    // 页码1,2,3
                    if (curLiDataNum < store.startShowDefaultBtn - 1) {
                        this.innerHTML = PAG.prototype.renderComFirstPagDom(store.startShowDefaultBtn, store.totalPages, store);
                    }


                    // 当页码数 >= 4, 且 (总页数 - 当前点击页数) <= lastShowMinBtn 就渲染出所有的 li
                    if (curLiDataNum >= store.startShowDefaultBtn - 1 &&
                        (store.totalPages - curLiDataNum) <= store.lastShowMinBtn) {
                        this.innerHTML = PAG.prototype.renderPureNumPag(store.totalPages, store);
                    }

                    // 当页码数 >= 4 且 页码数 < store.startShowMaxBtn 并且 (总页数 - 当前点击页数) > lastShowMinBtn 点击当前按钮，其后生成 2个页码
                    if (curLiDataNum >= store.startShowDefaultBtn - 1 &&
                        curLiDataNum < store.startShowMaxBtn - 1 &&
                        (store.totalPages - curLiDataNum) > store.lastShowMinBtn) {

                        // 点击当前按钮其后生成 2 个页码
                        let defaultNum = curLiDataNum + 2;

                        // 情形(3.)
                        this.innerHTML = PAG.prototype.renderComFirstPagDom(defaultNum, store.totalPages, store);

                    }

                    // 当前点击的页码 > startShowDefaultBtn &&  当前页码 < totalPages - lastShowMinBtn -1
                    // console.log( "store.totalPages", store.totalPages );
                    // console.log( "store.lastShowMinBtn", store.lastShowMinBtn );
                    // console.log(store.totalPages - store.lastShowMinBtn);
                    if (curLiDataNum > (store.startShowDefaultBtn + 1) &&
                        curLiDataNum <= (store.totalPages - store.lastShowMinBtn - 1)) {

                        // 情形(13.)(14.)(15.)(16.)
                        this.innerHTML = PAG.prototype.renderComSecPagDom(curLiDataNum, store.totalPages, store)
                    }

                    // 当前点击的页码 > startShowMaxBtn  &&  curLiDataNum > ( totalPages - 6 ) { 注: -6 的原因是當前點擊按鈕之默認都會渲染2個頁碼 }
                    if (curLiDataNum > (store.startShowDefaultBtn + 1) && curLiDataNum > (store.totalPages - 6)) {

                        // 情形(6.)(7.)(8.)(9.)
                        this.innerHTML = PAG.prototype.renderComThirdPagDom(curLiDataNum, store.totalPages, store)
                    }


                    // 移除 li.num-pag 上已经存在的 pag-active
                    removePagActive();


                    // 給當前点击元素添加 pag-active;
                    let targetDataNum = parseInt(target.getAttribute("data-num"), 10);
                    let allLis = [].slice.call(that.querySelectorAll(".num-pag"));

                    previousBtn = Tools.selectorEle(store.previousBtn, false);
                    nextBtn = Tools.selectorEle(store.nextBtn, false);

                    allLis.forEach(function (item) {

                        // 记录点击的 li 生成页码后，把点之前的 li 选中
                        let itemDataNum = parseInt(item.getAttribute("data-num"), 10);
                        if (targetDataNum === itemDataNum) Tools.addClass(item, "pag-active");

                        // 如果点击的li data-num !== 1, 就移除 previousBtn 上的 disabled
                        if (targetDataNum !== 1) {
                            if (Tools.hasClass(previousBtn, "disabled")) Tools.removeClass(previousBtn, "disabled")
                        }

                        // 如果点击的li data-num === 1, 就给 previousBtn 添加 disabled
                        if (targetDataNum === 1) {
                            if (Tools.hasClass(previousBtn, "disabled") === false) Tools.addClass(previousBtn, "disabled")
                        }

                        // console.log( "targetDataNum: " + targetDataNum );
                        // console.log( "store.totalPages: " + store.totalPages );
                        if (targetDataNum === store.totalPages) {
                            if (Tools.hasClass(nextBtn, "disabled") === false) Tools.addClass(nextBtn, "disabled");
                        }
                        if (targetDataNum !== store.totalPages) {
                            if (Tools.hasClass(nextBtn, "disabled")) Tools.removeClass(nextBtn, "disabled");
                        }

                    });

                }

            }


            // 所有的 li (allLis) + 当前选中的li pag-active
            let allNumLis = null,
                activeEle = null,
                actEleDataNum = null;


            // 复用 if 语句
            let fnReusingIfStatements = function (recordPagNum, that) {

                // 页码 1, 2, 3
                if (recordPagNum < store.startShowDefaultBtn - 1) {
                    that.innerHTML = PAG.prototype.renderComFirstPagDom(store.startShowDefaultBtn, store.totalPages, store);
                }

                // 当页码数 >= 4, 且 (总页数 - 当前点击页数) <= lastShowMinBtn 就渲染出所有的 li
                if (recordPagNum >= store.startShowDefaultBtn - 1 &&
                    (store.totalPages - recordPagNum) <= store.lastShowMinBtn) {
                    that.innerHTML = PAG.prototype.renderPureNumPag(store.totalPages, store);
                }

                if (recordPagNum >= store.startShowDefaultBtn - 1 &&
                    recordPagNum < store.startShowMaxBtn - 1 &&
                    (store.totalPages - recordPagNum) > store.lastShowMinBtn) {

                    // 当前按钮其后生成 2 个页码
                    let defaultNum = recordPagNum + 2;

                    // 情形(3.)
                    that.innerHTML = PAG.prototype.renderComFirstPagDom(defaultNum, store.totalPages, store);
                }

                if (recordPagNum > (store.startShowDefaultBtn + 1) &&
                    recordPagNum <= (store.totalPages - store.lastShowMinBtn - 1)) {
                    // 情形(13.)(14.)(15.)(16.)
                    that.innerHTML = PAG.prototype.renderComSecPagDom(recordPagNum, store.totalPages, store);

                }

                // 当前点击的页码 > startShowMaxBtn  &&  curLiDataNum > ( totalPages - 6 ) { 注: -6 的原因是當前點擊按鈕之默認都會渲染2個頁碼 }
                if (recordPagNum > (store.startShowDefaultBtn + 1) && recordPagNum > (store.totalPages - 6)) {
                    // 情形(6.)(7.)(8.)(9.)
                    that.innerHTML = PAG.prototype.renderComThirdPagDom(recordPagNum, store.totalPages, store)
                }

                allNumLis = [].slice.call(that.querySelectorAll(".num-pag"));
                // 移除 li.num-pag 上已经存在的 pag-active
                removePagActive(allNumLis);

                // console.log("recordPagNum", recordPagNum);

                allNumLis.forEach(function (item) {
                    if (parseInt(item.getAttribute("data-num"), 10) === recordPagNum) {
                        Tools.addClass(item, "pag-active");
                    }
                });


                let previousBtn = Tools.selectorEle(store.previousBtn, false);
                let nextBtn = Tools.selectorEle(store.nextBtn, false);
                // 数字按钮第2个
                if (recordPagNum >= 2) {
                    if (Tools.hasClass(previousBtn, "disabled")) {
                        Tools.removeClass(previousBtn, "disabled");
                    }
                }

                // 数字按钮倒数第2个
                if (recordPagNum === store.totalPages) {
                    if (Tools.hasClass(nextBtn, "disabled") === false) {
                        Tools.addClass(nextBtn, "disabled");
                    }
                }
            };


            // 上一页按钮
            if (Tools.hasClass(target, "previous-btn")) {

                // 如果 previous-btn 有 disabled 样式代表当前不能点击，直接返回
                if (Tools.hasClass(target, "disabled")) return;

                activeEle = getClassName("pag-active", this)[0];
                actEleDataNum = parseInt(activeEle.getAttribute("data-num"), 10);

                // 把当前含有 pag-active 元素的 data-num 赋值给 全局存储对象下的 recordPagNum 属性
                store.recordPagNum = actEleDataNum;


                let activePreEle = activeEle.previousSibling;
                let preEleDataNum = parseInt(activePreEle.getAttribute("data-num"), 10);


                // 总页数 <= 开头最大显示页码(默认：8) 一次创建完所有分页。
                if (store.totalPages <= store.startShowMaxBtn) {

                    allNumLis = [].slice.call(this.querySelectorAll(".num-pag"));
                    if (preEleDataNum <= allNumLis.length) {
                        if (Tools.hasClass(activeEle, "pag-active")) {
                            Tools.removeClass(activeEle, "pag-active");
                            Tools.addClass(activePreEle, "pag-active");
                        }
                    }

                    // 数字按钮第2个: allLis.length - 2 (上一页按钮 + 下一页按钮)
                    if (Tools.hasClass(target.nextSibling, "pag-active")) {
                        if (Tools.hasClass(target, "disabled") === false) {
                            Tools.addClass(target, "disabled");
                        }
                    }

                    // 数字按钮倒数第2个
                    if (parseInt(activeEle.getAttribute("data-num"), 10) === store.startShowMaxBtn) {
                        if (Tools.hasClass(activeEle.nextSibling, "disabled")) {
                            Tools.removeClass(activeEle.nextSibling, "disabled");
                        }
                    }

                }
                else {

                    // 注: 把当前记录的数字 - 1 是因为 点击 Previous 之后 li.pag-active元素的上一个处于选中，
                    // 所以比较应该是上一个元素添加 pag-active。 注: store.recordPagNum 不能小于 0
                    store.recordPagNum = store.recordPagNum - 1;
                    if (store.recordPagNum < 0) {
                        return;
                    }
                    console.log(store.recordPagNum);

                    // 调用: 复用 if 语句函数
                    fnReusingIfStatements(store.recordPagNum, that);
                }

            }


            // 下一页按钮
            if (Tools.hasClass(target, "next-btn")) {

                // 如果当前按钮有 disabled 样式代表当前不能点击，直接返回
                if (Tools.hasClass(target, "disabled")) return;

                // 首先取得当前 li.pag-active
                activeEle = getClassName("pag-active", this)[0];
                actEleDataNum = parseInt(activeEle.getAttribute("data-num"), 10);

                // 把当前含有 li.pag-active 元素的 data-num 赋值给 全局存储对象下的 recordPagNum 属性,以便下面判断使用
                store.recordPagNum = actEleDataNum;

                let activeNextEle = activeEle.nextSibling;
                let nextEleDataNum = parseInt(activeNextEle.getAttribute("data-num"), 10);


                // 总页数 <= 开头最大显示页码(默认：8)
                if (store.totalPages <= store.startShowMaxBtn) {

                    allNumLis = [].slice.call(this.querySelectorAll(".num-pag"));

                    if (nextEleDataNum <= allNumLis.length) {
                        if (Tools.hasClass(activeEle, "pag-active")) {
                            Tools.removeClass(activeEle, "pag-active");
                            Tools.addClass(activeNextEle, "pag-active");
                        }
                    }

                    // 数字按钮第2个
                    if (nextEleDataNum === 2) {
                        if (Tools.hasClass(activeEle.previousSibling, "disabled")) {
                            Tools.removeClass(activeEle.previousSibling, "disabled");
                        }
                    }

                    // 数字按钮倒数第2个
                    if (Tools.hasClass(target.previousSibling, "pag-active")) {
                        if (Tools.hasClass(target, "disabled") === false) {
                            Tools.addClass(target, "disabled");
                        }
                    }

                }
                else {

                    // 注: 把当前记录的数字 + 1 是因为 点击 Next 之后 li.pag-active元素的下一个处于选中，
                    // 所以比较应该是下一个元素添加 pag-active。 注: store.recordPagNum 不能大于 totalPages
                    store.recordPagNum = store.recordPagNum + 1;
                    if (store.recordPagNum > store.totalPages) {
                        return;
                    }
                    // console.log(store.recordPagNum);

                    // 调用: 复用 if 语句函数
                    fnReusingIfStatements(store.recordPagNum, that);

                }

            }
        })

    },

};


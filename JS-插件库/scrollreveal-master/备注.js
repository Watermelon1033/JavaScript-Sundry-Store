/*
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
        3: {
            config: {...},
            domEl: p.foo,
            id: 3,
            revealing: true,
            seen: false,
            sequence: {id: 1, index: 0, timer: null},
            styles: {
                computed: {
                    opacity: "1",
                    transition: ""
                },
                inline: "; visibility: visible",
                transform: {...},
                transition: {...}
            },
            timer: null
        },
        4: {
            config: {...},
            domEl: p.foo,
            id: 4,
            revealing: true,
            seen: false,
            sequence: {id: 1, index: 0, timer: null},
            styles: {
                computed: {
                    opacity: "1",
                    transition: ""
                },
                inline: "; visibility: visible",
                transform: {...},
                transition: {...}
            },
            timer: null
        },
        5: {
            config: {...},
            domEl: p.foo,
            id: 5,
            revealing: true,
            seen: false,
            sequence: {id: 1, index: 0, timer: null},
            styles: {
                computed: {
                    opacity: "1",
                    transition: ""
                },
                inline: "; visibility: visible",
                transform: {...},
                transition: {...}
            },
            timer: null
        },
        6: {
            config: {...},
            domEl: p.foo,
            id: 6,
            revealing: true,
            seen: false,
            sequence: {id: 1, index: 0, timer: null},
            styles: {
                computed: {
                    opacity: "1",
                    transition: ""
                },
                inline: "; visibility: visible",
                transform: {...},
                transition: {...}
            },
            timer: null
        },
        7: {
            config: {...},
            domEl: p.foo,
            id: 7,
            revealing: true,
            seen: false,
            sequence: {id: 1, index: 0, timer: null},
            styles: {
                computed: {
                    opacity: "1",
                    transition: ""
                },
                inline: "; visibility: visible",
                transform: {...},
                transition: {...}
            },
            timer: null
        },
        8: {
            config: {...},
            domEl: p.foo,
            id: 8,
            revealing: true,
            seen: false,
            sequence: {id: 1, index: 0, timer: null},
            styles: {
                computed: {
                    opacity: "1",
                    transition: ""
                },
                inline: "; visibility: visible",
                transform: {...},
                transition: {...}
            },
            timer: null
        },
        9: {
            config: {...},
            domEl: p.foo,
            id: 9,
            revealing: true,
            seen: false,
            sequence: {id: 1, index: 0, timer: null},
            styles: {
                computed: {
                    opacity: "1",
                    transition: ""
                },
                inline: "; visibility: visible",
                transform: {...},
                transition: {...}
            },
            timer: null
        },
    },
    container: [ html,]
}
*/




/** 关于在构造函数的方法上定义全局属性的问题 **/
function Person(name, age, job){
    this.name = name;
    this.age = age;
    this.job = job;
    this.friends = ["Shelby", "Court"];
}

Person.prototype = {
    constructor : Person,
    sayName : function(){
        this.age2 = 28;
        console.log(this.age2);     // 28
        // console.log(this.name);
    },
    sayOther: function () {
        console.log(this.age2);
    }
}
var person1 = new Person("Nicholas", 29, "Software Engineer");
var person2 = new Person("Greg", 27, "Doctor");
person1.friends.push("Van");
/*alert(person1.friends); //"Shelby,Count,Van"
alert(person2.friends); //"Shelby,Count"*/
console.log(person1.friends === person2.friends); //false
console.log(person1.sayName === person2.sayName); //true
person1.sayName();  // 28
person1.sayOther(); // 28
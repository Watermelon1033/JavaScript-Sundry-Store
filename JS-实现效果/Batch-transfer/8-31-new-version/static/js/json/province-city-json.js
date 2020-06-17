/**
 * 模拟: 线上省市数据--json
 */

var provinceCityJson = {
    data: {
        letters: [
            {alphaOrder: "A-G"},
            {alphaOrder: "H-K"},
            {alphaOrder: "L-S"},
            {alphaOrder: "T-Z"}
        ],
        province: [
            {
                "lettersBlock": [
                    {code: "11", "provinceName": "北京"},
                    {code: "34", "provinceName": "安徽省"},
                    {code: "35", "provinceName": "福建省"},
                    {code: "44", "provinceName": "广东省"},
                    {code: "45", "provinceName": "广西"},
                    {code: "50", "provinceName": "重庆"},
                    {code: "52", "provinceName": "贵州省"},
                    {code: "62", "provinceName": "甘肃省"}
                ]
            },
            {
                "lettersBlock": [
                    {code: "13", "provinceName": "河北省"},
                    {code: "22", "provinceName": "吉林省"},
                    {code: "23", "provinceName": "黑龙江省"},
                    {code: "32", "provinceName": "江苏省"},
                    {code: "36", "provinceName": "江西省"},
                    {code: "41", "provinceName": "河南省"},
                    {code: "42", "provinceName": "湖北省"},
                    {code: "43", "provinceName": "湖南省"},
                    {code: "46", "provinceName": "海南省"}
                ]
            },
            {
                "lettersBlock": [
                    {code: "14", "provinceName": "山西省"},
                    {code: "15", "provinceName": "内蒙古"},
                    {code: "21", "provinceName": "辽宁省"},
                    {code: "31", "provinceName": "上海"},
                    {code: "37", "provinceName": "山东省"},
                    {code: "51", "provinceName": "四川省"},
                    {code: "61", "provinceName": "陕西省"},
                    {code: "63", "provinceName": "青海省"},
                    {code: "64", "provinceName": "宁夏"}
                ]
            },
            {
                "lettersBlock": [
                    {code: "12", "provinceName": "天津"},
                    {code: "33", "provinceName": "浙江省"},
                    {code: "53", "provinceName": "云南省"},
                    {code: "54", "provinceName": "西藏"},
                    {code: "65", "provinceName": "新疆"}
                ]
            }
        ],
        city: [
            {cityName: "北京市", code: "1000", parentCode: "11"},
            {cityName: "天津市", code: "1100", parentCode: "12"},
            {cityName: "石家庄市", code: "1210", parentCode: "13"},
            {cityName: "唐山市", code: "1240", parentCode: "13"},
            {cityName: "秦皇岛市", code: "1260", parentCode: "13"},
            {cityName: "邯郸市", code: "1270", parentCode: "13"},
            {cityName: "邢台市", code: "1310", parentCode: "13"},
            {cityName: "保定市", code: "1340", parentCode: "13"},
            {cityName: "张家口市", code: "1380", parentCode: "13"},
            {cityName: "承德市", code: "1410", parentCode: "13"},
            {cityName: "沧州市", code: "1430", parentCode: "13"},
            {cityName: "廊坊市", code: "1460", parentCode: "13"},
            {cityName: "衡水市", code: "1480", parentCode: "13"},
            {cityName: "太原市", code: "1610", parentCode: "14"},
            {cityName: "大同市", code: "1620", parentCode: "14"},
            {cityName: "阳泉市", code: "1630", parentCode: "14"},
            {cityName: "长治市", code: "1640", parentCode: "14"},
            {cityName: "晋城市", code: "1680", parentCode: "14"},
            {cityName: "朔州市", code: "1690", parentCode: "14"},
            {cityName: "忻州市", code: "1710", parentCode: "14"},
            {cityName: "吕梁市", code: "1730", parentCode: "14"},
            {cityName: "晋中市", code: "1750", parentCode: "14"},
            {cityName: "临汾市", code: "1770", parentCode: "14"},
            {cityName: "运城市", code: "1810", parentCode: "14"},
            {cityName: "呼和浩特市", code: "1910", parentCode: "15"},
            {cityName: "包头市", code: "1920", parentCode: "15"},
            {cityName: "乌海市", code: "1930", parentCode: "15"},
            {cityName: "赤峰市", code: "1940", parentCode: "15"},
            {cityName: "呼伦贝尔市", code: "1960", parentCode: "15"},
            {cityName: "兴安盟", code: "1980", parentCode: "15"},
            {cityName: "通辽市", code: "1990", parentCode: "15"}, {
                cityName: "锡林郭勒盟", code: "2010", parentCode: "15"
            },
            {cityName: "乌兰察布市", code: "2030", parentCode: "15"}, {
                cityName: "鄂尔多斯市", code: "2050", parentCode: "15"
            },
            {cityName: "巴彦淖尔市", code: "2070", parentCode: "15"}, {
                cityName: "阿拉善盟", code: "2080", parentCode: "15"
            },
            {cityName: "沈阳市", code: "2210", parentCode: "21"}, {
                cityName: "大连市", code: "2220", parentCode: "21"
            },
            {cityName: "鞍山市", code: "2230", parentCode: "21"}, {
                cityName: "抚顺市", code: "2240", parentCode: "21"
            },
            {cityName: "本溪市", code: "2250", parentCode: "21"}, {
                cityName: "丹东市", code: "2260", parentCode: "21"
            },
            {cityName: "锦州市", code: "2270", parentCode: "21"}, {
                cityName: "葫芦岛市", code: "2276", parentCode: "21"
            },
            {cityName: "营口市", code: "2280", parentCode: "21"}, {
                cityName: "阜新市", code: "2290", parentCode: "21"
            },
            {cityName: "辽阳市", code: "2310", parentCode: "21"}, {
                cityName: "盘锦市", code: "2320", parentCode: "21"
            },
            {cityName: "铁岭市", code: "2330", parentCode: "21"}, {
                cityName: "朝阳市", code: "2340", parentCode: "21"
            },
            {cityName: "长春市", code: "2410", parentCode: "22"}, {
                cityName: "吉林市", code: "2420", parentCode: "22"
            },
            {cityName: "四平市", code: "2430", parentCode: "22"}, {
                cityName: "辽源市", code: "2440", parentCode: "22"
            },
            {cityName: "通化市", code: "2450", parentCode: "22"}, {
                cityName: "白山市", code: "2460", parentCode: "22"
            },
            {cityName: "白城市", code: "2470", parentCode: "22"}, {
                cityName: "松原市", code: "2520", parentCode: "22"
            },
            {cityName: "延边朝鲜族自治州", code: "2490", parentCode: "22"}, {
                cityName: "哈尔滨市", code: "2610", parentCode: "23"
            },
            {cityName: "齐齐哈尔市", code: "2640", parentCode: "23"}, {
                cityName: "大庆市", code: "2650", parentCode: "23"
            },
            {cityName: "鸡西市", code: "2660", parentCode: "23"}, {
                cityName: "鹤岗市", code: "2670", parentCode: "23"
            },
            {cityName: "双鸭山市", code: "2680", parentCode: "23"}, {
                cityName: "佳木斯市", code: "2690", parentCode: "23"
            },
            {cityName: "伊春市", code: "2710", parentCode: "23"}, {
                cityName: "牡丹江市", code: "2720", parentCode: "23"
            },
            {cityName: "七台河市", code: "2740", parentCode: "23"}, {
                cityName: "绥化市", code: "2760", parentCode: "23"
            },
            {cityName: "黑河市", code: "2780", parentCode: "23"}, {
                cityName: "大兴安岭地区", code: "2790", parentCode: "23"
            },
            {cityName: "上海市", code: "2900", parentCode: "31"}, {
                cityName: "南京市", code: "3010", parentCode: "32"
            },
            {cityName: "无锡市", code: "3020", parentCode: "32"}, {
                cityName: "徐州市", code: "3030", parentCode: "32"
            },
            {cityName: "常州市", code: "3040", parentCode: "32"}, {
                cityName: "苏州市", code: "3050", parentCode: "32"
            },
            {cityName: "南通市", code: "3060", parentCode: "32"}, {
                cityName: "连云港市", code: "3070", parentCode: "32"
            },
            {cityName: "淮安市", code: "3080", parentCode: "32"}, {
                cityName: "宿迁市", code: "3090", parentCode: "32"
            },
            {cityName: "盐城市", code: "3110", parentCode: "32"}, {
                cityName: "扬州市", code: "3120", parentCode: "32"
            },
            {cityName: "泰州市", code: "3128", parentCode: "32"}, {
                cityName: "镇江市", code: "3140", parentCode: "32"
            },
            {cityName: "杭州市", code: "3310", parentCode: "33"}, {
                cityName: "宁波市", code: "3320", parentCode: "33"
            },
            {cityName: "温州市", code: "3330", parentCode: "33"}, {
                cityName: "嘉兴市", code: "3350", parentCode: "33"
            },
            {cityName: "湖州市", code: "3360", parentCode: "33"}, {
                cityName: "绍兴市", code: "3370", parentCode: "33"
            },
            {cityName: "金华市", code: "3380", parentCode: "33"}, {
                cityName: "衢州市", code: "3410", parentCode: "33"
            },
            {cityName: "舟山市", code: "3420", parentCode: "33"}, {
                cityName: "丽水市", code: "3430", parentCode: "33"
            },
            {cityName: "台州市", code: "3450", parentCode: "33"}, {
                cityName: "合肥市", code: "3610", parentCode: "34"
            },
            {cityName: "芜湖市", code: "3620", parentCode: "34"}, {
                cityName: "蚌埠市", code: "3630", parentCode: "34"
            },
            {cityName: "淮南市", code: "3640", parentCode: "34"}, {
                cityName: "马鞍山市", code: "3650", parentCode: "34"
            },
            {cityName: "淮北市", code: "3660", parentCode: "34"}, {
                cityName: "安庆市", code: "3680", parentCode: "34"
            },
            {cityName: "阜阳市", code: "3720", parentCode: "34"}, {
                cityName: "亳州市", code: "3722", parentCode: "34"
            },
            {cityName: "滁州市", code: "3750", parentCode: "34"}, {
                cityName: "宣城市", code: "3771", parentCode: "34"
            },
            {cityName: "池州市", code: "3790", parentCode: "34"}, {
                cityName: "厦门市", code: "3930", parentCode: "35"
            },
            {cityName: "三明市", code: "3950", parentCode: "35"}, {
                cityName: "漳州市", code: "3990", parentCode: "35"
            },
            {cityName: "宁德市", code: "4030", parentCode: "35"}, {
                cityName: "龙岩市", code: "4050", parentCode: "35"
            },
            {cityName: "萍乡市", code: "4230", parentCode: "36"}, {
                cityName: "九江市", code: "4240", parentCode: "36"
            },
            {cityName: "鹰潭市", code: "4270", parentCode: "36"}, {
                cityName: "宜春市", code: "4310", parentCode: "36"
            },
            {cityName: "吉安市", code: "4350", parentCode: "36"}, {
                cityName: "抚州市", code: "4370", parentCode: "36"
            },
            {cityName: "青岛市", code: "4520", parentCode: "37"}, {
                cityName: "枣庄市", code: "4540", parentCode: "37"
            },
            {cityName: "烟台市", code: "4560", parentCode: "37"}, {
                cityName: "济宁市", code: "4610", parentCode: "37"
            },
            {cityName: "莱芜市", code: "4634", parentCode: "37"}, {
                cityName: "威海市", code: "4650", parentCode: "37"
            },
            {cityName: "德州市", code: "4680", parentCode: "37"}, {
                cityName: "临沂市", code: "4730", parentCode: "37"
            },
            {cityName: "菏泽市", code: "4750", parentCode: "37"}, {
                cityName: "郑州市", code: "4910", parentCode: "41"
            },
            {cityName: "洛阳市", code: "4930", parentCode: "41"}, {
                cityName: "安阳市", code: "4960", parentCode: "41"
            },
            {cityName: "鹤壁市", code: "4970", parentCode: "41"}, {
                cityName: "焦作市", code: "5010", parentCode: "41"
            },
            {cityName: "许昌市", code: "5030", parentCode: "41"}, {
                cityName: "三门峡市", code: "5050", parentCode: "41"
            },
            {cityName: "周口市", code: "5080", parentCode: "41"}, {
                cityName: "南阳市", code: "5130", parentCode: "41"
            },
            {cityName: "武汉市", code: "5210", parentCode: "42"}, {
                cityName: "十堰市", code: "5230", parentCode: "42"
            },
            {cityName: "宜昌市", code: "5260", parentCode: "42"}, {
                cityName: "随州市", code: "5286", parentCode: "42"
            },
            {cityName: "荆门市", code: "5320", parentCode: "42"}, {
                cityName: "孝感市", code: "5350", parentCode: "42"
            },
            {cityName: "荆州市", code: "5370", parentCode: "42"}, {
                cityName: "长沙市", code: "5510", parentCode: "43"
            },
            {cityName: "湘潭市", code: "5530", parentCode: "43"}, {
                cityName: "邵阳市", code: "5550", parentCode: "43"
            },
            {cityName: "常德市", code: "5580", parentCode: "43"}, {
                cityName: "益阳市", code: "5610", parentCode: "43"
            },
            {cityName: "娄底市", code: "5620", parentCode: "43"}, {
                cityName: "永州市", code: "5650", parentCode: "43"
            },
            {cityName: "吉首市", code: "5690", parentCode: "43"}, {
                cityName: "韶关市", code: "5820", parentCode: "44"
            },
            {cityName: "珠海市", code: "5850", parentCode: "44"}, {
                cityName: "汕头市", code: "5860", parentCode: "44"
            },
            {cityName: "潮州市", code: "5869", parentCode: "44"}, {
                cityName: "江门市", code: "5890", parentCode: "44"
            },
            {cityName: "茂名市", code: "5920", parentCode: "44"}, {
                cityName: "云浮市", code: "5937", parentCode: "44"
            },
            {cityName: "梅州市", code: "5960", parentCode: "44"}, {
                cityName: "河源市", code: "5980", parentCode: "44"
            },
            {cityName: "清远市", code: "6010", parentCode: "44"}, {
                cityName: "中山市", code: "6030", parentCode: "44"
            },
            {cityName: "崇左市", code: "6128", parentCode: "45"}, {
                cityName: "来宾市", code: "6155", parentCode: "45"
            },
            {cityName: "桂林市", code: "6170", parentCode: "45"}, {
                cityName: "贺州市", code: "6225", parentCode: "45"
            },
            {cityName: "玉林市", code: "6240", parentCode: "45"}, {
                cityName: "百色市", code: "6261", parentCode: "45"
            },
            {cityName: "河池市", code: "6281", parentCode: "45"}, {
                cityName: "海口市", code: "6410", parentCode: "46"
            },
            {cityName: "三亚市", code: "6420", parentCode: "46"}, {
                cityName: "成都市", code: "6510", parentCode: "51"
            },
            {cityName: "自贡市", code: "6550", parentCode: "51"}, {
                cityName: "泸州市", code: "6570", parentCode: "51"
            },
            {cityName: "德阳市", code: "6580", parentCode: "51"}, {
                cityName: "广元市", code: "6610", parentCode: "51"
            },
            {cityName: "内江市", code: "6630", parentCode: "51"}, {
                cityName: "乐山市", code: "6650", parentCode: "51"
            },
            {cityName: "宜宾市", code: "6710", parentCode: "51"}, {
                cityName: "广安市", code: "6737", parentCode: "51"
            },
            {cityName: "达州市", code: "6750", parentCode: "51"}, {
                cityName: "雅安市", code: "6770", parentCode: "51"
            },
            {cityName: "阿坝藏族羌族自治州", code: "6790", parentCode: "51"}, {
                cityName: "凉山彝族自治州", code: "6840", parentCode: "51"
            },
            {cityName: "万州区", code: "6670", parentCode: "50"}, {
                cityName: "贵阳市", code: "7010", parentCode: "52"
            },
            {cityName: "遵义市", code: "7030", parentCode: "52"}, {
                cityName: "铜仁地区", code: "7050", parentCode: "52"
            },
            {cityName: "毕节地区", code: "7090", parentCode: "52"}, {
                cityName: "安顺市", code: "7110", parentCode: "52"
            },
            {cityName: "黔南州", code: "7150", parentCode: "52"}, {
                cityName: "昆明市", code: "7310", parentCode: "53"
            },
            {cityName: "曲靖市", code: "7360", parentCode: "53"}, {
                cityName: "玉溪市", code: "7410", parentCode: "53"
            },
            {cityName: "文山壮族苗族自治州", code: "7450", parentCode: "53"}, {
                cityName: "思茅市", code: "7470", parentCode: "53"
            },
            {cityName: "西双版纳傣族自治州", code: "7490", parentCode: "53"}, {
                cityName: "保山市", code: "7530", parentCode: "53"
            },
            {cityName: "德宏傣族景颇族自治州", code: "7540", parentCode: "53"}, {
                cityName: "怒江傈僳族自治州", code: "7560", parentCode: "53"
            },
            {cityName: "临沧市", code: "7580", parentCode: "53"}, {
                cityName: "拉萨市", code: "7700", parentCode: "54"
            },
            {cityName: "山南地区", code: "7740", parentCode: "54"}, {
                cityName: "日喀则地区", code: "7760", parentCode: "54"
            },
            {cityName: "阿里地区", code: "7811", parentCode: "54"}, {
                cityName: "西安市", code: "7910", parentCode: "61"
            },
            {cityName: "铜川市", code: "7920", parentCode: "61"}, {
                cityName: "咸阳市", code: "7950", parentCode: "61"
            },
            {cityName: "汉中市", code: "7990", parentCode: "61"}, {
                cityName: "商洛市", code: "8030", parentCode: "61"
            },
            {cityName: "榆林市", code: "8060", parentCode: "61"}, {
                cityName: "嘉峪关市", code: "8220", parentCode: "62"
            },
            {cityName: "白银市", code: "8240", parentCode: "62"}, {
                cityName: "酒泉市", code: "8260", parentCode: "62"
            },
            {cityName: "张掖市", code: "8270", parentCode: "62"}, {
                cityName: "定西市", code: "8290", parentCode: "62"
            },
            {cityName: "平凉市", code: "8330", parentCode: "62"}, {
                cityName: "临夏州", code: "8360", parentCode: "62"
            },
            {cityName: "西宁市", code: "8510", parentCode: "63"}, {
                cityName: "海北藏族自治州", code: "8540", parentCode: "63"
            },
            {cityName: "黄南藏族自治州", code: "8550", parentCode: "63"}, {
                cityName: "果洛藏族自治州", code: "8570", parentCode: "63"
            },
            {cityName: "玉树藏族自治州", code: "8580", parentCode: "63"}, {
                cityName: "银川市", code: "8710", parentCode: "64"
            },
            {cityName: "石嘴山市", code: "8720", parentCode: "64"}, {
                cityName: "吴忠市", code: "8731", parentCode: "64"
            },
            {cityName: "固原市", code: "8741", parentCode: "64"}, {
                cityName: "克拉玛依市", code: "8820", parentCode: "65"
            },
            {cityName: "吐鲁番市", code: "8830", parentCode: "65"}, {
                cityName: "阿勒泰地区", code: "8844", parentCode: "65"
            },
            {cityName: "博尔塔拉蒙古自治州", code: "8870", parentCode: "65"}, {
                cityName: "阿克苏地区", code: "8910", parentCode: "65"
            },
            {cityName: "克孜勒苏柯尔克孜自治州", code: "8930", parentCode: "65"}, {
                cityName: "喀什地区", code: "8940", parentCode: "65"
            },
            {cityName: "和田地区", code: "8960", parentCode: "65"}, {
                cityName: "伊犁哈萨克自治州", code: "8980", parentCode: "65"
            },
            {cityName: "阿勒泰地区", code: "9020", parentCode: "65"}, {
                cityName: "铜陵市", code: "3670", parentCode: "34"
            },
            {cityName: "黄山市", code: "3710", parentCode: "34"}, {
                cityName: "宿州市", code: "3740", parentCode: "34"
            },
            {cityName: "六安市", code: "3760", parentCode: "34"}, {
                cityName: "巢湖市", code: "3781", parentCode: "34"
            },
            {cityName: "福州市", code: "3910", parentCode: "35"}, {
                cityName: "莆田市", code: "3940", parentCode: "35"
            },
            {cityName: "泉州市", code: "3970", parentCode: "35"}, {
                cityName: "南平市", code: "4010", parentCode: "35"
            },
            {cityName: "南昌市", code: "4210", parentCode: "36"}, {
                cityName: "景德镇市", code: "4220", parentCode: "36"
            },
            {cityName: "新余市", code: "4260", parentCode: "36"}, {
                cityName: "赣州市", code: "4280", parentCode: "36"
            },
            {cityName: "上饶市", code: "4330", parentCode: "36"}, {
                cityName: "济南市", code: "4510", parentCode: "37"
            },
            {cityName: "淄博市", code: "4530", parentCode: "37"}, {
                cityName: "东营市", code: "4550", parentCode: "37"
            },
            {cityName: "潍坊市", code: "4580", parentCode: "37"}, {
                cityName: "泰安市", code: "4630", parentCode: "37"
            },
            {cityName: "滨州市", code: "4660", parentCode: "37"}, {
                cityName: "聊城市", code: "4710", parentCode: "37"
            },
            {cityName: "日照市", code: "4732", parentCode: "37"}, {
                cityName: "开封市", code: "4920", parentCode: "41"
            },
            {cityName: "平顶山市", code: "4950", parentCode: "41"}, {
                cityName: "新乡市", code: "4980", parentCode: "41"
            },
            {cityName: "濮阳市", code: "5020", parentCode: "41"}, {
                cityName: "漯河市", code: "5040", parentCode: "41"
            },
            {cityName: "商丘市", code: "5060", parentCode: "41"}, {
                cityName: "驻马店市", code: "5110", parentCode: "41"
            },
            {cityName: "信阳市", code: "5150", parentCode: "41"}, {
                cityName: "黄石市", code: "5220", parentCode: "42"
            },
            {cityName: "襄樊市", code: "5280", parentCode: "42"}, {
                cityName: "鄂州市", code: "5310", parentCode: "42"
            },
            {cityName: "黄冈市", code: "5330", parentCode: "42"}, {
                cityName: "咸宁市", code: "5360", parentCode: "42"
            },
            {cityName: "恩施州", code: "5410", parentCode: "42"}, {
                cityName: "株州市", code: "5520", parentCode: "43"
            },
            {cityName: "衡阳市", code: "5540", parentCode: "43"}, {
                cityName: "岳阳市", code: "5570", parentCode: "43"
            },
            {cityName: "张家界市", code: "5590", parentCode: "43"}, {
                cityName: "郴州市", code: "5630", parentCode: "43"
            },
            {cityName: "怀化市", code: "5670", parentCode: "43"}, {
                cityName: "广州市", code: "5810", parentCode: "44"
            },
            {cityName: "深圳市", code: "5840", parentCode: "44"}, {
                cityName: "揭阳市", code: "5865", parentCode: "44"
            },
            {cityName: "佛山市", code: "5880", parentCode: "44"}, {
                cityName: "湛江市", code: "5910", parentCode: "44"
            },
            {cityName: "肇庆市", code: "5930", parentCode: "44"}, {
                cityName: "惠州市", code: "5950", parentCode: "44"
            },
            {cityName: "汕尾市", code: "5970", parentCode: "44"}, {
                cityName: "阳江市", code: "5990", parentCode: "44"
            },
            {cityName: "东莞市", code: "6020", parentCode: "44"}, {
                cityName: "南宁市", code: "6110", parentCode: "45"
            },
            {cityName: "柳州市", code: "6140", parentCode: "45"}, {
                cityName: "梧州市", code: "6210", parentCode: "45"
            },
            {cityName: "北海市", code: "6230", parentCode: "45"}, {
                cityName: "贵港市", code: "6242", parentCode: "45"
            },
            {cityName: "钦州市", code: "6311", parentCode: "45"}, {
                cityName: "防城港市", code: "6330", parentCode: "45"
            },
            {cityName: "重庆市", code: "6530", parentCode: "50"}, {
                cityName: "攀枝花市", code: "6560", parentCode: "51"
            },
            {cityName: "绵阳市", code: "6590", parentCode: "51"}, {
                cityName: "遂宁市", code: "6620", parentCode: "51"
            },
            {cityName: "资阳市", code: "6636", parentCode: "51"}, {
                cityName: "眉山市", code: "6652", parentCode: "51"
            },
            {cityName: "南充市", code: "6730", parentCode: "51"}, {
                cityName: "巴中市", code: "6758", parentCode: "51"
            },
            {cityName: "甘孜藏族自治州", code: "6810", parentCode: "51"}, {
                cityName: "涪陵区", code: "6690", parentCode: "50"
            },
            {cityName: "黔江区", code: "6870", parentCode: "50"}, {
                cityName: "六盘水市", code: "7020", parentCode: "52"
            },
            {cityName: "黔西南州", code: "7070", parentCode: "52"}, {
                cityName: "黔东南州", code: "7130", parentCode: "52"
            },
            {cityName: "昭通市", code: "7340", parentCode: "53"}, {
                cityName: "楚雄市", code: "7380", parentCode: "53"
            },
            {cityName: "红河哈尼族彝族自治州", code: "7430", parentCode: "53"}, {
                cityName: "大理白族自治州", code: "7510", parentCode: "53"
            },
            {cityName: "丽江市", code: "7550", parentCode: "53"}, {
                cityName: "迪庆藏族自治州", code: "7570", parentCode: "53"
            },
            {cityName: "昌都地区", code: "7720", parentCode: "54"}, {
                cityName: "那曲地区", code: "7790", parentCode: "54"
            },
            {cityName: "林芝地区", code: "7830", parentCode: "54"}, {
                cityName: "宝鸡市", code: "7930", parentCode: "61"
            },
            {cityName: "渭南市", code: "7970", parentCode: "61"}, {
                cityName: "安康市", code: "8010", parentCode: "61"
            },
            {cityName: "延安市", code: "8040", parentCode: "61"}, {
                cityName: "兰州市", code: "8210", parentCode: "62"
            },
            {cityName: "金昌市", code: "8230", parentCode: "62"}, {
                cityName: "天水市", code: "8250", parentCode: "62"
            },
            {cityName: "武威市", code: "8280", parentCode: "62"}, {
                cityName: "陇南市", code: "8310", parentCode: "62"
            },
            {cityName: "庆阳市", code: "8340", parentCode: "62"}, {
                cityName: "甘南州", code: "8380", parentCode: "62"
            },
            {cityName: "海东地区", code: "8520", parentCode: "63"}, {
                cityName: "海南藏族自治州", code: "8560", parentCode: "63"
            },
            {cityName: "海西蒙古族藏族自治州", code: "8590", parentCode: "63"}, {
                cityName: "中卫市", code: "8733", parentCode: "64"
            },
            {cityName: "乌鲁木齐市", code: "8810", parentCode: "65"}, {
                cityName: "哈密市", code: "8840", parentCode: "65"
            },
            {cityName: "昌吉回族自治州", code: "8850", parentCode: "65"}, {
                cityName: "巴音郭楞蒙古自治州", code: "8880", parentCode: "65"
            },
            {cityName: "塔城地区", code: "9010", parentCode: "65"},
            {cityName: "石河子市", code: "9028", parentCode: "65"}
        ]
    },
    errCode: null,
    msg: null,
    ok: true
};
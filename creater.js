(function($) {
    console.log($.find("div.zi"));
    var MAX_NUM_ONE_LINE = 10;
    var MAX_HEIGHT_FOR_PRINT = 950;
    var units = {
        unit6: ["kewen5", "kewen6", "kewen7", "kewen8"]
    };
    var classes = {
        shizi1: "天,地,人,你,我,他",
        shizi2: "一,二,三,四,五,上,下",
        shizi3: "口,耳,目,手,足,站,坐",
        shizi4: "日,月,水,火,山,石,田,禾",
        shizi5: "对,云,雨,风,花,鸟,虫",

        yuandi1: "六,七,八,九,十",
        yuandi2: "文,数,学,音,乐",
        pinyin: "爸,妈,马,土,不,画,打,棋,鸡,字,词,语,句,子,桌,纸,妹,奶,白,皮,小,桥,台,雪,儿,草,家,是,车,路,灯,走",

        kewen1: "秋,了,树,叶,片,大,飞,会,个",
        kewen2: "的,船,两,头,在,里,看,见,闪,星",
        kewen3: "江,南,可,采,莲,鱼,东,西,北",
        kewen4: "尖,说,春,青,蛙,夏,弯,地,就,东",
        yuandi4: "男,女,开,关,正,反",

        shizi6: "远,有,色,近,听,无,声,去,还,来",
        shizi7: "多,少,黄,牛,只,猫,边,鸭,苹,果,杏,桃",
        shizi8: "书,包,尺,作,业,本,笔,刀,课,早,校",
        shizi9: "明,力,尘,从,众,双,木,林,森,条,心",
        shizi10: "升,国,旗,中,红,歌,起,么,美,丽,立",
        yuandi5: "午,晚,昨,今,年",

        kewen5: "影,前,后,黑,狗,左,右,它,好,朋,友",
        kewen6: "比,尾,巴,谁,长,短,把,伞,兔,最,公",
        kewen7: "写,诗,点,要,过,给,当,串,们,以,成",
        kewen8: "数,彩,半,空,问,到,方,没,更,绿,出,长",
        kewen9: "睡,那,海,真,老,师,吗,同,什,才,亮",
        kewen10: "时,候,觉,得,自,己,很,穿,衣,服,快",
        kewen11: "蓝,又,笑,着,向,和,贝,娃,挂,活,金",

        yuandi7: "哥,姐,弟,叔,爷",
        kewen12: "群,竹,牙,用,几,步,为,参,加,洞,着",
        kewen13: "乌,鸦,处,找,办,旁,许,法,放,进,高",
        kewen14: "住,孩,玩,吧,发,芽,爬,呀,久,回,全,变",
        yuandi8: "工,厂,医,院,生"
    };
    var titles = {
        shizi1: "识字一",
        shizi2: "识字二",
        shizi3: "识字三",
        shizi4: "识字四",
        shizi5: "识字五",

        yuandi1: "语文园地一",
        yuandi2: "语文园地二",
        pinyin: "汉语拼音",

        kewen1: "第一课",
        kewen2: "第二课",
        kewen3: "第三课",
        kewen4: "第四课",
        yuandi4: "语文园地四",

        shizi6: "识字六",
        shizi7: "识字七",
        shizi8: "识字八",
        shizi9: "识字九",
        shizi10: "识字十",
        yuandi5: "语文园地五",

        kewen5: "第五课",
        kewen6: "第六课",
        kewen7: "第七课",
        kewen8: "第八课",
        kewen9: "第九课",
        kewen10: "第十课",
        kewen11: "第十一课",

        yuandi7: "语文园地七",
        kewen12: "第十二课",
        kewen13: "第十三课",
        kewen14: "第十四课",
        yuandi8: "语文园地八"
    };
    var unitDom = [
            '<div class="col">',
                '<div class="pinyin"></div>',
                '<div class="pinyin"></div>',
                '<div class="pinyin-last"></div>',
                '<div class="zi"></div>',
            '</div>'
    ].join("");
    var titleDom = "<h3></h3>";
    var sectionDom = "<section></section>";
    var rowDom = "<div class='row'></div>";
    var root = $("body");

    var createBlock = function(char) {
        var u = $(unitDom);
        u.find(".zi").text(char);
        return u;
    };

    var createRow = function(classKey) {
        var charList = classes[classKey].split(",");
        var formated = calcDataStructure(charList);
        var rows = [];
        for (var i=0; i < formated.length; i++) {
            var row = $(rowDom);
            formated[i].forEach((char) => {
                var unit = createBlock(char);
                row.append(unit);
            });
            rows.push(row);
        }
        return rows;
    };

    var createTitle = function(classKey) {
        var t = $(titleDom);
        t.text(titles[classKey]);
        return t;
    };

    var calcDataStructure = function(charList) {
        var res = [];
        var length = charList.length;
        if (length > MAX_NUM_ONE_LINE) {
            var rowNum = Math.floor(length / MAX_NUM_ONE_LINE) + 1;
            for (var i=0;i<rowNum;i++) {
                res.push(charList.slice(i * MAX_NUM_ONE_LINE, (i + 1) * MAX_NUM_ONE_LINE));
            }
        } else {
            res.push(charList);
        }
        return res;
    };
    var currHeight = 0;
    var create = function(classKey) {
        var height = 0;
        var title = createTitle(classKey);
        root.append(title);
        height = title[0].offsetHeight;
        var rows = createRow(classKey);
        rows.forEach(function (row, index) {
            root.append(row);
            height = height + row[0].offsetHeight;
        });
        currHeight = currHeight + height;
        if (currHeight > MAX_HEIGHT_FOR_PRINT) {
            title.css("page-break-before", "always");
            currHeight = height;
        }
    };

    var createAll = function() {
        Object.keys(titles).forEach(function(key) {
            create(key);
        });
    };
    var createUnit = function(unitKey) {
        units["unit" + unitKey].forEach(function (key) {
            create(key);
        })
    };
    window.createClass = create;
    window.createUnit = createUnit;
    window.createAll = createAll;
})(jQuery);
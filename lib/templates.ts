export type CategoryId =
  | "newyear"
  | "qingming"
  | "dragon"
  | "qixi"
  | "midautumn"
  | "chongyang"
  | "winter-end"
  | "calendar"
  | "solar24";

export interface CategoryMeta {
  id: CategoryId;
  slug: string;
  title: string;
  description: string;
  emoji: string;
}

export interface Template {
  id: string;
  categoryId: CategoryId;
  title: string;
  /** 画布渐变三色（上→中→下） */
  gradient: [string, string, string];
  defaultSalutation: string;
  defaultMessage: string;
  poem: string;
  poemSource: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "newyear",
    slug: "newyear",
    title: "新春年俗",
    description: "小年、除夕、拜年、元宵与开工纳福",
    emoji: "🧧",
  },
  {
    id: "qingming",
    slug: "qingming",
    title: "清明·谷雨",
    description: "慎终追远、踏青与雨生百谷",
    emoji: "🌧️",
  },
  {
    id: "dragon",
    slug: "dragon",
    title: "端午·仲夏",
    description: "粽叶龙舟、夏至长风",
    emoji: "🐲",
  },
  {
    id: "qixi",
    slug: "qixi",
    title: "七夕",
    description: "星河良夜，寸心千里",
    emoji: "✨",
  },
  {
    id: "midautumn",
    slug: "midautumn",
    title: "中秋",
    description: "月圆人圆，桂影婵娟",
    emoji: "🌕",
  },
  {
    id: "chongyang",
    slug: "chongyang",
    title: "重阳",
    description: "登高敬老，菊酒天长",
    emoji: "🏔️",
  },
  {
    id: "winter-end",
    slug: "winter-end",
    title: "冬至·腊八·岁晚",
    description: "一阳来复、粥暖与年味",
    emoji: "❄️",
  },
  {
    id: "calendar",
    slug: "calendar",
    title: "公历节日",
    description: "元旦、劳动节、国庆与更多",
    emoji: "📅",
  },
  {
    id: "solar24",
    slug: "solar24",
    title: "二十四节气",
    description: "物候流转，脚注时光",
    emoji: "🌾",
  },
];

/** 二十四节气：顺序为立春→大寒，文案与诗句偏公有领域或常见引用 */
const SOLAR24: Omit<Template, "categoryId">[] = [
  {
    id: "solar-lichun",
    title: "立春",
    gradient: ["#365314", "#65a30d", "#d9f99d"],
    defaultSalutation: "朋友",
    defaultMessage: "立春到，万物生。愿你在新的节气里轻装前行，心有春风。",
    poem: "阳和起蛰，品物皆春。",
    poemSource: "《宋史·乐志》",
  },
  {
    id: "solar-yushui",
    title: "雨水",
    gradient: ["#164e63", "#0e7490", "#a5f3fc"],
    defaultSalutation: "你",
    defaultMessage: "好雨知时节，愿这场春雨也润到你的忙碌与远方。",
    poem: "好雨知时节，当春乃发生。",
    poemSource: "杜甫《春夜喜雨》",
  },
  {
    id: "solar-jingzhe",
    title: "惊蛰",
    gradient: ["#3f2e05", "#854d0e", "#fde68a"],
    defaultSalutation: "好友",
    defaultMessage: "一雷惊蛰始，微雨众卉新。愿你也被生活温柔唤醒。",
    poem: "微雨众卉新，一雷惊蛰始。",
    poemSource: "韦应物《观田家》",
  },
  {
    id: "solar-chunfen",
    title: "春分",
    gradient: ["#4c1d95", "#7c3aed", "#ddd6fe"],
    defaultSalutation: "远方的你",
    defaultMessage: "昼夜均而寒暑平，愿你的心事也有温柔的平衡。",
    poem: "春分雨脚落声微，柳岸斜风带客归。",
    poemSource: "徐铉《春分日》",
  },
  {
    id: "solar-qingming-term",
    title: "清明（节气）",
    gradient: ["#14532d", "#15803d", "#bbf7d0"],
    defaultSalutation: "亲人",
    defaultMessage: "气清景明，万物皆显。愿思念有处安放，前行仍有力量。",
    poem: "清明时节雨纷纷，路上行人欲断魂。",
    poemSource: "杜牧《清明》",
  },
  {
    id: "solar-guyu",
    title: "谷雨",
    gradient: ["#134e4a", "#0d9488", "#99f6e4"],
    defaultSalutation: "你",
    defaultMessage: "雨生百谷，夏将至。愿你的耕耘都有回响。",
    poem: "谷雨春光晓，山川黛色青。",
    poemSource: "元稹《咏廿四气诗·谷雨》",
  },
  {
    id: "solar-lixia",
    title: "立夏",
    gradient: ["#831843", "#be185d", "#fbcfe8"],
    defaultSalutation: "朋友",
    defaultMessage: "春去夏来，绿荫渐浓。愿你日子清朗，心有凉风。",
    poem: "绿树阴浓夏日长，楼台倒影入池塘。",
    poemSource: "高骈《山亭夏日》",
  },
  {
    id: "solar-xiaoman",
    title: "小满",
    gradient: ["#713f12", "#ca8a04", "#fef08a"],
    defaultSalutation: "你",
    defaultMessage: "小满即安，不求太满。愿你知足常乐，仍有期待。",
    poem: "夜莺啼绿柳，皓月醒长空。",
    poemSource: "欧阳修《小满》",
  },
  {
    id: "solar-mangzhong",
    title: "芒种",
    gradient: ["#422006", "#a16207", "#fcd34d"],
    defaultSalutation: "辛劳的你",
    defaultMessage: "忙有所得，种有所获。异国他乡，也别忘了好好吃饭。",
    poem: "时雨及芒种，四野皆插秧。",
    poemSource: "陆游《时雨》",
  },
  {
    id: "solar-xiazhi",
    title: "夏至",
    gradient: ["#7c2d12", "#ea580c", "#fed7aa"],
    defaultSalutation: "好友",
    defaultMessage: "昼最长、夜最短，把最长的日光留给值得的人和事。",
    poem: "东边日出西边雨，道是无晴却有晴。",
    poemSource: "刘禹锡《竹枝词》",
  },
  {
    id: "solar-xiaoshu",
    title: "小暑",
    gradient: ["#9a3412", "#dc2626", "#fecaca"],
    defaultSalutation: "你",
    defaultMessage: "温风至，小暑来。愿你消暑有方，心静自然凉。",
    poem: "倏忽温风至，因循小暑来。",
    poemSource: "元稹《咏廿四气诗·小暑》",
  },
  {
    id: "solar-dashu",
    title: "大暑",
    gradient: ["#7f1d1d", "#b91c1c", "#fecaca"],
    defaultSalutation: "挂念的你",
    defaultMessage: "大暑三秋近，林钟九夏移。再热的日子也会过去。",
    poem: "大暑运金气，荆扬不知秋。",
    poemSource: "杜甫《毒热寄简崔评事十六弟》",
  },
  {
    id: "solar-liqiu",
    title: "立秋",
    gradient: ["#78350f", "#b45309", "#fde68a"],
    defaultSalutation: "朋友",
    defaultMessage: "一叶知秋，暑气渐收。愿你收获与清凉同在。",
    poem: "乳鸦啼散玉屏空，一枕新凉一扇风。",
    poemSource: "刘翰《立秋》",
  },
  {
    id: "solar-chushu",
    title: "处暑",
    gradient: ["#1e3a8a", "#2563eb", "#bfdbfe"],
    defaultSalutation: "你",
    defaultMessage: "处暑无三日，新凉直万金。愿秋意早日抵达你的窗前。",
    poem: "处暑无三日，新凉直万金。",
    poemSource: "苏泂《长江二首》",
  },
  {
    id: "solar-bailu",
    title: "白露",
    gradient: ["#1c1917", "#44403c", "#e7e5e4"],
    defaultSalutation: "远方的你",
    defaultMessage: "蒹葭苍苍，白露为霜。天凉添衣，愿有人问你粥可温。",
    poem: "蒹葭苍苍，白露为霜。",
    poemSource: "《诗经·秦风》",
  },
  {
    id: "solar-qiufen",
    title: "秋分",
    gradient: ["#713f12", "#b45309", "#fcd34d"],
    defaultSalutation: "好友",
    defaultMessage: "昼夜均长短，秋色正中分。愿你心平气和，万事均衡。",
    poem: "暑退秋澄气转凉，日光夜色两均长。",
    poemSource: "左河水《秋分》",
  },
  {
    id: "solar-hanlu",
    title: "寒露",
    gradient: ["#1e293b", "#334155", "#cbd5e1"],
    defaultSalutation: "家人",
    defaultMessage: "寒露洁秋空，遥山纷在瞩。夜深风凉，记得保暖。",
    poem: "九月寒露白，六关秋气清。",
    poemSource: "韩翃《鲁中送鲁使汝归》",
  },
  {
    id: "solar-shuangjiang",
    title: "霜降",
    gradient: ["#312e81", "#4338ca", "#c7d2fe"],
    defaultSalutation: "你",
    defaultMessage: "霜降水痕收，浅碧鳞鳞露远洲。秋深景肃，心可温热。",
    poem: "霜降水痕收，浅碧鳞鳞露远洲。",
    poemSource: "苏轼《南乡子·霜降水痕收》",
  },
  {
    id: "solar-lidong",
    title: "立冬",
    gradient: ["#292524", "#57534e", "#d6d3d1"],
    defaultSalutation: "朋友",
    defaultMessage: "立冬补冬，补嘴空。愿你身暖胃暖，异乡也有烟火气。",
    poem: "落水荷塘满眼枯，西风渐作北风呼。",
    poemSource: "紫金霜《立冬》",
  },
  {
    id: "solar-xiaoxue",
    title: "小雪",
    gradient: ["#0c4a6e", "#0369a1", "#bae6fd"],
    defaultSalutation: "你",
    defaultMessage: "小雪气寒而将雪矣。愿初雪带来好消息。",
    poem: "甲子徒推小雪天，刺梧犹绿槿花然。",
    poemSource: "张登《小雪日戏题》",
  },
  {
    id: "solar-daxue",
    title: "大雪",
    gradient: ["#1e3a8a", "#1d4ed8", "#e0e7ff"],
    defaultSalutation: "挂念的你",
    defaultMessage: "大雪至，岁将暮。夜深知雪重，愿你有灯有热汤。",
    poem: "夜深知雪重，时闻折竹声。",
    poemSource: "白居易《夜雪》",
  },
  {
    id: "solar-dongzhi-term",
    title: "冬至（节气）",
    gradient: ["#1c1917", "#44403c", "#e7e5e4"],
    defaultSalutation: "亲人",
    defaultMessage: "冬至一阳生，日短之至。愿你三冬暖，春不寒。",
    poem: "天时人事日相催，冬至阳生春又来。",
    poemSource: "杜甫《小至》",
  },
  {
    id: "solar-xiaohan",
    title: "小寒",
    gradient: ["#172554", "#1e40af", "#93c5fd"],
    defaultSalutation: "你",
    defaultMessage: "小寒已近手难舒，终日关门拥火炉。照顾好自己，春天不远。",
    poem: "小寒大寒，冷成冰团。",
    poemSource: "民谚",
  },
  {
    id: "solar-dahan",
    title: "大寒",
    gradient: ["#450a0a", "#991b1b", "#fecaca"],
    defaultSalutation: "好友",
    defaultMessage: "大寒已过腊，岁末待春归。再坚持一下，就是新年。",
    poem: "腊酒自盈樽，金炉兽炭温。",
    poemSource: "元稹《咏廿四气诗·大寒》",
  },
];

export const TEMPLATES: Template[] = [
  /* —— 新春年俗 —— */
  {
    id: "spring-lantern",
    categoryId: "newyear",
    title: "红灯迎春",
    gradient: ["#7f1d1d", "#b91c1c", "#fca5a5"],
    defaultSalutation: "亲爱的家人",
    defaultMessage: "愿新的一年平安喜乐，万事顺遂。虽隔山海，心与家同在。",
    poem: "爆竹声中一岁除，春风送暖入屠苏。",
    poemSource: "王安石《元日》",
  },
  {
    id: "spring-gold",
    categoryId: "newyear",
    title: "金玉满堂",
    gradient: ["#422006", "#a16207", "#fde047"],
    defaultSalutation: "尊敬的长辈",
    defaultMessage: "恭祝您新春吉祥，身体康健，福泽绵长。",
    poem: "愿得长如此，年年物候新。",
    poemSource: "卢照邻《元日述怀》",
  },
  {
    id: "spring-bamboo",
    categoryId: "newyear",
    title: "竹报平安",
    gradient: ["#064e3b", "#059669", "#a7f3d0"],
    defaultSalutation: "好友",
    defaultMessage: "过年好！愿你新年有诗有酒，也有远方与归处。",
    poem: "一年将尽夜，万里未归人。",
    poemSource: "戴叔伦《除夜宿石头驿》",
  },
  {
    id: "newyear-xiaonian",
    categoryId: "newyear",
    title: "小年纳福",
    gradient: ["#7c2d12", "#c2410c", "#fed7aa"],
    defaultSalutation: "家人",
    defaultMessage: "小年忙年，糖瓜甜甜。灶王上天言好事，愿家里外都顺遂。",
    poem: "二十三，糖瓜粘。",
    poemSource: "年俗歌谣",
  },
  {
    id: "newyear-chuxi",
    categoryId: "newyear",
    title: "除夕团圆",
    gradient: ["#581c87", "#7e22ce", "#e9d5ff"],
    defaultSalutation: "爸妈",
    defaultMessage: "今夕何夕，灯火可亲。无论视频还是语音，心都在一张桌上。",
    poem: "一年将尽夜，万里未归人。",
    poemSource: "戴叔伦《除夜宿石头驿》",
  },
  {
    id: "newyear-yuanxiao",
    categoryId: "newyear",
    title: "元宵灯会",
    gradient: ["#831843", "#db2777", "#fce7f3"],
    defaultSalutation: "你",
    defaultMessage: "月圆人圆事事圆，花灯如昼照归心。元宵快乐！",
    poem: "东风夜放花千树，更吹落、星如雨。",
    poemSource: "辛弃疾《青玉案·元夕》",
  },
  {
    id: "newyear-kaigong",
    categoryId: "newyear",
    title: "开工大吉",
    gradient: ["#0f172a", "#1e40af", "#93c5fd"],
    defaultSalutation: "同事朋友",
    defaultMessage: "新年开工，万象更新。愿你事业顺遂，步步高升，也要注意休息。",
    poem: "长风破浪会有时，直挂云帆济沧海。",
    poemSource: "李白《行路难》",
  },
  {
    id: "newyear-wish",
    categoryId: "newyear",
    title: "新春通用祈福",
    gradient: ["#78350f", "#d97706", "#fde68a"],
    defaultSalutation: "朋友",
    defaultMessage: "新春纳福，旧岁已去，新年已至。愿你身健心安，所求皆如愿。",
    poem: "历添新岁月，春满旧山河。",
    poemSource: "叶颙《己酉新正》",
  },

  /* —— 清明·谷雨 —— */
  {
    id: "qingming-zhuisi",
    categoryId: "qingming",
    title: "清明追思",
    gradient: ["#14532d", "#166534", "#86efac"],
    defaultSalutation: "亲人",
    defaultMessage: "清明雨上，慎终追远。愿清风捎去思念，愿生者珍重前行。",
    poem: "清明时节雨纷纷，路上行人欲断魂。",
    poemSource: "杜牧《清明》",
  },
  /** 兼容早期 MVP 书签 /edit/solar-qingming */
  {
    id: "solar-qingming",
    categoryId: "qingming",
    title: "清明雨上",
    gradient: ["#14532d", "#166534", "#86efac"],
    defaultSalutation: "亲人",
    defaultMessage: "清明时节，慎终追远。愿清风捎去思念，愿生者珍重。",
    poem: "清明时节雨纷纷，路上行人欲断魂。",
    poemSource: "杜牧《清明》",
  },
  {
    id: "qingming-taqing",
    categoryId: "qingming",
    title: "踏青寄语",
    gradient: ["#365314", "#4d7c0f", "#bef264"],
    defaultSalutation: "好友",
    defaultMessage: "春和景明，万物向荣。出门走走，也把好心情寄给你。",
    poem: "况是清明好天气，不妨游衍莫忘归。",
    poemSource: "程颢《郊行即事》",
  },
  {
    id: "qingming-guyu",
    categoryId: "qingming",
    title: "谷雨润物",
    gradient: ["#134e4a", "#0f766e", "#5eead4"],
    defaultSalutation: "你",
    defaultMessage: "雨润百谷，夏将至。愿你的努力如秧苗，遇水则发。",
    poem: "谷雨春光晓，山川黛色青。",
    poemSource: "元稹《咏廿四气诗·谷雨》",
  },

  /* —— 端午·仲夏 —— */
  {
    id: "dragon-zongzi",
    categoryId: "dragon",
    title: "粽叶飘香",
    gradient: ["#14532d", "#15803d", "#bbf7d0"],
    defaultSalutation: "家人朋友",
    defaultMessage: "端午安康，粽有快乐相伴。身在海外，也给自己煮一颗家乡味。",
    poem: "不效艾符趋习俗，但祈蒲酒话升平。",
    poemSource: "殷尧藩《端午日》",
  },
  {
    id: "dragon-longzhou",
    categoryId: "dragon",
    title: "龙舟竞渡",
    gradient: ["#0c4a6e", "#0369a1", "#7dd3fc"],
    defaultSalutation: "你",
    defaultMessage: "鼓声劈浪，齐心向前。愿你也有劈波斩浪的勇气与伙伴。",
    poem: "冲波突出人齐譀，跃浪争先鸟退飞。",
    poemSource: "刘禹锡《竞渡曲》",
  },
  {
    id: "dragon-zhongxia",
    categoryId: "dragon",
    title: "仲夏清风",
    gradient: ["#155e75", "#0891b2", "#a5f3fc"],
    defaultSalutation: "好友",
    defaultMessage: "夏至未至，端午先至。长夏漫漫，愿你心有清风。",
    poem: "五月榴花照眼明，枝间时见子初成。",
    poemSource: "韩愈《榴花》",
  },
  {
    id: "dragon-xiazhi",
    categoryId: "dragon",
    title: "夏至昼长",
    gradient: ["#9a3412", "#ea580c", "#ffedd5"],
    defaultSalutation: "远方的你",
    defaultMessage: "昼最长的一日，把想念说长一点。夏至快乐，夜短情长。",
    poem: "东边日出西边雨，道是无晴却有晴。",
    poemSource: "刘禹锡《竹枝词》",
  },

  /* —— 七夕 —— */
  {
    id: "qixi-xinghe",
    categoryId: "qixi",
    title: "星河寄情",
    gradient: ["#1e1b4b", "#4338ca", "#c4b5fd"],
    defaultSalutation: "心上人",
    defaultMessage: "金风玉露一相逢，便胜却人间无数。七夕快乐，见字如面。",
    poem: "盈盈一水间，脉脉不得语。",
    poemSource: "古诗十九首《迢迢牵牛星》",
  },
  {
    id: "qixi-qiao",
    categoryId: "qixi",
    title: "乞巧祝愿",
    gradient: ["#4c1d95", "#7c3aed", "#ede9fe"],
    defaultSalutation: "闺蜜好友",
    defaultMessage: "乞巧乞福，愿你我心灵手巧，也把日子过成喜欢的样子。",
    poem: "家家乞巧望秋月，穿尽红丝几万条。",
    poemSource: "林杰《乞巧》",
  },
  {
    id: "qixi-friend",
    categoryId: "qixi",
    title: "七夕友缘",
    gradient: ["#312e81", "#6366f1", "#e0e7ff"],
    defaultSalutation: "挚友",
    defaultMessage: "不止爱情，友情也值得仰望星空。谢谢你在我异乡的岁月里。",
    poem: "海内存知己，天涯若比邻。",
    poemSource: "王勃《送杜少府之任蜀州》",
  },

  /* —— 中秋 —— */
  {
    id: "mid-moon",
    categoryId: "midautumn",
    title: "千里月明",
    gradient: ["#1e3a5f", "#3b82f6", "#bfdbfe"],
    defaultSalutation: "远方的你",
    defaultMessage: "同一轮月亮照着故乡与异乡，愿你中秋温暖圆满。",
    poem: "但愿人长久，千里共婵娟。",
    poemSource: "苏轼《水调歌头》",
  },
  {
    id: "mid-osmanthus",
    categoryId: "midautumn",
    title: "桂香寄意",
    gradient: ["#3f2e18", "#92400e", "#fcd34d"],
    defaultSalutation: "家人",
    defaultMessage: "月饼甜甜，思念也甜甜。中秋快乐，早日团圆。",
    poem: "今夜月明人尽望，不知秋思落谁家。",
    poemSource: "王建《十五夜望月》",
  },
  {
    id: "mid-yuan",
    categoryId: "midautumn",
    title: "月圆人安",
    gradient: ["#0f172a", "#334155", "#cbd5e1"],
    defaultSalutation: "挂念的你",
    defaultMessage: "月圆时刻，愿你我虽隔重洋，各自安好，心中圆满。",
    poem: "海上生明月，天涯共此时。",
    poemSource: "张九龄《望月怀远》",
  },
  {
    id: "mid-huaiyuan",
    categoryId: "midautumn",
    title: "望月怀远",
    gradient: ["#1e293b", "#475569", "#f1f5f9"],
    defaultSalutation: "父母",
    defaultMessage: "举头望明月，低头思故乡。儿在他乡一切安好，请多保重。",
    poem: "露从今夜白，月是故乡明。",
    poemSource: "杜甫《月夜忆舍弟》",
  },

  /* —— 重阳 —— */
  {
    id: "chongyang-denggao",
    categoryId: "chongyang",
    title: "登高敬老",
    gradient: ["#713f12", "#b45309", "#fde68a"],
    defaultSalutation: "长辈",
    defaultMessage: "九九重阳，久久安康。愿您身健步稳，笑口常开。",
    poem: "遥知兄弟登高处，遍插茱萸少一人。",
    poemSource: "王维《九月九日忆山东兄弟》",
  },
  {
    id: "chongyang-juhua",
    categoryId: "chongyang",
    title: "菊酒天长",
    gradient: ["#854d0e", "#ca8a04", "#fef9c3"],
    defaultSalutation: "您",
    defaultMessage: "东篱把酒黄昏后，有暗香盈袖。重阳佳节，愿岁月温柔待您。",
    poem: "待到重阳日，还来就菊花。",
    poemSource: "孟浩然《过故人庄》",
  },
  {
    id: "chongyang-youqiu",
    categoryId: "chongyang",
    title: "秋深友念",
    gradient: ["#422006", "#9a3412", "#fdba74"],
    defaultSalutation: "老友",
    defaultMessage: "秋高气爽，宜登高、宜想你。重阳同乐，天涯若比邻。",
    poem: "人生易老天难老，岁岁重阳。",
    poemSource: "毛泽东《采桑子·重阳》",
  },

  /* —— 冬至·腊八·岁晚 —— */
  {
    id: "solar-dongzhi",
    categoryId: "winter-end",
    title: "冬至阳生",
    gradient: ["#1c1917", "#57534e", "#e7e5e4"],
    defaultSalutation: "挂念的你",
    defaultMessage: "冬至大如年，愿你三冬暖，春不寒。饺子汤圆，都是团圆。",
    poem: "天时人事日相催，冬至阳生春又来。",
    poemSource: "杜甫《小至》",
  },
  {
    id: "winter-laba",
    categoryId: "winter-end",
    title: "腊八粥暖",
    gradient: ["#78350f", "#b45309", "#fcd34d"],
    defaultSalutation: "家人",
    defaultMessage: "腊八喝粥，岁岁无忧。愿你粥到福到，异乡也有暖意。",
    poem: "腊八家家煮粥多，大臣特派到雍和。",
    poemSource: "夏仁虎《腊八》",
  },
  {
    id: "winter-xiaonian",
    categoryId: "winter-end",
    title: "小年年味",
    gradient: ["#991b1b", "#dc2626", "#fecaca"],
    defaultSalutation: "亲友",
    defaultMessage: "小年祭灶，年味渐浓。扫尘贴花，心向团圆。",
    poem: "二十三，糖瓜粘；二十四，扫房子。",
    poemSource: "年俗歌谣",
  },
  {
    id: "winter-suimo",
    categoryId: "winter-end",
    title: "岁暮寄语",
    gradient: ["#292524", "#57534e", "#d6d3d1"],
    defaultSalutation: "你",
    defaultMessage: "一年将尽，感谢相伴。愿来年平安顺遂，所行皆坦途。",
    poem: "一年忧喜今宵过，两鬓风霜明日新。",
    poemSource: "谢榛《除夕吴子充诸人集旅寓》",
  },
  {
    id: "winter-hanshi",
    categoryId: "winter-end",
    title: "寒食东风",
    gradient: ["#1c1917", "#44403c", "#a8a29e"],
    defaultSalutation: "朋友",
    defaultMessage: "寒食东风御柳斜。禁火冷食忆古意，也愿你心有热望。",
    poem: "春城无处不飞花，寒食东风御柳斜。",
    poemSource: "韩翃《寒食》",
  },

  /* —— 公历节日 —— */
  {
    id: "cal-newyear",
    categoryId: "calendar",
    title: "元旦新年",
    gradient: ["#0f172a", "#1e3a8a", "#93c5fd"],
    defaultSalutation: "你",
    defaultMessage: "新历翻篇，愿你在异国的新年里，目标清晰，步履坚定。",
    poem: "历添新岁月，春满旧山河。",
    poemSource: "叶颙《己酉新正》",
  },
  {
    id: "cal-women",
    categoryId: "calendar",
    title: "三八妇女节",
    gradient: ["#831843", "#db2777", "#fbcfe8"],
    defaultSalutation: "了不起的你",
    defaultMessage: "愿你自在发光，不被定义；辛苦与荣耀，都值得被看见。",
    poem: "何须浅碧深红色，自是花中第一流。",
    poemSource: "李清照《鹧鸪天·桂花》",
  },
  {
    id: "cal-labor",
    categoryId: "calendar",
    title: "五一劳动节",
    gradient: ["#713f12", "#ca8a04", "#fef08a"],
    defaultSalutation: "劳动者",
    defaultMessage: "汗水不负耕耘，休息亦是对自己的尊重。劳动节快乐！",
    poem: "昼出耘田夜绩麻，村庄儿女各当家。",
    poemSource: "范成大《四时田园杂兴》",
  },
  {
    id: "cal-children",
    categoryId: "calendar",
    title: "六一儿童节",
    gradient: ["#854d0e", "#eab308", "#fef08a"],
    defaultSalutation: "小朋友 / 大朋友",
    defaultMessage: "愿你心里永远住着一个会笑的小孩，天真不丢，好奇常在。",
    poem: "儿童散学归来早，忙趁东风放纸鸢。",
    poemSource: "高鼎《村居》",
  },
  {
    id: "cal-teacher",
    categoryId: "calendar",
    title: "教师节",
    gradient: ["#14532d", "#166534", "#86efac"],
    defaultSalutation: "老师",
    defaultMessage: "桃李不言，下自成蹊。师恩如灯，照我远行。",
    poem: "春蚕到死丝方尽，蜡炬成灰泪始干。",
    poemSource: "李商隐《无题》",
  },
  {
    id: "cal-national",
    categoryId: "calendar",
    title: "秋日长假",
    gradient: ["#7f1d1d", "#b91c1c", "#fecaca"],
    defaultSalutation: "朋友",
    defaultMessage: "长假将至，愿你身心放松，出行平安；与亲友云相聚，亦是团圆。",
    poem: "江山如此多娇，引无数英雄竞折腰。",
    poemSource: "毛泽东《沁园春·雪》",
  },

  /* —— 二十四节气（完整） —— */
  ...SOLAR24.map((t) => ({ ...t, categoryId: "solar24" as const })),
];

/** 旧版分类路径重定向（书签兼容） */
const LEGACY_CATEGORY_SLUG: Record<string, CategoryId> = {
  spring: "newyear",
  solar: "solar24",
};

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  const mapped = LEGACY_CATEGORY_SLUG[slug];
  if (mapped) {
    return CATEGORIES.find((c) => c.id === mapped);
  }
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getTemplatesByCategory(categoryId: CategoryId): Template[] {
  return TEMPLATES.filter((t) => t.categoryId === categoryId);
}

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getCategoryForTemplate(template: Template): CategoryMeta {
  const c = CATEGORIES.find((x) => x.id === template.categoryId);
  if (!c) throw new Error("Unknown category");
  return c;
}

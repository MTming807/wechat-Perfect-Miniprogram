var posts_content = [
{
  date: "嬴驷 1507",
  title: "蜜汁鸡翅/蒜香蜜翅",
  // 当获取的数据存在嵌套关系时，要用img.author_img形式
  imgsrc: "/images/avatar/1.png",
  avatar: "/images/post/1.png",
  content: "8.0 综合评分  645 人做过这道菜\n用料：鸡翅、花椒、盐、生抽、料酒、姜片",
  reading: "39",
  collection: "26",
  // wx:if是否隐藏在这里配置
  text_condition: "true",
  headimgsrc:"/images/post/1.png",
  author:"嬴驷",
  datetime:"3小时前",
  detail:"1.鸡翅两面划刀，用牙签在每个鸡翅两面扎扎，将蒜头，生姜切小块加入生抽、老抽、料酒和鸡翅一起抓匀腌制15分钟左右。\n2.不粘锅开中小火，倒入适量油将鸡翅两面煎至表皮微焦\n3.倒入刚才的腌制的汁水再加小半碗的清水，把小葱结丢进去，慢炖10分钟左右，把蜂蜜用温水化开倒入再加入适量黑胡椒粉，炖至汁水稠稠的，可以裹住鸡翅就可以了。\n4.色香味俱全的蜜汁蒜香鸡翅搞定！配着酱汁可以吃20000大碗米饭！\n\n",
  postid:0
},
{
  date: "芈月 9536",
  title: "蒜香炸鸡翅",
  imgsrc: "/images/avatar/3.png",
  avatar: "/images/post/2.png",
  content: "8.2 综合评分 177 人做过这道菜\n用料：一只鸡、一口锅",
  reading: "92",
  collection: "23",
  text_condition: "true",
  headimgsrc: "/images/post/2.png",
  author: "芈月",
  datetime: "18小时前",
  detail:"1.准备阶段：鸡翅正反面各划两刀、料酒三勺、生抽二勺、蒜末、姜片、生粉半勺、放入盘中腌制20分钟、生姜切6片、大蒜切末、葱切成丝、辣椒半个切丝备用、半勺生抽、半勺老抽、一勺蚝油、2颗冰糖备用\n2.热锅冷油，油热后加入葱、姜、蒜、辣椒，炒出香味\n3.加入腌制后鸡翅，煎至两面金黄4.加入热水沒过鸡翅，倒入之前准备好的半勺生抽、半勺老抽、一勺蚝油、2颗冰糖，加入一根完整的打成结的小葱，热水煮开后关成小火煮15分钟\n4.大火收汁装盘，撒上葱花，鸡翅肉质鲜嫩｜汤汁浓稠，真的超级好吃，快来试下吧！\n\n",
  postid:1
},
{
  date: "芈姝 2697",
  title: "小婷☼蜜汁鸡翅",
  imgsrc: "/images/avatar/4.png",
  avatar: "/images/post/3.png",
  content: "68.3 综合评分 123456 人做过这道菜\n用料：红酒、土豆、黄油、柠檬",
  reading: "921",
  collection: "539",
  text_condition: "true",
  headimgsrc: "/images/post/3.png",
  author: "芈姝",
  datetime: "2天前",
  detail:"1.鸡肝、栗子、面包片（切边，用80CC牛奶泡软）以红葱头炒香，加些鸡高汤焖至栗子煮烂后，放入百里香、红酒，以中火将汁液煮干即成馅料。\n2.西红柿糊及鸡高汤炖40分钟做成酱料，再加入鸡胗片即成火鸡酱汁。\n3.将火鸡洗净，腹内塞入香料束，填入馅料，外皮洒上胡椒盐，放入烤箱以350℃温度烤约90分钟（约于40分钟时取出，鸡身外包铝箔纸续烤）。\n4.烤熟的火鸡取出放在装饰好的盘子中，淋上2.的火鸡酱汁，并且搭配红酒即可食用。\n\n",
  postid:2
},
{
  date: "柴郡 4697",
  title: "美好食光",
  imgsrc: "/images/avatar/2.png",
  avatar: "/images/post/5.png",
  content: "10.0 综合评分 1 人做过这道菜\n用料：世界上最好吃的面条、虾子、龙利鱼和小青菜",
  reading: "1",
  collection: "1",
  text_condition: "true",
  headimgsrc: "/images/post/5.png",
  author: "柴郡",
  datetime: "x天前",
  detail:"***秘制***\n\n",
  postid:3
}]
//这里要设置一个出口，标准，供其他脚本文件引入数据
module.exports = {//posts_content放数据，postList放格式
  postList: posts_content
}
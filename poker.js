// 手牌の生成
var arr = [];
for(var i = 0; i < 5; i++){
  var tmp_suit = Math.floor(Math.random() * 4);  // 0:♥️,1:♠️,2:♦️,3:♣️
  var tmp_num = Math.floor(Math.random() * 13)+1;
  arr.push({suit: tmp_suit, num: tmp_num});
}
// ソート
arr.sort(function(a,b){
  if(a.num < b.num) return -1;
  if(a.num > b.num) return 1;
  return 0;
});
// フラッシュ・ストレート・ロイストの判定
var isFlush = true;
var isStraight = true;
var isRoyalStraight = false;
var isFiveCards = false;
for(var i = 0; i < arr.length-1; i++){
  var flg1 = (arr[i].suit == arr[i+1].suit);
  var flg2 = ((arr[i+1].num - arr[i].num) == 1);
  if(!flg1) isFlush = false;
  if(!flg2) isStraight = false;
}
isRoyalStraight = (arr[0].num==1 && arr[1].num==10 && arr[2].num==11 && arr[3].num==12 && arr[4].num==13);
// 手牌の判断
var hand = "";
if(isFlush){
  if(isRoyalStraight){
    hand = "Royal Straight Flush";
  }else if(isStraight){
    hand = "Straight Flush";
  }else{
    hand = "Flush";
  }
}else if(isRoyalStraight){
  hand = "Royal Straight";
}else if(isStraight){
  hand = "Straight";
}else{
  var cnt = 0;
  for(var max = 3; max >= 0; max--){
    var i = 3 - max;
    for(var j = 1; j <= max+1; j++){
      if(arr[i].num == arr[i+j].num) cnt++;
    }
  }
  switch(cnt){
    case 10:
      hand = "Five Cards";
      isFiveCards = true;
      break;
    case 6:
      hand = "Four Cards";
      break;
    case 4:
      hand = "Full House";
      break;
    case 3:
      hand = "Three Cards";
      break;
    case 2:
      hand = "Two Pairs";
      break;
    case 1:
      hand= "One Pair";
      break;
    default:
      hand = "No Pair";
      break;
  }
}

// 絵文字への変換
for(var i = 0; i < arr.length; i++){
  if(arr[i].suit == 0){
    arr[i].suit = '♥️';
  }else if(arr[i].suit == 1){
    arr[i].suit = '♠️';
  }else if(arr[i].suit == 2){
    arr[i].suit = '♦️';
  }else if(arr[i].suit == 3){
    arr[i].suit = '♣️';
  }
  if(arr[i].num == 11){
    arr[i].num = 'J';
  }else if(arr[i].num == 12){
    arr[i].num = 'Q';
  }else if(arr[i].num == 13){
    arr[i].num = 'K';
  }
}
if(isFiveCards){
  arr[4].suit = '🃏';
}

var tiles;
tiles = "[" + arr[0].suit + arr[0].num + "]" + "[" + arr[1].suit + arr[1].num + "]" + "[" + arr[2].suit + arr[2].num + "]" + "[" + arr[3].suit + arr[3].num + "]" + "[" + arr[4].suit + (isFiveCards ? "" : arr[4].num) + "]： Your hand is " + hand;

var tiles_json = {"res": tiles};
tiles_json = JSON.stringify(tiles_json);
document.write(tiles_json);
console.log(tiles);

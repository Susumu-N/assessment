'use strict';
const userNameInput=document.getElementById('user-name');
    const assessmentButton=document.getElementById('assessment');
    const resultDivided=document.getElementById('result-area');
    const tweetDivided=document.getElementById('tweet-area');

/**
 * 指定した要素の子要素をすべて削除する
 * @para{HTMLElement} element HTMLの要素 
 */
function removeAllChildren(element){
    while(element.firstChild){//子要素がある限り削除
        element.removeChild(element.firstChild);
    }
}
userNameInput.onkeydown=event=>{
    if (event.key==='Enter'){
        assessmentButton.onclick();
    }
};
    assessmentButton.onclick=()=>{
        const userName=userNameInput.value;
        if (userName.length===0){
            //名前が空の時は処理を終える
            return;
        }
       //診断結果エリアの作成
       removeAllChildren(resultDivided);
       const header=document.createElement('h3');
       header.innerText='診断結果';
       resultDivided.appendChild(header);

       const paragraph=document.createElement('p');
       const result=assessment(userName);
       paragraph.innerText=result;
       resultDivided.appendChild(paragraph);

       //TODO　ツイートエリアの作成
       removeAllChildren(tweetDivided);
       const anchor=document.createElement('a');
       const hrefValue=
       'https://twitter.com/intent/tweet?button_hashtag='+
       encodeURIComponent('あなたのいいところ')+
       '&ref_src=twsrc%5Etfw';

       anchor.setAttribute('href',hrefValue);
       anchor.className='twitter-hashtag-button';
       anchor.setAttribute('data-text',result);
       anchor.innerText='Tweet #あなたのいいところ';
       tweetDivided.appendChild(anchor);
       //Widgets.jsの設定
       const script=document.createElement('script');
       script.setAttribute('src','https://platform.twitter.com/widgets.js');
       tweetDivided.appendChild(script);

          

    };

const answers=[
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは知識です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはユニークさです。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは用心深さです。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは見た目です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは決断力です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは思いやりです。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは感受性です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは節度です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは好奇心です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは気配りです。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはその全てです。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは自制心です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    ];

    /**
     * 名前の文字列を渡すと診断結果を返す関数
     * @para{string}userName ユーザーの名前
     * @return{string}診断結果
     */
    function assessment(userName){
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfCharCode=0;
        for(let i=0;i<userName.length;i++){
            sumOfCharCode=sumOfCharCode+userName.charCodeAt(i)
        }

        //文字のコード番号の合計を回答の数で割って添え字の数値を求める
        const index=sumOfCharCode % answers.length;
        let result=answers[index];

        result=result.replace(/\{userName\}/g,userName);

        return result;
    }

//テストコード
    console.assert(
        assessment('太郎')===
        '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    console.assert(
        assessment('太郎')===assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );


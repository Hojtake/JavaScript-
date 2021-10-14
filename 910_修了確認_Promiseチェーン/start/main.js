/**
 * 問題：
 * myFetch関数を使って以下の「データ取得の流れ」の通り、
 * 順次JSONを取得し、取得したデータを加工して、
 * 以下のメッセージをコンソールに表示してください。
 * 
 * --Bob's timeline--
 * Tim says: waiting at station.
 * Sun says: go shopping?
 * John says: how's it going?
 * Sun says: drink?
 *
 ******************************   
 * データ取得の流れ
 * １．"user1.json"を取得（Bobのユーザー情報取得）
 * 
 * ２．"user1.json"のidの項目を元に
 *     `friendsOf${id}.json`でフレンド一覧を取得
 * 
 * ３．取得したフレンドのID（ユーザーID）を元に、
 * 　　`user${id}.json`で各ユーザーの情報を取得
 * 
 * ４．各ユーザー情報のlatestMsgIdが最後に投稿した
 * 　　メッセージのIDになりますので、そのidを用いて
 * 　　`message${friend.latestMsgId}.json`
 * 　　を取得。
 * 
 * １～４で取得したデータをもとにコンソールログに
 * タイムラインの文字列を作成してください。
 * 
 * ※await/asyncで記述してみてください。
 */
async function myFetch(fileName) {
	const response = await fetch(`../json/${fileName}`);
	const json = await response.json();
	return json;
}

async function bobConnection(){
	const bobJson = await myFetch('user1.json');
	const firendID = await myFetch(`friendsOf${bobJson.id}.json`);
	console.log(`--${bobJson.name}'s timeline--`);
	/*プロミスチェーン上で一括で読み込みを終了させる方法
	const me = await myFetch('user1.json');
	console.log(`--${me.name}'s timeline--`);

	const friendList = await myFetch(`friendsOf${me.id}.json`);

	const friendIds = new Set();//セットを使って情報を格納する
	for(const id of friendList.friendIds) {
		friendIds.add(myFetch(`user${id}.json`));
	}
	const friends = await Promise.all(friendIds);
	
	const msgIds = new Set();
	for(const friend of friends) {
		msgIds.add(myFetch(`message${friend.latestMsgId}.json`));
	}
	const msgs = await Promise.all(msgIds);

	for(const friend of friends) {
		for(const msg of msgs) {
			if(friend.id === msg.userId) {//??????
				console.log(`${friend.name} says: ${msg.message}`);
			}
		}
	}
	*/

	for(const userId of firendID.friendIds){
		const user = await myFetch(`user${userId}.json`);
		const userMessage = await myFetch(`message${user.latestMsgId}.json`);
		console.log(`${user.name} says: ${userMessage.message}`);
	}
}
bobConnection();
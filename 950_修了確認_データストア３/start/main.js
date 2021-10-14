/**
 * 問題：
 * サーバー上に配置してあるJSONファイルを取得して、
 * オブジェクトにセットしましょう。
 * 
 * ただし、localStorageにすでにデータが保存されている場合
 * にはサーバーへのデータ取得は行わず、localStorageに
 * 登録されているJSONからオブジェクトを復元してください。
 */
 const KEY = 'test-data';
 const p = Promise.resolve();
 let _dirty;
 
  class DataSource {
	 static async getLocal(KEY) {
		 console.log('get from local');
		 let result = localStorage.getItem(KEY);
		 console.log(result);
		
		 return JSON.parse(result);
		 
	 }

	   static async getjson(KEY){
		const response =await fetch(`../json/${KEY}.json`);
		const json = await response.json();
		console.log("json:",json);
		return json;
	}
 
	 static setLocal(KEY, target) {
		 console.log('set to local');
		 const json = JSON.stringify(target);
		 localStorage.setItem(KEY, json);
	 }
 }
 
 (async function(){
 const targetObj = await DataSource.getLocal(KEY) || await DataSource.getjson(KEY)  || {};
 
 const pxy = new Proxy(targetObj, {
	 set(target, prop, value, receiver) {
		 _dirty = true;
 
		 const result = Reflect.set(target, prop, value, receiver);
 
		 p.then(() => {
			 if(_dirty) {
				 console.log('** update data **');
				 _dirty = false;
				 DataSource.setLocal(KEY, target);
			 }
		 });
		 
		 
		 return result;
	 }
 });
 
 
 	console.log('init', pxy);
 	pxy.name = 'Tom';
 	console.log('change', pxy);
 	pxy.name = 'Tim';
 	console.log('change2', pxy);
 
 

})();
 
 
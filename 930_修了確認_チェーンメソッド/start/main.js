/**
 * 問題：
 * 電卓の入力と同じような挙動をするチェーンメソッド
 * を作成してみましょう。
 * 
 * 例えば、次のように使用し、結果が表示
 * されるようにします。
 * 
 * 
 * 例１）
 * const calc = new Calculator();
 * 
 * calc.set(10)
 * .minus()
 * .set(3) -> '7'を出力(10 - 3)
 * 
 * 例２）
 * const calc = new Calculator();
 * 
 * calc.set(10)
 * 	.minus()
 * 	.set(3) -> '7'を出力
 * 	.mutiply()
 * 	.set(6) -> '42'を出力（10 - 3) * 6
 */
class Calculator{
	constructor(){
		this.val1 = null;
		this.val2 = null;
		this.fun = function(){};

	}
	set(val){
		if(this.val1 == null){
			this.val1 = val;

		}else{
			this.val2 = val;
			this.val1 = this.fun(this.val1,this.val2);
			console.log(this.val1);

		}
		return this;
	}
	minus(){

		this.fun = function(val1,val2){
			return val1 - val2;

		}
		return this;
	}
	mutiply(){
		this.fun = function(val1,val2){
			return val1 * val2;

		}
		return this;
	}
	divide(){
		this.fun = function(val1,val2){
			return val1 / val2;

		}
		return this;

	}
	plus(){
		this.fun = function(val1,val2){
			return val1 + val2;

		}
		return this;
	}
}

const calc = new Calculator();

calc.set(10)
	.minus()
	.set(3)
	.mutiply()
	.set(6)
	.divide()
	.set(2)
	.plus()
	.set(2)

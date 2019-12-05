function MyConfirm (config) {
		this.title = config.title ? config.title : '提示';
		this.btns = config.btns;
		this.message = config.message;
		this.showCloseBtn = !config.showCloseBtn ? config.showCloseBtn : true;
		this.maskerClose = config.maskerClose ? config.maskerClose : false;
		var nowtimeStr = new Date().getTime().toString(); 
		this.id = 'myconfirm_' + nowtimeStr.substring(nowtimeStr.length - 4);  
		this.topWindow = window.top;
		this.init();
	}

	MyConfirm.prototype = {
		init: function() {
			var _that = this;
			if(this.getElement(this.id)){
				// console.log('提示：已存在一个confirm框');
				return false;
			}
			var findStyle = false;
			var allSty =  this.topWindow.document.getElementsByTagName('style');
			for(var i=0;i<allSty.length;i++) {
				if(allSty[i].id == 'myConfirmStyle'){
					findStyle = true;
					break;
				}
			}
			if(!findStyle) {
				this.initStyle();
			} 
			var container = document.createElement('div');  
			container.className = 'myconfirm-container';
			container.id = this.id; 
			var masker = document.createElement('div'); 
			masker.className = 'myconfirm-masker';
			if(this.maskerClose) {
				masker.onclick = function() {
					_that.destory();
				}
			}
			container.appendChild(masker); 
			var myConfirm = document.createElement('div');
			myConfirm.className = "myconfirm ";  
			myConfirm.innerHTML = [ 
				'<div class="myconfirm-title">', 
				this.title,
				'</div><div class="myconfirm-context"><p>',
				this.message,
				'</p></div>'
				].join('');
			if(this.showCloseBtn){
				var closeBtn = document.createElement('div');
				closeBtn.className = 'close-myconfirm';
				closeBtn.innerHTML = '×';
				closeBtn.onclick = function() {
					_that.destory();
				};
				myConfirm.appendChild(closeBtn);
			}  
			var myconfirmFooter = document.createElement('div');
			myconfirmFooter.className = 'myconfirm-footer'; 
			for(var j=0,len=this.btns.length; j<len; j++) {
				var btnA = document.createElement('a');
				btnA.setAttribute('herf', 'javascript:;');
				(function(x){
					btnA.onclick = function() {  
						_that.btns[x].callback && _that.btns[x].callback();
						_that.destory();
					};
				})(j);   
				btnA.innerHTML = _that.btns[j].btnText;
				if( len == 1) {
					btnA.className = 'sure'; 
				}else {
					btnA.className = 'default';
					if(j != 0 ) {
						btnA.className = 'sure';
					}  
				}
				myconfirmFooter.appendChild(btnA);
			}  
			myConfirm.appendChild(myconfirmFooter); 
			container.appendChild(myConfirm); 
			this.topWindow.document.body.appendChild(container);  
		},
		initStyle: function() {
			var myConfirmStyle ='.myconfirm-container .myconfirm-masker{position:fixed;top:0;left:0;width:100%;height:100%;z-index:999999;opacity:.5;filter:Alpha(opacity=50);background:#000}.myconfirm{position:absolute;left:50%;top:50%;width:380px;height:180px;z-index:1000000;margin:-90px -190px;overflow:hidden;background:#fff;box-sizing:border-box;box-shadow:0 0 3px #ccc;border-radius:5px}.myconfirm .close-myconfirm{position:absolute;right:10px;top:10px;width:20px;height:20px;line-height:20px;text-align:center;font-size:22px;color:#ccc;cursor:pointer}.myconfirm .close-myconfirm:hover{color:#333}.myconfirm .myconfirm-title{height:40px;line-height:40px;text-align:left;font-size:16px;color:#888;overflow:hidden;padding:0 30px;white-space:nowrap;text-overflow:ellipsis}.myconfirm .myconfirm-context{padding:10px 20px 0;height:60px;display:table;text-align:center;width:340px}.myconfirm .myconfirm-context p{text-align:center;font-size:15px;line-height:28px;margin:0;display:table-cell;vertical-align:middle}.myconfirm .myconfirm-footer{position:absolute;bottom:0;width:100%;left:0;text-align:center;height:56px;background:#f0f0f0}.myconfirm .myconfirm-footer a{display:inline-block;padding:8px 20px;margin:10px 15px;border-radius:4px;font-size:14px;min-width:30px;text-decoration:none;cursor:pointer}.myconfirm .myconfirm-footer a.default{background:#fefefe;border:1px solid #ccc;color:#888}.myconfirm .myconfirm-footer a.default:hover{border-color:#ccc;color:#333;background:#f5f5f5}.myconfirm .myconfirm-footer a.sure{background:#c2e1f2;border:1px solid #27cffa;color:#000}.myconfirm .myconfirm-footer a.sure:hover{background:#b2dcf3;border:1px solid #1ecdfa;color:#000}';
			var sty = document.createElement('style');
			sty.type = 'text/css'; 
			if(sty.styleSheet){
      	sty.styleSheet.cssText = myConfirmStyle;
      }else{
      	sty.appendChild(document.createTextNode(myConfirmStyle));
      }
			sty.id="myConfirmStyle"; 
			var head = this.topWindow.document.getElementsByTagName('head')[0];
			head.appendChild(sty);
		},
		destory: function() {
			// console.log(this.id);
			if(this.getElement(this.id).remove) {
				this.getElement(this.id).remove();
			}else{
				this.topWindow.document.body.removeChild(this.getElement(this.id));
			}  
		},
		getElement: function(id) {
			return this.topWindow.document.getElementById(id);
		}
	}
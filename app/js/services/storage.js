var db = (function (){
	var db = new PouchDB('db');
/*	
	db.destroy().then(function () {
		}).catch(function (err) {
	})
*/
	db.get('geogig').catch(function (err) {
	  if (err.name === 'not_found') {
	    db.put({"_id":"geogig","infoRepositorios":{"local":[],"conectedIn":[]}})
	  }
	})

	//LocalStorage
	var _open = function(){
		return db.get('geogig');
	};

	var _set = function(new_data){
		db.get('geogig').then(function (data) {
			data.infoRepositorios = new_data.infoRepositorios;
		   	db.put(data);
		})
	};

	//SessionStorage
	var _setItem = function(key,value){
		return window.sessionStorage.setItem(key, JSON.stringify(value));
	};
	var _openItem = function(key){
		return JSON.parse(window.sessionStorage.getItem(key));
	};

	return {
		open: _open,
		set: _set,
		setItem: _setItem,
		openItem: _openItem
	};
})()

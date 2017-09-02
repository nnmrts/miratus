window.m = (function() {
	function miratus() {
		m.t = m.type;
		m.n = m.name;
		m.v = m.version;
		m.a = m.author;
		m.description = m.d = "this is a " + m.type + " by " + m.a + " called \"" + m.n + "\" (version: " + m.v + ")";
	}

	var m = {
		type: "library",
		name: "miratus",
		version: "1",
		author: "nnmrts",

		randomIntFromInterval: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		},

		uniqObjects: function(array, key) {


			if (array && array.length) {
				var obj = {};

				for (var i = 0, len = array.length; i < len; i++) {
					obj[array[i][key]] = array[i];
				}

				var newArray = [];

				for (var newKey in obj) {
					newArray.push(obj[newKey]);
				}

				return newArray;
			}
			else {
				return [];
			}
		},

		countItemsInArray: function(array, item) {

			counts = array.reduce(function(n, val) {
				return n + (val === item);
			}, 0);


			return counts;
		},

		shortenArray: function(array) {
			var newArray = [];

			var uniqArray = _.uniq(array);

			for (var i = 0; i < uniqArray.length; i++) {
				var currentItem = uniqArray[i];
				var occurences = this.countItemsInArray(array, currentItem);

				var percentage = (occurences / array.length) * 100;

				for (var j = 0; j < Math.ceil(percentage); j++) {
					newArray.push(currentItem);
				}
			}

			return newArray;
		},

		round: function(value, exp) {
			if (typeof exp === 'undefined' || +exp === 0)
				return Math.round(value);

			value = +value;
			exp = +exp;

			if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
				return NaN;

			// Shift
			value = value.toString().split('e');
			value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

			// Shift back
			value = value.toString().split('e');
			return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
		},

		jQuery2Html: function(currentScope, prefix, attribute) {
			if ($) {
				allElements = $("*");
				for (var i = 0, n = allElements.length; i < n; ++i) {
					var el = allElements[i];
					if (el.id) {
						currentScope[prefix + el[attribute]] = el;
					}
				}
			}
		},

		nthIndex: function(string, character, index) {
			return string.split(character, index).join(character).length;
		},

		htmlEntities: function(str) {
			return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		},

		createVariable: function(varName, varContent) {
			var scriptStr = "var " + varName + "= " + varContent + "";

			var nodescriptCode = document.createTextNode(scriptStr);
			var nodescript = document.createElement("script");
			nodescript.type = "text/javascript";
			nodescript.setAttribute("class", "momentscript");
			nodescript.appendChild(nodescriptCode);

			var nodehead = document.getElementsByTagName("head")[0];
			nodehead.appendChild(nodescript);
		},

		insertInString: function(string, what, index) {
			var result = "";

			if (index > 0) {
				result = string.replace(new RegExp('.{' + index + '}'), '$&' + what);
			}
			else {
				result = what + string;
			}

			return result;
		},
		replaceAll: function(string, search, replacement) {
			var target = string;
			return target.replace(new RegExp(search, 'g'), replacement);
		},
		sizeOfObject: function(object) {
			var size = 0,
				key;
			for (key in obj) {
				if (obj.hasOwnProperty(key))
					size++;
			}
			return size;
		},
		zeroFill: function(number, width) {
			width -= number.toString().length;
			if (width > 0) {
				return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
			}
			return number + ""; // always return a string
		},
		createHtml: function(htmlStr) {
			var frag = document.createDocumentFragment();
			var temp = document.createElement("div");
			temp.innerHTML = htmlStr;
			while (temp.firstChild) {
				frag.appendChild(temp.firstChild);
			}

			return frag;
		},
		convertValueBetweenScales: function(value, oldscale, newscale) {
			oldmin = Number(oldscale.slice(0, oldscale.indexOf("-")));
			oldmax = Number(oldscale.slice(oldscale.indexOf("-") + 1));
			newmin = Number(newscale.slice(0, newscale.indexOf("-")));
			newmax = Number(newscale.slice(newscale.indexOf("-") + 1));
			return (((value - oldmin) * (newmax - newmin)) / (oldmax - oldmin)) + newmin;
		},
		argumentsToArray: function(func) {
			var argumentsString = func.toString().slice(func.toString().indexOf("(") + 1, func.toString().indexOf(")"));
			if (argumentsString.indexOf(" ") !== -1) {
				return argumentsString.split(", ");
			}
			else {
				return argumentsString.split(",");
			}
		},
		angular: {

			material: {
				setupAnimationNames: function() {
					animationprefix = "animated ";

					animations = {
						slideOutDown: animationprefix + "slideOutDown",
						slideInUp: animationprefix + "slideInUp",
						bounceOutDown: animationprefix + "bounceOutDown",
						bounceInUp: animationprefix + "bounceInUp",
						zoomOut: animationprefix + "zoomOut",
						zoomIn: animationprefix + "zoomIn",
						pulse: animationprefix + "pulse"
					};
				},
				anmiateCardIn: function(inel, options) {
					switch (arguments.length - 1) {
						case 0:
							options = {
								before: function() {

								},
								callback: function() {

								}
							};
					}

					if (options.before) {
						options.before();
					}
					inel.show();
					inel.removeClass(animations.slideInUp).addClass(animations.slideInUp).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						inel.removeClass(animations.slideInUp);
						$scope.$apply();
						if (options.callback) {
							options.callback();
						}
					});
				},
				animateCardOut: function(outel, options) {
					switch (arguments.length - 1) {
						case 0:
							options = {
								before: function() {

								},
								callback: function() {

								}
							};
					}

					if (options.before) {
						options.before();
					}
					outel.removeClass(animations.slideOutDown).addClass(animations.slideOutDown).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						outel.hide();
						outel.removeClass(animations.slideOutDown);
						if (options.callback) {
							options.callback();
						}
					});
				},
				animateCardInAndOut: function(outel, inel, options) {
					switch (arguments.length - 2) {
						case 0:
							options = {
								before: function() {

								},
								callback: function() {

								}
							};
					}

					$scope.styles.site = {
						"overflow": "hidden"
					};
					$scope.$applyAsync();
					outel.removeClass(animations.slideOutDown).addClass(animations.slideOutDown).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
						outel.hide();
						outel.removeClass(animations.slideOutDown);
						if (options.before) {
							$q.when(options.before()).then(function() {
								inel.show();
								inel.removeClass(animations.slideInUp).addClass(animations.slideInUp).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
									inel.removeClass(animations.slideInUp);
									$scope.styles.site = {
										"overflow": "overlay"
									};
									$scope.$apply();
									if (options.callback) {
										options.callback();
									}
								});
							});
						}
						inel.show();
						inel.removeClass(animations.slideInUp).addClass(animations.slideInUp).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
							inel.removeClass(animations.slideInUp);
							$scope.styles.site = {
								"overflow": "overlay"
							};
							$scope.$apply();
							if (options.callback) {
								options.callback();
							}
						});
					});
				}
			},
		}
	};

	miratus();

	return m;
}());

window.miratus = window.m;

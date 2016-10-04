(function getUserName() {
	var userName, userLink, userInfo, data,
		match, str = '',
		entry, results;
	$('.find_user_btn').click(function (e) {
		userName = $('.find_user_text').val();
		userLink = '//jsfiddle.net/user/' + userName + '/fiddles/';
		userInfo = '<a href="' + userLink + '">' + userName + '</a>';
		$('.user_info').html(userInfo);
		$(this).disable();
		getFiddles(userName)
	});
}());

function getFiddles(userName) {
	$.ajax({
		url: '//fiddle.jshell.net/api/user/' + userName + '/demo/list.json?&start=0&sort=date&start=0&limit=99999&order=desc'
	}).done(function (allfiddles) {
		var json = jQuery.parseJSON(allfiddles);
		//console.log(json);
		function search(str, data) {
			result = $(data).map(function (entry) {
				match = String(data[entry]).toLowerCase().indexOf(str.toLowerCase()) > -1;
				return match ? data[entry] : null;
			});
			return results;
		}

		function update(str, data) {
			if (str === '') {
				str = ' ';
			}
			results = search(str, data);

			function render() {
				var source = $("#fiddles").html();
				var template = Handlebars.compile(source);
				$('.fiddles').html(template(results));
			}
			render();
		}
		$('.search_fiddles_text').keyup(function () {
			update($(this).val());
		});
		update(' ', data);
	});
}

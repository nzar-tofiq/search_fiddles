var userName, userLink, userInfo, data,
	match, str = '',
	entry, $results, results, template;
userName = 'binaryben';
userLink = '//jsfiddle.net/user/' + userName + '/fiddles/';
userInfo = '<a href="' + userLink + '">' + userName + '</a>'
$('.user_info').html(userInfo);
$.ajax({
	url: '//fiddle.jshell.net/api/user/' + userName + '/demo/list.json?&start=0&sort=date&start=0&limit=99999&order=desc'
}).done(function (allfiddles) {
	var json = jQuery.parseJSON(allfiddles);
	//console.log(json);
});

function search(str, data) {
	$results = $(data).map(function (entry) {
		match = data[entry].title.toLowerCase().indexOf(str.toLowerCase()) > -1;
		return match ? entry : null;
	});
	return $results;
}

function update(str, data) {
	if (str === '') {
		str = ' ';
	}
	results = search(str, data);
	$('.fiddles').html("");
	$(results).each(function (i, v) {
		template = '<div class="title"><a href="http://' + data[v].url + '">' + data[v].title + '</a></div>';
		template += '<div class = "description" > ' + data[v].description + '</div>';
		$('.fiddles').append(template);
	});
}
$('.search_fiddles_text').keyup(function () {
	update($(this).val());
});
update(' ', data);

var product_name = "小密圈助手";
var desc = "";
var hei = ($(window).height() - 96) + "px";
var linksHei = ($(window).height() - 96 - 50) + "px";
var SEARCH_ICON = chrome.extension.getURL("icon200x200.png");
var BTN_STYLE =
	"background:url(" + SEARCH_ICON + ") no-repeat center;" +
	"background-color: #ff8830;background-size: 37px;background-position: 4px;";

var containerObj = $('<div id="fiveExtensionContainer" class="five_search_conatiner" style="display: none;height:' + hei + '">' +
		'<div class="xms_header"><div class="xms_header_title"><a href="http://liujinkai.com/2017/07/04/xiaomiquan-assistant/?source=chrome-extend" target="_blank">' + product_name + '</a>' +
	'<span class="xms_header_desc">' + desc + '</span></div><div id="xms_close" class="xms_close">关闭</div></div>' +
		'<div id="xm_links" style="height:' + linksHei + ';overflow: scroll;"></div>' +
	'</div>');


function closeXms() {
	$("#fiveExtensionContainer").css("display","none");
	$("body").css("overflow","auto");
}

containerObj.find("#xms_close").bind("click",function() {
	closeXms()
});



//var openLink = $("<div class='xms_open' style='" + BTN_STYLE + "'></div>");
//openLink.bind("click", function() {
//	showLinks();
//});
//openLink.appendTo($("body"));


//function loadScript() {
//	var script = document.createElement("script");
//	script.type = "text/javascript";
//	script.src = "https://code.jquery.com/jquery-2.2.4.min.js";
//	document.body.appendChild(script);
//}
//loadScript()

function showLinks() {

	if ($("#fiveExtensionContainer").length == 1) {

	} else {
		$(containerObj).appendTo($("body"));

	}
	$("#xm_links").html("");
	$("#fiveExtensionContainer").css("display","block");
	$("body").css("overflow","hidden");

	$(".topic_main").find("a").each(function(e, i) {
		var obj = jQuery(i);
		var parId = obj.parents(".topic_element").attr("id");
		var item = obj.text();
		item = item.trim();
		if ((item == "链接：") || (item == "") || (item == "回复") || (item == "展开全文")
			|| (item == "千聊") || (item == "查看图片") || (item == "删除") || (item == " ")
			|| (item == "收起")) {
			return true;
		} else if (jQuery(i).attr("title")) {
			var hrefStr = obj.attr("href");
			//console.log(.text(),jQuery(i).attr("href"));
			var linkA = $("<div class='xms_link'><a href='" + hrefStr + "'>" + item + "</a></div>");
			var anchor = $("<span class='xms_link_target' data-link='" + parId + "'>进入主题</span>");
			anchor.bind("click",function(event) {
				var id = $(this).data("link");
				$('html, body').animate({
					scrollTop: $("#" + id).offset().top - 50
				}, 1000);
				closeXms();
			})
			anchor.appendTo(linkA);
			$("#xm_links").append(linkA);
		}
	});
	var linkDesc = $("<div class='xms_link_desc'>关闭当前浮层，滚动页面，点击右侧助手图标加载更多</div>");
	$("#xm_links").append(linkDesc);
}

chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		console.log("have");
		showLinks();
	}
);
chrome.runtime.sendMessage({ "act" : "change_icon" });
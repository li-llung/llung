-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 24, 2012 at 08:13 PM
-- Server version: 5.5.25a
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `build`
--

-- --------------------------------------------------------

--
-- Table structure for table `templates`
--

CREATE TABLE IF NOT EXISTS `templates` (
  `template_id` int(11) NOT NULL AUTO_INCREMENT,
  `template_name` varchar(255) NOT NULL,
  `template_content` mediumtext NOT NULL,
  `template_type` int(11) NOT NULL,
  `template_enabled` enum('yes','no') NOT NULL DEFAULT 'yes',
  PRIMARY KEY (`template_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `templates`
--

INSERT INTO `templates` (`template_id`, `template_name`, `template_content`, `template_type`, `template_enabled`) VALUES
(1, 'xhtml_trans', '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\r\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\r\n<head>\r\n	<title></title>\r\n</head>\r\n<body>\r\n<div class="container">\r\n	<div class="content">\r\n		<div class="header"><h1 class="logo"></h1></div>	\r\n		<div class="nav"></div>	\r\n		<div class="main_content"></div>\r\n		<div class="footer"></div>\r\n	</div>\r\n</div>\r\n     <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>\r\n</body>\r\n</html>', 1, 'yes'),
(2, 'html5', '<!DOCTYPE html>\r\n<html>\r\n<head>\r\n	<title></title>\r\n</head>\r\n<body>\r\n<div class="container">\r\n	<div class="content">\r\n		<header class="header"><h1 class="logo"></h1></header>	\r\n		<nav class="nav"></nav>	\r\n		<section class="main_content"></section>\r\n		<footer class="footer"></footer>\r\n	</div>\r\n</div>\r\n     <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>\r\n</body>\r\n</html> ', 1, 'yes'),
(3, 'xhtml_strict', '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\r\n<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\r\n<head>\r\n	<title></title>\r\n</head>\r\n<body>\r\n<div class="container">\r\n	<div class="content">\r\n		<div class="header"><h1 class="logo"></h1></div>	\r\n		<div class="nav"></div>	\r\n		<div class="main_content"></div>\r\n		<div class="footer"></div>\r\n	</div>\r\n</div>\r\n     <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>\r\n</body>\r\n</html>', 1, 'yes'),
(4, 'css_fixed_html4', '/**********************Start Reset****************************/\r\n/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, centerusertest\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n	margin: 0;\r\n	padding: 0;\r\n	border: 0;\r\n	font-size: 100%;\r\n	font: inherit;\r\n	vertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n	display: block;\r\n}\r\nbody {\r\n	line-height: 1;\r\n}\r\nol, ul {\r\n	list-style: none;\r\n}\r\nblockquote, q {\r\n	quotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n	content: '''';\r\n	content: none;\r\n}\r\ntable {\r\n	border-collapse: collapse;\r\n	border-spacing: 0;\r\n}\r\n/**********************End Reset****************************/\r\nbody {\r\n	margin:0px;\r\n	font-size: 12px;\r\n	color: #000000;\r\n	font-family: Arial;\r\n}\r\nh1, h2, h3, h4, h5, h6{\r\n	font-weight: bold;\r\n	font-family: "Trebuchet MS";\r\n}\r\nh1{\r\n	font-size: 20px;\r\n}\r\nh2{\r\n	font-size: 18px;\r\n}\r\nh3{\r\n	font-size: 16px;\r\n}\r\nh4{\r\n	font-size: 15px;\r\n}\r\nh5{\r\n	font-size: 14px;\r\n}\r\nh6{\r\n	font-size: 12px;\r\n}\r\np{\r\n	margin-bottom: 10px;\r\n}\r\nimg{\r\n	border: 0;\r\n}\r\n.container{\r\n	width: 100%;\r\n	margin: 0px auto;\r\n}\r\n.content{\r\n	margin: 0px auto;\r\n	width: 960px;\r\n}\r\n.header{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.logo{\r\n}\r\n.nav{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.main_content{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.footer{\r\n	position: relative;\r\n	display: block;\r\n}', 2, 'yes'),
(5, 'css_fixed_html5', '/**********************Start Reset****************************/\r\n/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, centerusertest\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n	margin: 0;\r\n	padding: 0;\r\n	border: 0;\r\n	font-size: 100%;\r\n	font: inherit;\r\n	vertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n	display: block;\r\n}\r\nbody {\r\n	line-height: 1;\r\n}\r\nol, ul {\r\n	list-style: none;\r\n}\r\nblockquote, q {\r\n	quotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n	content: '''';\r\n	content: none;\r\n}\r\ntable {\r\n	border-collapse: collapse;\r\n	border-spacing: 0;\r\n}\r\n/**********************End Reset****************************/\r\nbody {\r\n	margin:0px;\r\n	font-size: 12px;\r\n	color: #000000;\r\n	font-family: Arial;\r\n}\r\nh1, h2, h3, h4, h5, h6{\r\n	font-weight: bold;\r\n	font-family: "Trebuchet MS";\r\n}\r\nh1{\r\n	font-size: 20px;\r\n}\r\nh2{\r\n	font-size: 18px;\r\n}\r\nh3{\r\n	font-size: 16px;\r\n}\r\nh4{\r\n	font-size: 15px;\r\n}\r\nh5{\r\n	font-size: 14px;\r\n}\r\nh6{\r\n	font-size: 12px;\r\n}\r\np{\r\n	margin-bottom: 10px;\r\n}\r\nimg{\r\n	border: 0;\r\n}\r\n.container{\r\n	width: 100%;\r\n	margin: 0px auto;\r\n}\r\n.content{\r\n	margin: 0px auto;\r\n	width: 960px;\r\n}\r\nheader, .header{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.logo{\r\n}\r\nnav, .nav{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.main_content{\r\n	position: relative;\r\n	display: block;\r\n}\r\nfooter, .footer{\r\n	position: relative;\r\n	display: block;\r\n}', 2, 'yes'),
(6, 'css_fixed', '/**********************Start Reset****************************/\r\n/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, centerusertest\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n	margin: 0;\r\n	padding: 0;\r\n	border: 0;\r\n	font-size: 100%;\r\n	font: inherit;\r\n	vertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n	display: block;\r\n}\r\nbody {\r\n	line-height: 1;\r\n}\r\nol, ul {\r\n	list-style: none;\r\n}\r\nblockquote, q {\r\n	quotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n	content: '''';\r\n	content: none;\r\n}\r\ntable {\r\n	border-collapse: collapse;\r\n	border-spacing: 0;\r\n}\r\n/**********************End Reset****************************/\r\nbody {\r\n	margin:0px;\r\n	font-size: 12px;\r\n	color: #000000;\r\n	font-family: Arial;\r\n}\r\nh1, h2, h3, h4, h5, h6{\r\n	font-weight: bold;\r\n	font-family: "Trebuchet MS";\r\n}\r\nh1{\r\n	font-size: 20px;\r\n}\r\nh2{\r\n	font-size: 18px;\r\n}\r\nh3{\r\n	font-size: 16px;\r\n}\r\nh4{\r\n	font-size: 15px;\r\n}\r\nh5{\r\n	font-size: 14px;\r\n}\r\nh6{\r\n	font-size: 12px;\r\n}\r\np{\r\n	margin-bottom: 10px;\r\n}\r\nimg{\r\n	border: 0;\r\n}\r\n.container{\r\n	width: 100%;\r\n	margin: 0px auto;\r\n}\r\n.content{\r\n	margin: 0px auto;\r\n	width: 960px;\r\n}\r\nheader, .header{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.logo{\r\n}\r\nnav, .nav{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.main_content{\r\n	position: relative;\r\n	display: block;\r\n}\r\nfooter, .footer{\r\n	position: relative;\r\n	display: block;\r\n}', 2, 'yes'),
(7, 'css_responsive', '/**********************Start Reset****************************/\r\n/* http://meyerweb.com/eric/tools/css/reset/ \r\n   v2.0 | 20110126\r\n   License: none (public domain)\r\n*/\r\n\r\nhtml, body, div, span, applet, object, iframe,\r\nh1, h2, h3, h4, h5, h6, p, blockquote, pre,\r\na, abbr, acronym, address, big, cite, code,\r\ndel, dfn, em, img, ins, kbd, q, s, samp,\r\nsmall, strike, strong, sub, sup, tt, var,\r\nb, u, i, centerusertest\r\ndl, dt, dd, ol, ul, li,\r\nfieldset, form, label, legend,\r\ntable, caption, tbody, tfoot, thead, tr, th, td,\r\narticle, aside, canvas, details, embed, \r\nfigure, figcaption, footer, header, hgroup, \r\nmenu, nav, output, ruby, section, summary,\r\ntime, mark, audio, video {\r\n	margin: 0;\r\n	padding: 0;\r\n	border: 0;\r\n	font-size: 100%;\r\n	font: inherit;\r\n	vertical-align: baseline;\r\n}\r\n/* HTML5 display-role reset for older browsers */\r\narticle, aside, details, figcaption, figure, \r\nfooter, header, hgroup, menu, nav, section {\r\n	display: block;\r\n}\r\nbody {\r\n	line-height: 1;\r\n}\r\nol, ul {\r\n	list-style: none;\r\n}\r\nblockquote, q {\r\n	quotes: none;\r\n}\r\nblockquote:before, blockquote:after,\r\nq:before, q:after {\r\n	content: '''';\r\n	content: none;\r\n}\r\ntable {\r\n	border-collapse: collapse;\r\n	border-spacing: 0;\r\n}\r\n/**********************End Reset****************************/\r\nbody {\r\n	margin:0px;\r\n	font-size: 12px;\r\n	color: #000000;\r\n	font-family: Arial;\r\n}\r\nh1, h2, h3, h4, h5, h6{\r\n	font-weight: bold;\r\n	font-family: "Trebuchet MS";\r\n}\r\nh1{\r\n	font-size: 1.8em;\r\n}\r\nh2{\r\n	font-size: 1.5em;\r\n}\r\nh3{\r\n	font-size: 1.3em;\r\n}\r\nh4{\r\n	font-size: 1.2em;\r\n}\r\nh5{\r\n	font-size: 1.1em;\r\n}\r\nh6{\r\n	font-size: 1em;\r\n}\r\np{\r\n	margin-bottom: 1em;\r\n}\r\nimg{\r\n	border: 0;\r\n}\r\n.container{\r\n	width: 100%;\r\n	margin: 0px auto;\r\n}\r\n.content{\r\n	margin: 0px auto;\r\n	width: 100%;\r\n}\r\nheader, .header{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.logo{\r\n}\r\nnav, .nav{\r\n	position: relative;\r\n	display: block;\r\n}\r\n.main_content{\r\n	position: relative;\r\n	display: block;\r\n}\r\nfooter, .footer{\r\n	position: relative;\r\n	display: block;\r\n}', 2, 'yes'),
(8, 'js_jquery_ready', '<script type="text/javascript">\r\n//<![CDATA[\r\n     $(document).ready(function () {\r\n     });  \r\n//]]>\r\n</script>', 3, 'yes'),
(9, 'js_jquery_anon', '(function( $ ){\r\n\r\n})( jQuery );', 3, 'yes'),
(10, 'js_jquery_namespacing', '(function( $ ){\r\n\r\n  var methods = {\r\n    init : function( options ) { \r\n      // THIS \r\n    },\r\n    show : function( ) {\r\n      // IS\r\n    },\r\n    hide : function( ) { \r\n      // GOOD\r\n    },\r\n    update : function( content ) { \r\n      // !!! \r\n    }\r\n  };\r\n\r\n  $.fn.tooltip = function( method ) {\r\n    \r\n    // Method calling logic\r\n    if ( methods[method] ) {\r\n      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));\r\n    } else if ( typeof method === ''object'' || ! method ) {\r\n      return methods.init.apply( this, arguments );\r\n    } else {\r\n      $.error( ''Method '' +  method + '' does not exist on jQuery.tooltip'' );\r\n    }    \r\n  \r\n  };\r\n\r\n})( jQuery );', 3, 'yes'),
(11, 'js_jquery_options', '(function( $ ){\r\n\r\n  $.fn.tooltip = function( options ) {  \r\n\r\n    // Create some defaults, extending them with any options that were provided\r\n    var settings = $.extend( {\r\n      ''location''         : ''top'',\r\n      ''background-color'' : ''blue''\r\n    }, options);\r\n\r\n    return this.each(function() {        \r\n\r\n      // Tooltip plugin code here\r\n\r\n    });\r\n\r\n  };\r\n})( jQuery );', 3, 'yes'),
(12, 'php_start', '<?php\r\n\r\n?>', 4, 'yes'),
(13, 'php_info', '<?php\r\n     phpinfo()\r\n?>', 4, 'yes'),
(14, 'c_sharp_basic', '<%\r\n\r\n%>', 5, 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `templates_type`
--

CREATE TABLE IF NOT EXISTS `templates_type` (
  `templates_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `templates_type_type` enum('css','html','js','php','c_sharp') NOT NULL DEFAULT 'html',
  `templates_type_ext` enum('css','html','js','php','aspx') NOT NULL,
  PRIMARY KEY (`templates_type_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Dumping data for table `templates_type`
--

INSERT INTO `templates_type` (`templates_type_id`, `templates_type_type`, `templates_type_ext`) VALUES
(1, 'html', 'html'),
(2, 'css', 'css'),
(3, 'js', 'js'),
(4, 'php', 'php'),
(5, 'c_sharp', 'aspx');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

﻿// 2008/7/3 Scripted by K-Factory@migiwa
// 2009/1/27 Modified by K-Factory@migiwa
// 2014/6/29 Modified by nkeronkow
// 2018/11/26 Added to relick's github, changes tracked there
// github.com/relick/touhou-song-sorter

// *****************************************************************************
str_CenterT = 'Tie!';
str_CenterB = 'Undo last choice';

str_ImgPath = 'images/';
str_YouPath = 'https://www.youtube.com/embed/';
str_YouLink = 'https://www.youtube.com/watch?v=';

// Up to which position should images be shown for?
var int_ResultRank = 3;

// Maximum number of result rows before being broken off into another table.
var maxRows = 42;

// * Game and album titles
var ary_TitleData = [
	  "1: The Highly Responsive to Prayers"
	, "2: The Story of Eastern Wonderland"
	, "3: Phantasmagoria of Dim.Dream"
	, "4: Lotus Land Story"
	, "5: Mystic Square"
	, "Shuusou Gyoku"
	, "Kioh Gyoku"
	, "6: The Embodiment of Scarlet Devil"
	, "7: Perfect Cherry Blossom"
	, "7.5: Immaterial and Missing Power"
	, "8: Imperishable Night"
	, "9: Phantasmagoria of Flower View"
	, "9.5: Shoot the Bullet"
	, "10: Mountain of Faith"
	, "10.5: Scarlet Weather Rhapsody"
	, "11: Subterranean Animism"
	, "12.3: Touhou Hisoutensoku"
	, "12: Undefined Fantastic Object"
	, "12.5: Double Spoiler"
	, "12.8: Great Fairy Wars"
	, "13: Ten Desires"
	, "13.5: Hopeless Masquerade"
	, "14: Double Dealing Character"
	, "14.3: Impossible Spell Card"
	, "Dolls in Pseudo Paradise"
	, "Ghostly Field Club"
	, "Changeability of Strange Dream"
	, "Retrospective 53 minutes"
	, "Magical Astronomy"
	, "Unknown Flower, Mesmerizing Journey"
	, "Trojan Green Asteroid"
	, "Neo-traditionalism of Japan"
	, "Akyuu's Untouched Score vol. 1"
	, "Akyuu's Untouched Score vol. 2"
	, "Akyuu's Untouched Score vol. 3"
	, "Akyuu's Untouched Score vol. 4"
	, "Akyuu's Untouched Score vol. 5"
	, "Bonus CDs + Other Tracks"
	, "14.5: Urban Legend in Limbo"
	, "15: Legacy of Lunatic Kingdom"
	, "16: Hidden Star in Four Seasons"
	, "15.5: Antinomy of Common Flowers"
	, "16.5: Violet Detector"
	, "Dr. Latency's Freak Report"
	, "Dateless Bar \"Old Adam\""
	, "17: Wily Beast and Weakest Creature"
	, "17.5: Touhou Gouyoku Ibun"
	, "18: Unconnected Marketeers"
];

// Number of columns in the selection list.
var int_Colspan = 3;

// * Music information
// [Index: Meaning]
// 0: unused
// 1: Track name
const TRACK_NAME = 1;
// 2: Array that maps to ary_TitleData, 0 = track not in title, 1 = track in title.
const TRACK_TITLES = 2;
// 3: Image filename
const TRACK_IMAGE = 3;
// 4: Youtube video ID
const TRACK_YOUTUBE_ID = 4;
// 5: Title (game/album) name
const TRACK_TITLE_NAME = 5;
// 6: Title (game/album) abbreviation
const TRACK_TITLE_ABBREV = 6;
// 7: Description of track
const TRACK_DESCRIPTION = 7;
// 8: If the *exact* same track appears in a later game then it should use [2] to specify rather than setting as arrangement.
const TRACK_IS_ARRANGEMENT = 8;
	const NOT_ARRANGEMENT = 0;
	const IS_ARRANGEMENT = 1;
// 9: Track type, Album tracks should all be marked as OTHER_THEME.
const TRACK_TYPE = 9;
	const STAGE_THEME = 1;
	const BOSS_THEME = 2;
	const STAGE_AND_BOSS_THEME = 3;
	const OTHER_THEME = 0;
const TRACK_IS_ZUN = 10;
	const ZUN = 1
	const NOT_ZUN = 0;

var ary_SongData = [
	//The Highly Responsive to Prayers / Akyuu's Untouched Score vol. 5
	[1, "A Sacred Lot",						[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "IWcJtankEr4", "The Highly Responsive to Prayers", "HRtP", "Title Screen", 0, 0, 1],
	[1, "Eternal Shrine Maiden",			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "LmN9btd7Ttg", "The Highly Responsive to Prayers", "HRtP", "Stages 1-4/Jigoku Route 16-19", 0, 2, 1],
	[1, "The Positive and Negative",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "QJYAF2SZWTk", "The Highly Responsive to Prayers", "HRtP", "SinGyoku's theme", 0, 1, 1],
	[1, "Highly Responsive to Prayers",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "kFBldCY1PoQ", "The Highly Responsive to Prayers", "HRtP", "Makai Route 6-9", 0, 2, 1],
	[1, "Eastern Strange Discourse",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "-CeLvtwCMTs", "The Highly Responsive to Prayers", "HRtP", "Jigoku Route 6-9", 0, 2, 1],
	[1, "Angel's Legend",					[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "XcvTjFo2T8I", "The Highly Responsive to Prayers", "HRtP", "YuugenMagan and Mima's theme", 0, 1, 1],
	[1, "Oriental Magician",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "HXZFV1aF3Dg", "The Highly Responsive to Prayers", "HRtP", "Makai Route 11-14", 0, 2, 1],
	[1, "Blade of Banishment",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "N4tgb2jUkvs", "The Highly Responsive to Prayers", "HRtP", "Jigoku Route 11-14", 0, 2, 1],
	[1, "Magic Mirror",						[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "DGwLf4vyJU4", "The Highly Responsive to Prayers", "HRtP", "Elis and Kikuri's theme", 0, 1, 1],
	[1, "the Legend of KAGE",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "ORqbz5-dzNY", "The Highly Responsive to Prayers", "HRtP", "Makai Route 16-19", 0, 2, 1],
	[1, "Now, Until the Moment You Die",	[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "YiN9rqnxw20", "The Highly Responsive to Prayers", "HRtP", "Sariel's theme", 0, 1, 1],
	[1, "Civilization of Magic",			[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "7Vtd_uyO1uY", "The Highly Responsive to Prayers", "HRtP", "Sariel's 2nd theme", 0, 1, 1],
	[1, "Swordsman of a Distant Star",		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "2g91HjLQ4Q4", "The Highly Responsive to Prayers", "HRtP", "Konngara's theme", 0, 1, 1],
	[1, "Iris",								[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "_P8674GXz6g", "The Highly Responsive to Prayers", "HRtP", "Ending", 0, 0, 1],
	//unused
	[1, "Shrine of the Wind",				[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "fZ2BDUV.jpg", "DdCsWBMHqfU", "The Highly Responsive to Prayers", "HRtP", "Unused track", 0, 0, 1],
	[1, "Theme of Eastern Story",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0], "0Ig2aUY.jpg", "qGwASZn0ZKA", "Akyuu's Untouched Score vol. 5", "AUS5", "Track 15", 0, 0, 1],
	
	//Other
	
	//Story of Eastern Wonderland / Akyuu's Untouched Score vol. 3
	[1, "Eastern Recorded Sealing of a Demon ~ Pure Land Mandala",	[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "fHOF0qPwEzs", "Story of Eastern Wonderland", "SoEW", "Title Screen", 0, 0, 1],
	[1, "Hakurei ~ Eastern Wind",									[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "ytSxZnZ_A_8", "Story of Eastern Wonderland", "SoEW", "Stage 1", 0, 2, 1],
	[1, "She's in a temper!!",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "jsKdEV8BHn8", "Story of Eastern Wonderland", "SoEW", "Rika's theme", 0, 1, 1],
	[1, "End of Daylight",											[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "c8di6az9BBQ", "Story of Eastern Wonderland", "SoEW", "Stage 2", 0, 2, 1],
	[1, "Power of Darkness",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "h8N3XswjEuI", "Story of Eastern Wonderland", "SoEW", "Meira's theme", 0, 1, 1],
	[1, "World of Empty Dreams",									[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "oluGWBK8Bk8", "Story of Eastern Wonderland", "SoEW", "Stage 3", 0, 2, 1],
	[1, "Bet on Death",												[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "BuuUNhHRsrk", "Story of Eastern Wonderland", "SoEW", "The Five Magic Stones's theme", 0, 1, 1],
	[1, "Himorogi, Burn in Violet",									[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "fmZOtXxJfSY", "Story of Eastern Wonderland", "SoEW", "Stage 4", 0, 2, 1],
	[1, "Love-Coloured Magic",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "1cgiEa74RPs", "Story of Eastern Wonderland", "SoEW", "Marisa Kirisame's theme", 0, 1, 1],
	[1, "Eastern (...) Demon ~ A Phantom's Boisterous Dance",		[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "iuvxZKfIMqE", "Story of Eastern Wonderland", "SoEW", "Final Stage", 0, 2, 1],
	[1, "Complete Darkness",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "glGtklFzZ2k", "Story of Eastern Wonderland", "SoEW", "Mima's theme", 0, 1, 1],
	[1, "Extra Love",												[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "C5j6uIIybXA", "Story of Eastern Wonderland", "SoEW", "Extra Stage", 0, 2, 1],
	[1, "The Tank Girl's Dream",									[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "TfFd1xLMbEA", "Story of Eastern Wonderland", "SoEW", "Rika's 2nd theme", 0, 1, 1],
	[1, "Forest of Tono",											[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "aru3MYabfEM", "Story of Eastern Wonderland", "SoEW", "Ending", 0, 0, 1],
	[1, "Legendary Wonderland",										[0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "XHi6YmD.jpg", "oY64WT6ZBRo", "Story of Eastern Wonderland", "SoEW", "Staff Roll", 0, 0, 1],
	[1, "Hakurei Shrine Grounds",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "rHPHyai.jpg", "aPTxjd1l9Gk", "Akyuu's Untouched Score vol. 3", "AUS3", "Track 16", 0, 0, 1],
	[1, "Sunfall",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "rHPHyai.jpg", "4vvazD9j2G8", "Akyuu's Untouched Score vol. 3", "AUS3", "Track 17", 0, 0, 1],
	[1, "Sealed Demon's Finale",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0], "rHPHyai.jpg", "E-iw2aR-R1Y", "Akyuu's Untouched Score vol. 3", "AUS3", "Track 18", 0, 0, 1],
	
	//Phantasmagoria of Dim.Dream / Akyuu's Untouched Score vol. 4
	[1, "A Dream Transcending Space-Time",			[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "OQ9Q5Kb_T1Y", "Phantasmagoria of Dim.Dream", "PoDD", "Title Screen", 0, 0, 1],
	[1, "Selection",								[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "_9bzLaz55tM", "Phantasmagoria of Dim.Dream", "PoDD", "Character Selection", 0, 0, 1],
	[1, "Eastern Mystical Love Consultation",		[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "cwPUjQmTVRY", "Phantasmagoria of Dim.Dream", "PoDD", "Reimu Hakurei's theme", 0, 1, 1],
	[1, "Reincarnation",							[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "J8p2HGRZfII", "Phantasmagoria of Dim.Dream", "PoDD", "Mima's theme", 0, 1, 1],
	[1, "Dim. Dream",								[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "BBtSp1EZdI8", "Phantasmagoria of Dim.Dream", "PoDD", "Marisa Kirisame's theme", 0, 1, 1],
	[1, "Tabula rasa ~ The Empty Girl",				[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "SxpZFNYSrGI", "Phantasmagoria of Dim.Dream", "PoDD", "Ellen's theme", 0, 1, 1],
	[1, "Maniacal Princess",						[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "3ZyjaO9p0wQ", "Phantasmagoria of Dim.Dream", "PoDD", "Kotohime's theme", 0, 1, 1],
	[1, "Vanishing Dream ~ Lost Dream",				[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "vm4PvG7RGwU", "Phantasmagoria of Dim.Dream", "PoDD", "Kana Anaberal's theme", 0, 1, 1],
	[1, "Visionary Game ~ Dream War",				[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "M8XGQF34-9A", "Phantasmagoria of Dim.Dream", "PoDD", "Rikako Asakura's theme", 0, 1, 1],
	[1, "Decisive Magic Battle! ~ Fight it out!",	[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "Fj-hhCHC8hM", "Phantasmagoria of Dim.Dream", "PoDD", "Round 7 CPU Battle theme", 0, 1, 1],
	[1, "Disunified Field Theory of Magic",			[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "mEQgIZ-enoA", "Phantasmagoria of Dim.Dream", "PoDD", "Midboss Demo theme", 0, 1, 1],
	[1, "Sailor of Time",							[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "ygB_MKgqXdg", "Phantasmagoria of Dim.Dream", "PoDD", "Chiyuri Kitashirakawa's theme", 0, 1, 1],
	[1, "Love of Magical Chimes",					[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "nS_RPPbBRpk", "Phantasmagoria of Dim.Dream", "PoDD", "Yumemi Demo theme", 0, 1, 1],
	[1, "Strawberry Crisis!!",						[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "UTLqnME57vo", "Phantasmagoria of Dim.Dream", "PoDD", "Yumemi Okazaki's theme", 0, 1, 1],
	[1, "Dream of Eternity",						[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "zbFV-h0ba_I", "Phantasmagoria of Dim.Dream", "PoDD", "Common Ending", 0, 0, 1],
	[1, "Eastern Blue Sky",							[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "Cjfi0Y_grlo", "Phantasmagoria of Dim.Dream", "PoDD", "Daytime Ending", 0, 0, 1],
	[1, "Eternal Full Moon",						[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "s2DEdCtb8jo", "Phantasmagoria of Dim.Dream", "PoDD", "Nighttime Ending", 0, 0, 1],
	[1, "Maple Dream...",							[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "yBb4sr2Wrmc", "Phantasmagoria of Dim.Dream", "PoDD", "Staff Roll", 0, 0, 1],
	[1, "Ghostly Person's Holiday",					[0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "Imp5ltX.jpg", "jBt_eVHkoAk", "Phantasmagoria of Dim.Dream", "PoDD", "Name Registration", 0, 0, 1],
	[1, "Winds of Time",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "qocxn1B.jpg", "lEbHy9Be0Qo", "Akyuu's Untouched Score vol. 4", "AUS4", "Track 22 (Unused theme)", 0, 0, 1],
	[1, "Starbow Dream",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "qocxn1B.jpg", "vtjrcQMLgC4", "Akyuu's Untouched Score vol. 4", "AUS4", "Track 23 (Unused theme)", 0, 0, 1],
	[1, "Phantasmagoria",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0], "qocxn1B.jpg", "WPh5xHYzm40", "Akyuu's Untouched Score vol. 4", "AUS4", "Track 24 (Unused theme)", 0, 0, 1],
	
	//Lotus Land Story / Akyuu's Untouched Score vol. 1
	[1, "Gensokyo ~ Lotus Land Story",						[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "ZI6ctU6xOlI", "Lotus Land Story", "LLS", "Title Screen", 0, 0, 1],
	[1, "Witching Dream",									[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "2iVplhDGeNs", "Lotus Land Story", "LLS", "Reimu's Stage 1", 0, 2, 1],
	[1, "Selene's Light",									[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "MrjQ_l_KGiI", "Lotus Land Story", "LLS", "Marisa's Stage 1", 0, 2, 1],
	[1, "Decoration Battle",								[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "ABiZU-VYCKo", "Lotus Land Story", "LLS", "Orange's theme", 0, 1, 1],
	[1, "Break the Sabbath",								[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "ACpj8Ggoyss", "Lotus Land Story", "LLS", "Stage 2", 0, 2, 1],
	[1, "Scarlet Symphony ~ Scarlet Phoneme",				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "kQqp-WqVHyA", "Lotus Land Story", "LLS", "Kurumi's theme", 0, 1, 1],
	[1, "Bad Apple!!",										[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "3kXx6f7qaa8", "Lotus Land Story", "LLS", "Stage 3", 0, 2, 1],
	[1, "Spirit Battle ~ Perdition crisis",					[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "0MrCXNJDfGw", "Lotus Land Story", "LLS", "Elly's theme", 0, 1, 1],
	[1, "Alice Maestra",									[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "rS6JkYfgeQs", "Lotus Land Story", "LLS", "Stage 4", 0, 2, 1],
	[1, "Maiden's Capriccio",								[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "IdAyCWh0238", "Lotus Land Story", "LLS", "Reimu's theme", 0, 1, 1],
	[1, "Vessel of Stars ~ Casket of Star",					[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "zLzTvn4U014", "Lotus Land Story", "LLS", "Marisa's theme", 0, 1, 1],
	[1, "Lotus Love",										[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "7FZUFe80v7Q", "Lotus Land Story", "LLS", "Stage 5", 0, 2, 1],
	[1, "Sleeping Terror",									[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "llO4PINy2e8", "Lotus Land Story", "LLS", "Yuuka's 1st theme", 0, 1, 1],
	[1, "Dream Land",										[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "4_vq5KOjgdw", "Lotus Land Story", "LLS", "Final Stage", 0, 2, 1],
	[1, "Faint Dream ~ Inanimate Dream",					[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "C4gaWY5THh4", "Lotus Land Story", "LLS", "Yuuka's 2nd theme", 0, 1, 1],
	[1, "The Inevitably Forbidden Game",					[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "LDgUA5kh8H0", "Lotus Land Story", "LLS", "Extra Stage", 0, 2, 1],
	[1, "Illusion of a Maid ~ Icemilk Magic",				[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "Fluu5GOfy68", "Lotus Land Story", "LLS", "Mugetsu's theme", 0, 1, 1],
	[1, "Cute Devil ~ Innocence",							[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "yaGqzG2Ydro", "Lotus Land Story", "LLS", "Gengetsu's theme", 0, 1, 1],
	[1, "Days",												[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "OFlOGKYCaUQ", "Lotus Land Story", "LLS", "Bad Ending", 0, 0, 1],
	[1, "Peaceful",											[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "ukvQjvb2_fE", "Lotus Land Story", "LLS", "Good Ending", 0, 0, 1],
	[1, "Arcadian Dream",									[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "Eoo-W-wWHUQ", "Lotus Land Story", "LLS", "Staff Roll", 0, 0, 1],
	[1, "Those Who Live in Illusions",						[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9Bgvih5.jpg", "Cq3B3M5PoZk", "Lotus Land Story", "LLS", "Name Registration", 0, 0, 1],
	[1, "Lotus Road",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "mQAYk7ubjdY", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 23 (Unused theme)", 0, 0, 1],
	[1, "Dreamy Pilot",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "DFk-OMchOgg", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 24 (Unused theme)", 0, 0, 1],
	[1, "Incomplete Plot",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "-69Dm1GKbqo", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 25 (Unused theme)", 0, 0, 1],
	[1, "Border Land",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "c4n9pYstX8s", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 26 (Unused theme)", 0, 0, 1],
	[1, "Magic Shop of Raspberry",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "h8KP9sbei8A", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 27 (Unused theme)", 0, 0, 1],
	[1, "Crescent Dream",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "PpLE1aI5PYs", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 28 (Unused theme)", 0, 0, 1],
	[1, "Decoration Battle (Unused Version)",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "sj3hjPeUupk", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 29 (Orange's theme - Unused)", 0, 0, 1],
	[1, "Faint Dream ~ Inanimate Dream (Unused Version)",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "JJYLLmO.jpg", "iTOhEWM2kz8", "Akyuu's Untouched Score vol. 1", "AUS1", "Track 30 (Yuuka's 2nd theme - Unused)", 0, 0, 1],
	
	//Mystic Square / Akyuu's Untouched Score vol. 2
	[1, "Wondrous Tales of Romance ~ Mystic Square",	[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "Szhq0dV-szY", "Mystic Square", "MS", "Title Screen", 0, 0, 1],
	[1, "Dream Express",								[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "6gYaX4HgV4g", "Mystic Square", "MS", "Stage 1", 0, 2, 1],
	[1, "Magic Formation ~ Magic Square",				[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "uTjyoODonBE", "Mystic Square", "MS", "Sara's theme", 0, 1, 1],
	[1, "Dimension of Reverie",							[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "wTrsAHqumyA", "Mystic Square", "MS", "Stage 2", 0, 2, 1],
	[1, "Spiritual Heaven",								[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "c1i4HRrgwvY", "Mystic Square", "MS", "Louise's theme", 0, 1, 1],
	[1, "Romantic Children",							[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "8UZJbdvHKSI", "Mystic Square", "MS", "Stage 3", 0, 2, 1],
	[1, "Plastic Mind",									[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "Xd0bJ0rrgaU", "Mystic Square", "MS", "Alice's theme", 0, 1, 1],
	[1, "Maple Wise",									[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "zsNMs7_LEBo", "Mystic Square", "MS", "Stage 4", 0, 2, 1],
	[1, "Forbidden Magic",								[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "odqsxhOZlH0", "Mystic Square", "MS", "Yuki and Mai's theme", 0, 1, 1],
	[1, "Crimson Maiden ~ Crimson Dead!!",				[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "VPP99ERu5Ms", "Mystic Square", "MS", "Yuki's theme", 0, 1, 1],
	[1, "Treacherous Maiden ~ Judas Kiss",				[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "9--OkYd3fn0", "Mystic Square", "MS", "Mai's theme", 0, 1, 1],
	[1, "the Last Judgement",							[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "Y_2mj4M-Rmc", "Mystic Square", "MS", "Stage 5", 0, 2, 1],
	[1, "Doll of Misery",								[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "OHEBWZR7U4Y", "Mystic Square", "MS", "Yumeko's theme", 0, 1, 1],
	[1, "End of the World ~ World's End",				[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "o0nd8Q4vCB8", "Mystic Square", "MS", "Final Stage", 0, 2, 1],
	[1, "Legendary Illusion ~ Infinite Being",			[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "PFqakHJ7-jI", "Mystic Square", "MS", "Shinki's theme", 0, 1, 1],
	[1, "Alice in Wonderland",							[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "_ZwOGMEAbQo", "Mystic Square", "MS", "Extra Stage", 0, 2, 1],
	[1, "the Grimoire of Alice",						[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "sMlFCwOjIMQ", "Mystic Square", "MS", "Alice's 2nd theme", 0, 1, 1],
	[1, "Shinto Shrine",								[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "-TIdpSdWMlA", "Mystic Square", "MS", "Bad Ending", 0, 0, 1],
	[1, "Endless",										[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "CmXMWk8eZBo", "Mystic Square", "MS", "Good Ending 1", 0, 0, 1],
	[1, "Eternal Paradise",								[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "0SWDhjnEPu8", "Mystic Square", "MS", "Good Ending 2", 0, 0, 1],
	[1, "Mystic Dream",									[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "sLeMEpDDGiA", "Mystic Square", "MS", "Staff Roll", 0, 0, 1],
	[1, "Peaceful Romancer",							[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "-BZUMv5gAkk", "Mystic Square", "MS", "Extra Ending", 0, 0, 1],
	[1, "Soul's Resting Place",							[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "8YV2A7P.jpg", "N5L5XE-N3fU", "Mystic Square", "MS", "Name Registration", 0, 0, 1],

	// Shuusou Gyoku
	[1, "Shuusou Gyoku ~ Clockworks",					[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "coZsnhQyozM", "Shuusou Gyoku", "SG", "Title Screen", 0, 0, 1],
	[1, "False Strawberry",								[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "QyDHN8zHJps", "Shuusou Gyoku", "SG", "Stage 1", 0, 2, 1],
	[1, "Primrose Shiver",								[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "4uTi2TnnQes", "Shuusou Gyoku", "SG", "Milia's theme", 0, 1, 1],
	[1, "Illusory Imperial Capital",					[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "xbciqe83OPY", "Shuusou Gyoku", "SG", "Stage 2", 0, 2, 1],
	[1, "Disastrous Gemini",							[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "Y1kNEy6PnCs", "Shuusou Gyoku", "SG", "Mei and Mai's theme", 0, 1, 1],
	[1, "Illusion of Flowers, Air of Scarlet Dream",	[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "lVlsF9TGwtI", "Shuusou Gyoku", "SG", "Stage 3", 0, 2, 1],
	[1, "Firmament Army",								[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "zVlqBfKSIFg", "Shuusou Gyoku", "SG", "Gates' theme", 0, 1, 1],
	[1, "Illusionary Sputnik Night",					[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "mKMdqkcQyR8", "Shuusou Gyoku", "SG", "Stage 4", 0, 2, 1],
	[1, "Mechanical Circus ~ Reverie",					[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "kV-ewZiFots", "Shuusou Gyoku", "SG", "Marie's theme", 0, 1, 1],
	[1, "Illusionary Girl from Canaveral",				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "wWP1emcXJag", "Shuusou Gyoku", "SG", "Stage 5", 0, 2, 1],
	[1, "Magical Girl's Crusade",						[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "demUHmy-uD0", "Shuusou Gyoku", "SG", "Erich's theme", 0, 1, 1],
	[1, "Antique Terror",								[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "LlIvZCfaCxw", "Shuusou Gyoku", "SG", "Stage 6", 0, 2, 1],
	[1, "Dream Machine ~ Innocent Power",				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "Taa60KOjb6g", "Shuusou Gyoku", "SG", "Vivit's theme", 0, 1, 1],
	[1, "Illusory Science ~ Doll's Phantom",			[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "RHonR4uGa6s", "Shuusou Gyoku", "SG", "Vivit's 2nd theme", 0, 1, 1],
	[1, "Girl's Divinity ~ Pandora's Box",				[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "CZAw1qTrgbY", "Shuusou Gyoku", "SG", "Vivit's 3rd theme", 0, 1, 1],
	[1, "Silk Road Alice",								[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "cQHEvt7AtjQ", "Shuusou Gyoku", "SG", "Extra Stage", 0, 2, 1],
	[1, "The Witches' Ball ~ Magus",					[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "9KqVdSnuEWQ", "Shuusou Gyoku", "SG", "Marisa Kirisame's theme", 0, 1, 1],
	[1, "Dichromatic Lotus Butterfly ~ Ancients",		[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "xFovQWYiJEw", "Shuusou Gyoku", "SG", "Reimu Hakurei's theme", 0, 1, 1],
	[1, "Herselves",									[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "SRbwQahZBsE", "Shuusou Gyoku", "SG", "Ending", 0, 0, 1],
	[1, "Titled Maid",									[0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "bz6cubk.jpg", "eXU3XDJy6Cg", "Shuusou Gyoku", "SG", "Name Registration", 0, 0, 1],

	// Kioh Gyoku
	[1, "Kioh Gyoku ~ Fairy Dance",								[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "m98DAAZ3WsE", "Kioh Gyoku", "KG", "Title Screen", 0, 0, 1],
	[1, "Velvet Maiden Battle ~ Velvet Battle",					[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "4oe62MZuD24", "Kioh Gyoku", "KG", "VIVIT's theme", 0, 1, 1],
	[1, "Castle Explorer -in the Sky-",							[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "J0R6uIzUbaw", "Kioh Gyoku", "KG", "Gates' theme", 0, 1, 1],
	[1, "Orphic Poetry ~ Pseudoclassic",						[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "hl37wNh5NTM", "Kioh Gyoku", "KG", "Mei and Mai's theme", 0, 1, 1],
	[1, "New Illusion ~ New Fantasy",							[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "9Pl4wRPgKhI", "Kioh Gyoku", "KG", "Milia's theme", 0, 1, 1],
	[1, "Holy Knight of Orléans",								[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "KsxoWppK_b8", "Kioh Gyoku", "KG", "Marie's theme", 0, 1, 1],
	[1, "My Maid, Sweet Maid",									[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "9XSvPXSofO0", "Kioh Gyoku", "KG", "Erich's theme", 0, 1, 1],
	[1, "Lovely Mound of Cherry Blossoms ~ Flower of Japan",	[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "9NUT7GI-yqY", "Kioh Gyoku", "KG", "Yuuka's theme", 0, 1, 1],
	[1, "Warrior Maiden ~ Heart of Valkyrie",					[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "QZ_7Ww4aZPI", "Kioh Gyoku", "KG", "Morgan's theme", 0, 1, 1],
	[1, "Enigmatic Doll ~ God Knows",							[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eQsoLaw.jpg", "kBReFar3YGw", "Kioh Gyoku", "KG", "Muse's theme", 0, 1, 1],
	
	//The Embodiment of Scarlet Devil
	[1, "A Dream that Is More Scarlet than Red",				[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "HZvnP0svJzk", "The Embodiment of Scarlet Devil", "EoSD", "Title Screen", 0, 0, 1],
	[1, "A Soul as Red as a Ground Cherry",						[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "w279PjazOAw", "The Embodiment of Scarlet Devil", "EoSD", "Stage 1", 0, 2, 1],
	[1, "Apparitions Stalk the Night",							[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "VOHCOa28-xI", "The Embodiment of Scarlet Devil", "EoSD", "Rumia's theme", 0, 1, 1],
	[1, "Lunate Elf",											[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "-Gx6D-i2Fqo", "The Embodiment of Scarlet Devil", "EoSD", "Stage 2", 0, 2, 1],
	[1, "Tomboyish Girl in Love",								[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "FG7flaqNFIY", "The Embodiment of Scarlet Devil", "EoSD", "Cirno's theme", 0, 1, 1],
	[1, "Shanghai Teahouse ~ Chinese Tea",						[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "XpPlPKWW1Y0", "The Embodiment of Scarlet Devil", "EoSD", "Stage 3", 0, 2, 1],
	[1, "Shanghai Alice of Meiji 17",							[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "qefeBGGszRI", "The Embodiment of Scarlet Devil", "EoSD", "Hong Meiling's theme", 0, 1, 1],
	[1, "Voile, the Magic Library",								[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "ogtZZLPHqus", "The Embodiment of Scarlet Devil", "EoSD", "Stage 4", 0, 2, 1],
	[1, "Locked Girl ~ The Girl's Secret Room",					[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "qUEPCSzOHmo", "The Embodiment of Scarlet Devil", "EoSD", "Patchouli Knowledge's theme", 0, 1, 1],
	[1, "The Maid and the Pocket Watch of Blood",				[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "cBWOIyKZ6is", "The Embodiment of Scarlet Devil", "EoSD", "Stage 5", 0, 2, 1],
	[1, "Lunar Clock ~ Luna Dial",								[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "m1nRuWqW09Q", "The Embodiment of Scarlet Devil", "EoSD", "Sakuya Izayoi's theme", 0, 1, 1],
	[1, "The Young Descendant of Tepes",						[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "JZ1jgSkP0Oc", "The Embodiment of Scarlet Devil", "EoSD", "Stage 6", 0, 2, 1],
	[1, "Septette for a Dead Princess",							[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "uQ1YJMvSKP8", "The Embodiment of Scarlet Devil", "EoSD", "Remilia Scarlet's theme", 0, 1, 1],
	[1, "The Centennial Festival for Magical Girls",			[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "B_5o9nETAPE", "The Embodiment of Scarlet Devil", "EoSD", "Extra Stage", 0, 2, 1],
	[1, "U.N. Owen Was Her?",									[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "xcvouNwZbI0", "The Embodiment of Scarlet Devil", "EoSD", "Flandre Scarlet's theme", 0, 1, 1],
	[1, "An Eternity that Is More Transient than Scarlet",		[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "OQ5f49lDH7E", "The Embodiment of Scarlet Devil", "EoSD", "Ending", 0, 0, 1],
	[1, "Crimson Tower ~ Eastern Dream...",						[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "eyprldJ.jpg", "xtv5YP_Hgzs", "The Embodiment of Scarlet Devil", "EoSD", "Staff Roll", 0, 0, 1],
	
	//Perfect Cherry Blossom
	[1, "Mystical Dream ~ Snow or Cherry Petal",						[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "UcoJBM7Cqic", "Perfect Cherry Blossom", "PCB", "Title Screen", 0, 0, 1],
	[1, "Paradise ~ Deep Mountain",										[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "hjRRg8p8YCc", "Perfect Cherry Blossom", "PCB", "Stage 1", 0, 2, 1],
	[1, "Crystallized Silver",											[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "BpDoqVrFCc0", "Perfect Cherry Blossom", "PCB", "Letty Whiterock's theme", 0, 1, 1],
	[1, "The Fantastic Tales from Tono",								[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "P4dnkdikJMw", "Perfect Cherry Blossom", "PCB", "Stage 2", 0, 2, 1],
	[1, "Diao Ye Zong (withered leaf)",									[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "asIr5qxkOnw", "Perfect Cherry Blossom", "PCB", "Chen's theme", 0, 1, 1],
	[1, "The Doll Maker of Bucuresti",									[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "deMn8DAKOMw", "Perfect Cherry Blossom", "PCB", "Stage 3", 0, 2, 1],
	[1, "Doll Judgment ~ The Girl who Played with People's Shapes",		[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "3K38Z8qAkqo", "Perfect Cherry Blossom", "PCB", "Alice Margatroid's theme", 0, 1, 1],
	[1, "The Capital City of Flowers in the Sky",						[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "hfbfl0MlIAU", "Perfect Cherry Blossom", "PCB", "Stage 4", 0, 2, 1],
	[1, "Ghostly Band ~ Phantom Ensemble",								[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "ilWjpT0JPIk", "Perfect Cherry Blossom", "PCB", "Prismriver Sisters' theme", 0, 1, 1],
	[1, "Eastern Mystical Dream ~ Ancient Temple",						[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "QOY4eL-pKAY", "Perfect Cherry Blossom", "PCB", "Stage 5", 0, 2, 1],
	[1, "Hiroari Shoots a Strange Bird ~ Till When?",					[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "0W7vUwkgp5A", "Perfect Cherry Blossom", "PCB", "Youmu's theme", 0, 1, 1],
	[1, "Ultimate Truth",												[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "svbNyNi79Dk", "Perfect Cherry Blossom", "PCB", "Stage 6", 0, 2, 1],
	[1, "Bloom Nobly, Ink-Black Cherry Blossom ~ Border of Life",		[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "VcfQxcRGg8s", "Perfect Cherry Blossom", "PCB", "Yuyuko Saigyouji's theme", 0, 1, 1],
	[1, "Border of Life",												[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "3oDWlQbqCBc", "Perfect Cherry Blossom", "PCB", "Yuyuko's Last Word", 0, 1, 1],
	[1, "Youkai Domination",											[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "pt59eWm1-us", "Perfect Cherry Blossom", "PCB", "Extra Stage", 0, 2, 1],
	[1, "A Maiden's Illusionary Funeral ~ Necro-Fantasy",				[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "8yGYuaXnOtY", "Perfect Cherry Blossom", "PCB", "Ran Yakumo's theme", 0, 1, 1],
	[1, "Youkai Domination ~ Who done it!",								[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "kD1S4qk_2XY", "Perfect Cherry Blossom", "PCB", "Phantasm Stage", 0, 2, 1],
	[1, "Necrofantasia",												[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "ygy6O9kVt7U", "Perfect Cherry Blossom", "PCB", "Yukari Yakumo's theme", 0, 1, 1],
	[1, "Dream of a Spring Breeze",										[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "p39pgg5TPQw", "Perfect Cherry Blossom", "PCB", "Ending", 0, 0, 1],
	[1, "Sakura, Sakura ~ Japanize Dream...",							[0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "60c5lGk.jpg", "DoBbCCteNLs", "Perfect Cherry Blossom", "PCB", "Staff Roll", 0, 0, 1],
	
    //Immaterial and Missing Power
	[1, "Memory of Forgathering Dream",								[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "LV_LRPy50hc", "Immaterial and Missing Power", "IaMP", "Title Screen", 0, 0, 0],
	[1, "Eastern Mystical Love Consultation",						[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "WN1vjUR83Vg", "Immaterial and Missing Power", "IaMP", "Hakurei Shrine 1", 1, 3, 0],
	[1, "Maiden's Capriccio ~ Capriccio",							[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "ZZBRMTMDPu4", "Immaterial and Missing Power", "IaMP", "Hakurei Shrine 2", 1, 3, 0],
	[1, "Love-Coloured Magic",										[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "LCKtSpKxW0A", "Immaterial and Missing Power", "IaMP", "Forest of Magic (Kirisame's House 1)", 1, 3, 0],
	[1, "The Witches' Ball",										[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "KaaqiCtR3qA", "Immaterial and Missing Power", "IaMP", "Forest of Magic (Kirisame's House 2)", 1, 3, 0],
	[1, "The Maid and the Pocket Watch of Blood",					[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "NMfsjDPtAKk", "Immaterial and Missing Power", "IaMP", "Clock Tower of Scarlet Devil Mansion 1", 1, 3, 0],
	[1, "Lunar Clock ~ Lunar Dial",									[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "qrOaDBmZMp8", "Immaterial and Missing Power", "IaMP", "Clock Tower of Scarlet Devil Mansion 2", 1, 3, 0],
	[1, "The Doll Maker of Bucuresti",								[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "U2YhHSfLNFU", "Immaterial and Missing Power", "IaMP", "Forest of Magic (Margatroid's House 1)", 1, 3, 0],
	[1, "Doll Judgment",											[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "sYXtYpwvbC8", "Immaterial and Missing Power", "IaMP", "Forest of Magic (Margatroid's House 2)", 1, 3, 0],
	[1, "Locked Girl ~ Girl's Secret Room",							[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "eT_Rq2VmJVo", "Immaterial and Missing Power", "IaMP", "Great Library in Scarlet Devil Mansion 1", 1, 3, 0],
	[1, "Voile, the Magic Library",									[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "NgN288PsCGk", "Immaterial and Missing Power", "IaMP", "Great Library in Scarlet Devil Mansion 2", 1, 3, 0],
	[1, "Hiroari Shoots a Strange Bird ~ Till When?",				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "j7wrxRHfN0U", "Immaterial and Missing Power", "IaMP", "Graveyard Standing a Big Tree 1", 1, 3, 0],
	[1, "Mystical Oriental Dream ~ Ancient Temple",					[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "UirngDOEBeY", "Immaterial and Missing Power", "IaMP", "Graveyard Standing a Big Tree 2", 1, 3, 0],
	[1, "Septette for a Dead Princess",								[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "yQb_jp3K-xs", "Immaterial and Missing Power", "IaMP", "Lobby in Scarlet Devil Mansion", 1, 3, 0],
	[1, "Bloom Nobly, Ink-Black Cherry Blossom ~ Border of Life",	[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "oVHqgB1eUBk", "Immaterial and Missing Power", "IaMP", "Hakugyokurou", 1, 3, 0],
	[1, "Demystify Feast",											[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "-Kugz6N83-w", "Immaterial and Missing Power", "IaMP", "Hakurei Shrine (Feast Day)", 0, 3, 0],
	[1, "Night Falls ~ Evening Star",								[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "dPMgCFHQY4g", "Immaterial and Missing Power", "IaMP", "Hakurei Shrine (Border)", 0, 3, 1],
	[1, "Oni's Island in the Fairyland ~ Missing Power",			[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "pcobOGPSDz4", "Immaterial and Missing Power", "IaMP", "Gensokyo", 0, 3, 1],
	[1, "End of Summer",											[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "3RXBTFN3QNM", "Immaterial and Missing Power", "IaMP", "Ending", 0, 0, 0],
	[1, "Eastern Memory of Forgathering Dream",						[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "04txi6cUbTQ", "Immaterial and Missing Power", "IaMP", "Credits", 0, 0, 0],
	[1, "Demonic Place",											[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "YCjbs9g8-hM", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "The Moon",													[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "QXXdPHohClU", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Wanderings",												[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "Y9ur75pVI3M", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Inner Heart",												[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "XVKCfBmuZzU", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Intermezzo",												[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "A1n5GJiqPPg", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Eastern Wind",												[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "F1_wzMd-7N0", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Silence",													[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "vwP1BNjp3xA", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Skygazer",													[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "EIJGiDDlDOw", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Solitary Place",											[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "NecJhgL_MVw", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Unexpected Visitor",										[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "6DsJRXb1Sk0", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Scarlet Night",											[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "a9kD12BG58w", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Swift Battle",												[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "rpkL_0L1VMQ", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Bad Omen",													[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "_ag4_sfqkLI", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	[1, "Broken Moon",												[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "LohRYHX.jpg", "l6LcKxjICek", "Immaterial and Missing Power", "IaMP", "Pre-battle", 0, 0, 0],
	
    //Imperishable Night
	[1, "Imperishable Night ~ Eastern Night",						[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "zQe0crwJ36Y", "Imperishable Night", "IN", "Title Screen", 0, 0, 1],
	[1, "Illusionary Night ~ Ghostly Eyes",							[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "FLWkALwp9SA", "Imperishable Night", "IN", "Stage 1", 0, 2, 1],
	[1, "Stirring an Autumn Moon ~ Mooned Insect",					[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "jstx6fQheCE", "Imperishable Night", "IN", "Wriggle Nightbug's theme", 0, 1, 1],
	[1, "Song of the Night Sparrow ~ Night Bird",					[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "28R07cxHXwI", "Imperishable Night", "IN", "Stage 2", 0, 2, 1],
	[1, "Deaf to All but the Song",									[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "hXmQDpTY6io", "Imperishable Night", "IN", "Mystia Lorelei's theme", 0, 1, 1],
	[1, "Nostalgic Blood of the East ~ Old World",					[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "AYcsE2h2pLo", "Imperishable Night", "IN", "Stage 3", 0, 2, 1],
	[1, "Plain Asia",												[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "nNUrFwllEwE", "Imperishable Night", "IN", "Keine Kamishirasawa's theme", 0, 1, 1],
	[1, "Retribution for the Eternal Night ~ Imperishable Night",	[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "nmYnymCcKVw", "Imperishable Night", "IN", "Stage 4", 0, 2, 1],
	[1, "Maiden's Capriccio ~ Dream Battle",						[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "fMdGSTE4-Zk", "Imperishable Night", "IN", "Reimu Hakurei's theme", 0, 1, 1],
	[1, "Love-Colored Master Spark",								[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "7RBJ4NMOBV0", "Imperishable Night", "IN", "Marisa Kirisame's theme", 0, 1, 1],
	[1, "Cinderella Cage ~ Kagome-Kagome",							[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "41rsKG2ZqaQ", "Imperishable Night", "IN", "Stage 5", 0, 2, 1],
	[1, "Lunatic Eyes ~ Invisible Full Moon",						[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "TbYikXsMCH4", "Imperishable Night", "IN", "Reisen Undongein Inaba's theme", 0, 1, 1],
	[1, "Voyage 1969",												[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "dev74ItqMwo", "Imperishable Night", "IN", "Stage 6", 0, 2, 1],
	[1, "Gensokyo Millennium ~ History of the Moon",				[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "v-xhqldl_mw", "Imperishable Night", "IN", "Eirin Yagokoro's theme", 0, 1, 1],
	[1, "Flight of the Bamboo Cutter ~ Lunatic Princess",			[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "4w5s7dwrH7Q", "Imperishable Night", "IN", "Kaguya Houraisan's theme", 0, 1, 1],
	[1, "Voyage 1970",												[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "i7re0DkOD4s", "Imperishable Night", "IN", "Kaguya's Last Word", 0, 1, 1],
	[1, "Extend Ash ~ Hourai Victim",								[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "tPRtnFwouzc", "Imperishable Night", "IN", "Extra Stage", 0, 2, 1],
	[1, "Reach for the Moon, Immortal Smoke",						[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "OOefbCXJ0Sc", "Imperishable Night", "IN", "Fujiwara no Mokou's theme", 0, 1, 1],
	[1, "Evening Primrose",											[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "FGxA6P_2lbI", "Imperishable Night", "IN", "Ending", 0, 0, 1],
	[1, "Eternal Dream ~ Mystical Maple",							[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "YlPcGSp3q_M", "Imperishable Night", "IN", "Staff Roll", 0, 0, 1],
	[1, "Eastern Youkai Beauty",									[0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "n1inkfk.jpg", "ZtS34aPkl-s", "Imperishable Night", "IN", "Last Word", 0, 0, 1],
	
    //Phantasmagoria of Flower View
	[1, "Flower Viewing Mound ~ Higan Retour",							[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "w-zZBPxMFmk", "Phantasmagoria of Flower View", "PoFV", "Title Screen", 0, 0, 1],
	[1, "Spring Lane ~ Colorful Path",									[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "0wNx_C25BYg", "Phantasmagoria of Flower View", "PoFV", "Reimu Hakurei's theme", 0, 1, 1],
	[1, "Oriental Dark Flight",											[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "eEtTy-LEEko", "Phantasmagoria of Flower View", "PoFV", "Marisa Kirisame's theme", 0, 1, 1],
	[1, "Flowering Night",												[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "MA3UERL4Phw", "Phantasmagoria of Flower View", "PoFV", "Sakuya Izayoi's theme", 0, 1, 1],
	[1, "Mystical Oriental Dream ~ Ancient Temple",						[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "IhpD63__R58", "Phantasmagoria of Flower View", "PoFV", "Youmu Konpaku's theme", 1, 1, 1],
	[1, "Lunatic Eyes ~ Invisible Full Moon",							[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "5ZHFhJ_Y_7w", "Phantasmagoria of Flower View", "PoFV", "Reisen Udongein Inaba's theme", 1, 1, 1],
	[1, "Adventure of the Lovestruck Tomboy",							[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "oUQ5IEvnDrE", "Phantasmagoria of Flower View", "PoFV", "Cirno's theme", 1, 1, 1],
	[1, "Ghostly Band ~ Phantom Ensemble",								[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "4psUGgDi8Jw", "Phantasmagoria of Flower View", "PoFV", "Prismriver Sisters' theme", 1, 1, 1],
	[1, "Deaf to All but the Song ~ Flower Mix",						[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "1gsfKFX3MYo", "Phantasmagoria of Flower View", "PoFV", "Mystia Lorelei's theme", 1, 1, 1],
	[1, "White Flag of Usa Shrine",										[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "SUU60xes21w", "Phantasmagoria of Flower View", "PoFV", "Tewi Inaba's theme", 0, 1, 1],
	[1, "Wind God Girl (Short Version)",								[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "pe7_DKzmJts", "Phantasmagoria of Flower View", "PoFV", "Aya Shameimaru's theme", 0, 1, 1],
	[1, "Poison Body ~ Forsaken Doll",									[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "80ax84UepxA", "Phantasmagoria of Flower View", "PoFV", "Medicine Melancholy's theme", 0, 1, 1],
	[1, "Gensokyo, Past and Present ~ Flower Land",						[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "8akLkR5tjcU", "Phantasmagoria of Flower View", "PoFV", "Yuuka Kazami's theme", 0, 1, 1],
	[1, "Higan Retour ~ Riverside View",								[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "eZuC4d-AL1U", "Phantasmagoria of Flower View", "PoFV", "Komachi Onozuka's theme", 0, 1, 1],
	[1, "Eastern Judgement in the Sixtieth Year ~ Fate of Sixty Years",	[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "0kMyTYcmvJw", "Phantasmagoria of Flower View", "PoFV", "Eiki Shiki, Yamaxanadu's theme", 0, 1, 1],
	[1, "The Mound where the Flowers Reflect",							[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "xSAkUwbWSV4", "Phantasmagoria of Flower View", "PoFV", "Pre-Battle Conversation", 0, 0, 1],
	[1, "Mound of Shigan",												[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "B9LGyWeb8m8", "Phantasmagoria of Flower View", "PoFV", "Pre-Boss Conversation", 0, 0, 1],
	[1, "The Flowers Remain in Fantasy",								[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "09-VOC9d2dQ", "Phantasmagoria of Flower View", "PoFV", "Ending", 0, 0, 1],
	[1, "Flower of Soul ~ Another Dream...",							[0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "gWTN7L7xEOY", "Phantasmagoria of Flower View", "PoFV", "Staff Roll", 0, 0, 1],
	
    //Shoot the Bullet
	[1, "Tengu's Notebook ~ Mysterious Note",		[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "X0DDCGf.jpg", "QEYFuuHkcCM", "Shoot the Bullet", "StB", "Title/Menu Screen", 0, 0, 1],
	[1, "Wind Circulation ~ Wind Tour",				[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "X0DDCGf.jpg", "2KaA6kBEHZ0", "Shoot the Bullet", "StB", "Photo theme 1", 0, 2, 1],
	[1, "Tengu Is Watching ~ Black Eyes",			[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "X0DDCGf.jpg", "aGOtmCMEfnU", "Shoot the Bullet", "StB", "Photo theme 2", 0, 2, 1],
	[1, "Sleepless Night of the Eastern Country",	[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "X0DDCGf.jpg", "f7d2ULj8eKo", "Shoot the Bullet", "StB", "Photo theme 3", 0, 2, 1],
	[1, "Retrospective Kyoto",						[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "X0DDCGf.jpg", "J8EPBPQkMQo", "Shoot the Bullet", "StB", "Photo theme 4", 0, 2, 1],
	//[1, "Wind God Girl (Short Version)",			[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "aZAL5nF.jpg", "pe7_DKzmJts", "Phantasmagoria of Flower View", "PoFV", "", 0, 0, 1],
	
    //Mountain of Faith
	[1, "Sealed Gods",												[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "5KzgwA7HJko", "Mountain of Faith", "MoF", "Title Screen", 0, 0, 1],
	[1, "A God That Misses People ~ Romantic Fall",					[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "jJbHpAUcvkE", "Mountain of Faith", "MoF", "Stage 1", 0, 2, 1],
	[1, "Because Princess Inada Is Scolding Me",					[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "_xCsqKGy1ac", "Mountain of Faith", "MoF", "Minoriko Aki's theme", 0, 1, 1],
	[1, "The Road of the Misfortune God ~ Dark Road",				[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "GLbZSIEMXuc", "Mountain of Faith", "MoF", "Stage 2", 0, 2, 1],
	[1, "Dark Side of Fate",										[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "G-jVAHSCc8Y", "Mountain of Faith", "MoF", "Hina Kagiyama's theme", 0, 1, 1],
	[1, "The Gensokyo the Gods Loved",								[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "ryk74x0hRZQ", "Mountain of Faith", "MoF", "Stage 3", 0, 2, 1],
	[1, "Akutagawa Ryuunosuke's \"Kappa\" ~ Candid Friend",			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "1KkcwBE7vx0", "Mountain of Faith", "MoF", "Nitori Kawashiro's theme", 0, 1, 1],
	[1, "Fall of Fall ~ Autumnal Waterfall",						[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "GWNDB1juaeo", "Mountain of Faith", "MoF", "Stage 4", 0, 2, 1],
	[1, "The Youkai Mountain ~ Mysterious Mountain",				[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "b5fNem6GvYA", "Mountain of Faith", "MoF", "Aya Shameimaru's theme", 0, 1, 1],
	[1, "The Primal Scene of Japan the Girl Saw",					[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "PitDLZPaVhA", "Mountain of Faith", "MoF", "Stage 5", 0, 2, 1],
	[1, "Faith Is for the Transient People",						[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "OaqeawuY0r0", "Mountain of Faith", "MoF", "Sanae Kochiya's theme", 0, 1, 1],
	[1, "Cemetery of Onbashira ~ Grave of Being",					[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "x3OcEr8SVqE", "Mountain of Faith", "MoF", "Stage 6", 0, 2, 1],
	[1, "The Venerable Ancient Battlefield ~ Suwa Foughten Field",	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "uXlqR94K0sM", "Mountain of Faith", "MoF", "Kanako Yasaka's theme", 0, 1, 1],
	[1, "Tomorrow Will Be Special, Yesterday Was Not",				[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "K1DKgwJgXCE", "Mountain of Faith", "MoF", "Extra Stage", 0, 2, 1],
	[1, "Native Faith",												[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "gkUOMWuENwE", "Mountain of Faith", "MoF", "Suwako Moriya's theme", 0, 1, 1],
	[1, "Shrine at the Foot of the Mountain",						[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "iuYOY3lbJU8", "Mountain of Faith", "MoF", "Ending", 0, 0, 1],
	[1, "The Gods Give Us Blessed Rain ~ Sylphid Dream",			[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "PeYZ7eIcKJg", "Mountain of Faith", "MoF", "Staff Roll", 0, 0, 1],
	[1, "Player's Score",											[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "l6dCMV-le_E", "Mountain of Faith", "MoF", "Score", 0, 0, 1],
	
    //Scarlet Weather Rhapsody
	[1, "Sky of Scarlet Perception",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "CfHAH2LNI4s", "Scarlet Weather Rhapsody", "SWR", "Title Screen", 0, 0, 0],
	[1, "Usual Days",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "oxQ3nT9MvdU", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle", 0, 0, 0],
	[1, "The Ground's Color is Yellow",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "4Vjc_lfbVkA", "Scarlet Weather Rhapsody", "SWR", "Ruined Hakurei Shrine", 0, 0, 0],
	[1, "Argue for and Against",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "7SbWO3tMaHE", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle", 0, 0, 0],
	[1, "Beautiful Nature Sight",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "h6l6-1mg0Ck", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle", 0, 0, 0],
	[1, "Fragrant Plants",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "rdaJdg1QUp8", "Scarlet Weather Rhapsody", "SWR", "Forest of Magic", 0, 0, 0],
	[1, "Dancing Water Spray",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "OOPUkfDj8bs", "Scarlet Weather Rhapsody", "SWR", "Genbu Ravine", 0, 0, 0],
	[1, "Swing a Fish to Drive Away Flies",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "3E1fdRdSVuc", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle", 0, 0, 0],
	[1, "Drunk as I Like",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "NyJqz8p2Kqo", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle", 0, 0, 0],
	[1, "Ridiculous Game",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "__P3Pxku618", "Scarlet Weather Rhapsody", "SWR", "Youkai Mountain", 0, 0, 0],
	[1, "Free and Easy",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "vZ4LxD2yzpQ", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle", 0, 0, 0],
	[1, "Skies Beyond the Clouds",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "mkziV4fQy2Y", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle (Iku)", 0, 0, 0],
	[1, "Crimson in the Black Sea ~ Legendary Fish",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "JibWhc5kFrM", "Scarlet Weather Rhapsody", "SWR", "Iku Nagae's theme", 0, 3, 1],
	[1, "Flawless Clothing of the Celestials",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "3e2_ibyXEIE", "Scarlet Weather Rhapsody", "SWR", "Pre-Battle (Tenshi)", 0, 0, 0],
	[1, "Catastrophe in Bhavaagra ~ Wonderful Heaven",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "JVuHxCCtL9I", "Scarlet Weather Rhapsody", "SWR", "Tenshi Hinanawi's theme", 0, 3, 1],
	[1, "Bhavaagra As Seen Through a Child's Mind",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "FFLOT2pO3NE", "Scarlet Weather Rhapsody", "SWR", "Tenshi's Last Spell", 0, 1, 1],
	[1, "Darkening Dusk",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "agodsqKRr38", "Scarlet Weather Rhapsody", "SWR", "Ending", 0, 0, 0],
	[1, "Eastern Sky of Scarlet Perception",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "MglR2bWzl9w", "Scarlet Weather Rhapsody", "SWR", "Staff Roll", 0, 0, 0],
	[1, "Eastern Mystical Love Consultation",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "EhQwOE4GBgk", "Scarlet Weather Rhapsody", "SWR", "Reimu Hakurei's theme", 1, 3, 0],
	[1, "Vessel of Stars ~ Casket of Star",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "jcDGRur1oiY", "Scarlet Weather Rhapsody", "SWR", "Marisa Kirisame's theme", 1, 3, 0],
	[1, "Flowering Night",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "Fzje-8_zIDs", "Scarlet Weather Rhapsody", "SWR", "Sakuya Izayoi's theme", 1, 3, 0],
	[1, "The Doll Maker of Bucuresti",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "yejjmssrgjQ", "Scarlet Weather Rhapsody", "SWR", "Alice Margatroid's theme", 1, 3, 0],
	[1, "Hiroari Shoots a Strange Bird ~ Till When?",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "LS6paQA-5ik", "Scarlet Weather Rhapsody", "SWR", "Youmu Konpaku's theme", 1, 3, 0],
	[1, "Locked Girl ~ The Girl's Secret Room",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "7OzrAI66o-4", "Scarlet Weather Rhapsody", "SWR", "Patchouli Knowledge's theme", 1, 3, 0],
	[1, "Bloom Nobly, Ink-Black Cherry Blossom ~ Border of Life",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "tlhxImY0WaY", "Scarlet Weather Rhapsody", "SWR", "Yuyuko Saigyouji's theme", 1, 3, 0],
	[1, "Septette for a Dead Princess",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "TNkYgXNRQMM", "Scarlet Weather Rhapsody", "SWR", "Remilia Scarlet's theme", 1, 3, 0],
	[1, "Night Falls",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "frESbJIQAak", "Scarlet Weather Rhapsody", "SWR", "Yukari Yakumo's theme", 1, 3, 0],
	[1, "Broken Moon",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "jXIy17nhPUU", "Scarlet Weather Rhapsody", "SWR", "Suika Ibuki's theme", 1, 3, 0],
	[1, "Lunatic Eyes ~ Invisible Full Moon",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "f28Hr59IVyw", "Scarlet Weather Rhapsody", "SWR", "Reisen Udongein Inaba's theme", 1, 3, 0],
	[1, "Wind God Girl",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "dkVOs4Rm5HI", "Scarlet Weather Rhapsody", "SWR", "Aya Shameimaru's theme", 1, 3, 0],
	[1, "Higan Retour ~ Riverside View",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "lPfb9OtWdVs", "Scarlet Weather Rhapsody", "SWR", "Komachi Onozuka's theme", 1, 3, 0],
	
    //Subterranean Animism
	[1, "Awakening of the Earth Spirits",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "whxZaFwIbvc", "Subterranean Animism", "SA", "Title Screen", 0, 0, 1],
	[1, "The Dark Blowhole",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "c7WhJta1_sw", "Subterranean Animism", "SA", "Stage 1", 0, 2, 1],
	[1, "The Sealed-Away Youkai ~ Lost Place",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "E8w3bzmwYdo", "Subterranean Animism", "SA", "Yamame Kurodani's theme", 0, 1, 1],
	[1, "The Bridge People No Longer Cross",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "s1BMuY26KO4", "Subterranean Animism", "SA", "Stage 2", 0, 2, 1],
	[1, "Green-Eyed Jealousy",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "DVM92Yi2fNo", "Subterranean Animism", "SA", "Parsee Mizuhashi's theme", 0, 1, 1],
	[1, "Walking the Streets of a Former Hell",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "M4T0Bg6AfTQ", "Subterranean Animism", "SA", "Stage 3", 0, 2, 1],
	[1, "A Flower-Studded Sake Dish on Mt. Ooe",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "h1e-1c9jy3s", "Subterranean Animism", "SA", "Yuugi Hoshiguma's theme", 0, 1, 1],
	[1, "Heartfelt Fancy",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "aKZ-CJanUyE", "Subterranean Animism", "SA", "Stage 4", 0, 2, 1],
	[1, "Satori Maiden ~ 3rd eye",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "WjpVUq7S0qY", "Subterranean Animism", "SA", "Satori Komeiji's theme", 0, 1, 1],
	[1, "Lullaby of Deserted Hell",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "rMTsG_KszJw", "Subterranean Animism", "SA", "Stage 5", 0, 2, 1],
	[1, "Corpse Voyage ~ Be of good cheer!",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "ct_Vs6LtJ4w", "Subterranean Animism", "SA", "Rin Kaenbyou's theme", 0, 1, 1],
	[1, "Hellfire Mantle",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "uks26L3B7_o", "Subterranean Animism", "SA", "Stage 6", 0, 2, 1],
	[1, "Solar Sect of Mystic Wisdom ~ Nuclear Fusion",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "X0za2oBSSnU", "Subterranean Animism", "SA", "Utsuho Reiuji's theme", 0, 1, 1],
	[1, "Last Remote",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "l9EMy27VfrY", "Subterranean Animism", "SA", "Extra Stage", 0, 2, 1],
	[1, "Hartmann's Youkai Girl",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "7wEHo_uUgZ0", "Subterranean Animism", "SA", "Koishi Komeiji's theme", 0, 1, 1],
	[1, "The Earth Spirits' Homecoming",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "Bf8wcOYctqA", "Subterranean Animism", "SA", "Ending", 0, 0, 1],
	[1, "Energy Daybreak ~ Future Dream...",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "B1vVgeE.jpg", "Ruy9z2NsAmo", "Subterranean Animism", "SA", "Staff Roll", 0, 0, 1],
	//[1, "Player's Score",								[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "7jrqZShXtZw", "Mountain of Faith", "MoF", "", 0, 0, 1],
	
    //Touhou Hisoutensoku
	[1, "Did You See that Shadow?",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "CSluXtLcCyM", "Touhou Hisoutensoku", "Soku", "Title Screen", 0, 0, 0],
	[1, "Memory of Forgathering Dream",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "-2x22OF5Ukg", "Touhou Hisoutensoku", "Soku", "VS Select", 0, 0, 0],
	[1, "The Legendary Titan",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "WOkTovDr2bg", "Touhou Hisoutensoku", "Soku", "Pre-Battle", 0, 0, 0],
	[1, "Our Hisoutensoku",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "T81sNW5X2c4", "Touhou Hisoutensoku", "Soku", "Pre-Battle", 0, 0, 0],
	[1, "The Scenery of Living Dolls",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "8ojaEhrOV74", "Touhou Hisoutensoku", "Soku", "Pre-Battle", 0, 0, 0],
	[1, "The Eternal Steam Engine",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "ZjG7vogWRJQ", "Touhou Hisoutensoku", "Soku", "Staff Roll", 0, 0, 0],
	[1, "Faith Is for the Transient People",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "LlN943QPSQw", "Touhou Hisoutensoku", "Soku", "Sanae Kochiya's theme", 1, 3, 0],
	[1, "Tomboyish Girl in Love",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "WnVltopWrfY", "Touhou Hisoutensoku", "Soku", "Cirno's theme", 1, 3, 0],
	[1, "Shanghai Teahouse ~ Chinese Tea",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "-AqYJCU98Qg", "Touhou Hisoutensoku", "Soku", "Hong Meiling's theme", 1, 3, 0],
	[1, "Solar Sect of Mystic Wisdom ~ Nuclear Fusion",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "w3exZfL6LbY", "Touhou Hisoutensoku", "Soku", "Utsuho Reiuji's theme", 1, 3, 0],
	[1, "Tomorrow Will Be Special, Yesterday Was Not",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "d0dfD_JYnTE", "Touhou Hisoutensoku", "Soku", "Suwako Moriya's theme", 1, 3, 0],
	[1, "Unknown X ~ Unfound Adventure",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "RVQsi0ES6UY", "Touhou Hisoutensoku", "Soku", "CPU Last Stage", 0, 3, 1],
	[1, "X, the Floating Object in the Sky",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "KCeJmqL85tw", "Touhou Hisoutensoku", "Soku", "Sanae vs Suwako", 0, 3, 1],
	[1, "Dichromatic Lotus Butterfly ~ Ancients",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "63cZfzGd0GY", "Touhou Hisoutensoku", "Soku", "Reimu Hakurei's theme", 1, 3, 0],
	[1, "Love-Coloured Magic",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "jpfAQxl83mQ", "Touhou Hisoutensoku", "Soku", "Marisa Kirisame's theme", 1, 3, 0],
	[1, "the Grimoire of Alice",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "SO0xo8Go824", "Touhou Hisoutensoku", "Soku", "Alice Margatroid's theme", 1, 3, 0],
	[1, "Voile, the Magic Library",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "a660fhaF08s", "Touhou Hisoutensoku", "Soku", "Patchouli Knowledge's theme", 1, 3, 0],
	[1, "Eastern Mystical Love Consultation (Century's End Version)",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sRB3UDY.jpg", "TuU-Se7GFnI", "Touhou Hisoutensoku", "Soku", "Reimu's Instant Kill theme", 1, 0, 0],
	//[1, "Sky of Scarlet Perception",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "CfHAH2LNI4s", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Usual Days",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "oxQ3nT9MvdU", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "The Ground's Color is Yellow",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "4Vjc_lfbVkA", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Argue for and Against",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "7SbWO3tMaHE", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Beautiful Nature Sight",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "h6l6-1mg0Ck", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Fragrant Plants",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "rdaJdg1QUp8", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Dancing Water Spray",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "OOPUkfDj8bs", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Swing a Fish to Drive Away Flies",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "3E1fdRdSVuc", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Drunk as I Like",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "NyJqz8p2Kqo", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Ridiculous Game",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "__P3Pxku618", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Free and Easy",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "vZ4LxD2yzpQ", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Skies Beyond the Clouds",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "mkziV4fQy2Y", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Crimson in the Black Sea ~ Legendary Fish",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "JibWhc5kFrM", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 1, 0],
	//[1, "Flawless Clothing of the Celestials",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "3e2_ibyXEIE", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Catastrophe in Bhavaagra ~ Wonderful Heaven",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "JVuHxCCtL9I", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 1, 0],
	//[1, "Bhavaagra As Seen Through a Child's Mind",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "FFLOT2pO3NE", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 1, 0],
	//[1, "Darkening Dusk",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "agodsqKRr38", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Eastern Sky of Scarlet Perception",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "MglR2bWzl9w", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Eastern Mystical Love Consultation",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "EhQwOE4GBgk", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Vessel of Stars ~ Casket of Star",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "jcDGRur1oiY", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Flowering Night",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "Fzje-8_zIDs", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "The Doll Maker of Bucuresti",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "yejjmssrgjQ", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Hiroari Shoots a Strange Bird ~ Till When?",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "LS6paQA-5ik", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Locked Girl ~ The Girl's Secret Room",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "7OzrAI66o-4", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Bloom Nobly, Ink-Black Cherry Blossom ~ Border of Life",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "tlhxImY0WaY", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Septette for a Dead Princess",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "TNkYgXNRQMM", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Night Falls",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "frESbJIQAak", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Broken Moon",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "jXIy17nhPUU", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Lunatic Eyes ~ Invisible Full Moon",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "f28Hr59IVyw", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Wind God Girl",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "dkVOs4Rm5HI", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	//[1, "Higan Retour ~ Riverside View",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9mxFAor.jpg", "lPfb9OtWdVs", "Scarlet Weather Rhapsody", "SWR", "", 0, 0, 0, 0],
	
    //Undefined Fantastic Object
	[1, "A Shadow in the Blue Sky",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "oDclLE_9z8M", "Undefined Fantastic Object", "UFO", "Title Screen", 0, 0, 1],
	[1, "At the End of Spring",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "w0PDKhGGTJo", "Undefined Fantastic Object", "UFO", "Stage 1", 0, 2, 1],
	[1, "A Tiny, Tiny, Clever Commander",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "DiySSc2Yrhg", "Undefined Fantastic Object", "UFO", "Nazrin's theme", 0, 1, 1],
	[1, "The Sealed Cloud Route",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "n-rrsTprKas", "Undefined Fantastic Object", "UFO", "Stage 2", 0, 2, 1],
	[1, "Beware the Umbrella Left There Forever",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "pEB3OQs55Og", "Undefined Fantastic Object", "UFO", "Kogasa Tatara's theme", 0, 1, 1],
	[1, "Sky Ruin",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "4pH4sZw0Hkg", "Undefined Fantastic Object", "UFO", "Stage 3", 0, 2, 1],
	[1, "The Traditional Old Man and the Stylish Girl",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "QhD4rg-Rvmc", "Undefined Fantastic Object", "UFO", "Ichirin Kumoi and Unzan's theme", 0, 1, 1],
	[1, "Interdimensional Voyage of a Ghostly Passenger Ship",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "2RCJFjziC6Y", "Undefined Fantastic Object", "UFO", "Stage 4", 0, 2, 1],
	[1, "Captain Murasa",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "XfuZEXMzhso", "Undefined Fantastic Object", "UFO", "Minamitsu Murasa's theme", 0, 1, 1],
	[1, "Rural Makai City Esoteria",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "fvQX04YzjVE", "Undefined Fantastic Object", "UFO", "Stage 5", 0, 2, 1],
	[1, "The Tiger-Patterned Bishamonten",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "e5wrVuPMVR0", "Undefined Fantastic Object", "UFO", "Shou Toramaru's theme", 0, 1, 1],
	[1, "Fires of Hokkai",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "zzW6scMJz98", "Undefined Fantastic Object", "UFO", "Stage 6", 0, 2, 1],
	[1, "Emotional Skyscraper ~ Cosmic Mind",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "qhlXhaS3OkU", "Undefined Fantastic Object", "UFO", "Byakuren Hijiri's theme", 0, 1, 1],
	[1, "UFO Romance in the Night Sky",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "Ie06WIvssnw", "Undefined Fantastic Object", "UFO", "Extra Stage", 0, 2, 1],
	[1, "Heian Alien",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "qbMPHa-ncZk", "Undefined Fantastic Object", "UFO", "Nue Houjuu's theme", 0, 1, 1],
	[1, "Youkai Temple",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "ioR-AXXOY6s", "Undefined Fantastic Object", "UFO", "Ending", 0, 0, 1],
	[1, "Returning Home From the Sky ~ Sky Dream",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "1idQrK8.jpg", "N3nec9I10tA", "Undefined Fantastic Object", "UFO", "Staff Roll", 0, 0, 1],
	//[1, "Player's Score",										[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "7jrqZShXtZw", "Mountain of Faith", "MoF", "", 0, 0],
	
    //Double Spoiler
	[1, "Newshound",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "SY3nx2Y.jpg", "eCVFE0XUOHc", "Double Spoiler", "DS", "Title/Menu Screen", 0, 0, 1],
	[1, "The Mystery in Your Town",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "SY3nx2Y.jpg", "drGpzeLP9AU", "Double Spoiler", "DS", "Photo Theme 1", 0, 2, 1],
	[1, "Youkai Modern Colony",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "SY3nx2Y.jpg", "cgm_c5H2CTw", "Double Spoiler", "DS", "Photo Theme 2", 0, 2, 1],
	[1, "Nemesis' Stronghold",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "SY3nx2Y.jpg", "QtZgna7ItTE", "Double Spoiler", "DS", "Photo Theme 3", 0, 2, 1],
	[1, "Bell of Avici ~ Infinite Nightmare",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "SY3nx2Y.jpg", "oING_ik7sVc", "Double Spoiler", "DS", "Photo Theme 4", 0, 2, 1],
	[1, "The Youkai Mountain ~ Mysterious Mountain",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "SY3nx2Y.jpg", "r_4z2uK2p70", "Double Spoiler", "DS", "Photo Theme 5", 1, 2, 1],
	[1, "Congratulation Screen",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "SY3nx2Y.jpg", "g6hgWI5lCG4", "Double Spoiler", "DS", "Congratulation Screen", 0, 0, 1],
	
    //Great Fairy Wars
	[1, "An Ice Fairy in Spring",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "G_HuSIsYiOs", "Great Fairy Wars", "GFW", "Title Screen", 0, 0, 1],
	[1, "The Refrain of the Lovely Great War",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "yHlbViNW-eI", "Great Fairy Wars", "GFW", "Stage 1", 0, 2, 1],
	[1, "Staking Your Life on a Prank",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "Sf0weS6_iuM", "Great Fairy Wars", "GFW", "Stage 1/2 Boss", 0, 1, 1],
	[1, "Year-Round Absorbed Curiosity",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "SQL69b7_5Qs", "Great Fairy Wars", "GFW", "Stage 2", 0, 2, 1],
	[1, "A Midnight Fairy Dance",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "-GQPIWfCBvk", "Great Fairy Wars", "GFW", "Stage 3", 0, 2, 1],
	[1, "Great Fairy Wars ~ Fairy Wars",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "qZkJDJO8f8c", "Great Fairy Wars", "GFW", "The Three Fairies' theme", 0, 1, 1],
	[1, "Loose Rain",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "0WzALopXC84", "Great Fairy Wars", "GFW", "Extra Stage", 0, 2, 1],
	[1, "Magus Night",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "LI1gNmUnD_M", "Great Fairy Wars", "GFW", "Marisa Kirisame's theme", 0, 1, 1],
	[1, "An Ice Fairy in Spring - Still -",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "NHoquwHU2v4", "Great Fairy Wars", "GFW", "Ending", 0, 0, 1],
	[1, "Player's Score",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1], "NqI4Bym.jpg", "OJ5vmLeq1r4", "Great Fairy Wars", "GFW", "Score", 1, 0, 1],
	
    //Ten Desires
	[1, "Spirit of Avarice",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "_s53iSvSeso", "Ten Desires", "TD", "Title Screen", 0, 0, 1],
	[1, "Night Sakura of Dead Spirits",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "TZ_r-Fwl4kA", "Ten Desires", "TD", "Stage 1", 0, 2, 1],
	[1, "Ghost Lead",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "3l7jAAORxZs", "Ten Desires", "TD", "Yuyuko Saigyouji's theme", 0, 1, 1],
	[1, "Welcome to Youkai Temple",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "Ctn-ng3_O84", "Ten Desires", "TD", "Stage 2", 0, 2, 1],
	[1, "Youkai Girl at the Gate",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "moaXUZIBLNg", "Ten Desires", "TD", "Kyouko Kasodani's theme", 0, 1, 1],
	[1, "Let’s Live in a Lovely Cemetery",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "zpfzXsB2UPo", "Ten Desires", "TD", "Stage 3", 0, 2, 1],
	[1, "Rigid Paradise",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "vaw8WyORAZY", "Ten Desires", "TD", "Yoshika Miyako's theme", 0, 1, 1],
	[1, "Desire Drive",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "jHbGKNLKr8A", "Ten Desires", "TD", "Stage 4", 0, 2, 1],
	[1, "Old Yuanxian",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "K96VIem5os4", "Ten Desires", "TD", "Seiga Kaku's theme", 0, 1, 1],
	[1, "The Hall of Dreams' Great Mausoleum",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "IUKsMBN7dS4", "Ten Desires", "TD", "Stage 5", 0, 2, 1],
	[1, "Legend of the Great Gods",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "POUxrKNkbA4", "Ten Desires", "TD", "Mononobe no Futo's theme", 0, 1, 1],
	[1, "Starry Sky of Small Desires",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "FPpwwPYgoAc", "Ten Desires", "TD", "Stage 6", 0, 2, 1],
	[1, "Shoutoku Legend ~ True Administrator",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "Ykyz5tcJ-NE", "Ten Desires", "TD", "Toyosatomimi no Miko's theme", 0, 1, 1],
	[1, "Youkai Back Shrine Road",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "9YrLegahyTE", "Ten Desires", "TD", "Extra Stage", 0, 2, 1],
	[1, "Futatsuiwa from Sado",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "F-mrUZIMTbU", "Ten Desires", "TD", "Mamizou Futatsuiwa's theme", 0, 1, 1],
	[1, "A New Wind at the Shrine",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "NSZRXeTX9yc", "Ten Desires", "TD", "Ending", 0, 0, 1],
	[1, "Desire Dream",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "PWk-2HLhE_M", "Ten Desires", "TD", "Staff Roll", 0, 0, 1],
	//[1, "Player's Score",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "t3hBNsqiwL8", "Great Fairy Wars", "GFW", "", 0, 0, 1],
	
    //Hopeless Masquerade
	[1, "This Dull World's Unchanging Pessimism",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "3t1aJTxYZ7A", "Hopeless Masquerade", "HM", "Intro", 0, 0, 0],
	[1, "Shinkirou Orchestra",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "Q4uUgwHgX-I", "Hopeless Masquerade", "HM", "Title Screen", 0, 0, 0],
	[1, "A Popular Location",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "zNd8kuINaV8", "Hopeless Masquerade", "HM", "Pre-Battle", 0, 0, 0],
	[1, "An Unpopular Location",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "orDWNaCADzw", "Hopeless Masquerade", "HM", "Pre-Battle", 0, 0, 0],
	[1, "Today's Front-Page Headline",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "O8jF3ZKDc0g", "Hopeless Masquerade", "HM", "Post-Battle", 0, 0, 0],
	[1, "Spring Lane ~ Colorful Path",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "XGsz9PpHVu4", "Hopeless Masquerade", "HM", "Reimu Hakurei's theme", 1, 3, 0],
	[1, "Magus Night",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "8dHMVmhBogk", "Hopeless Masquerade", "HM", "Marisa Kirisame's theme", 1, 3, 0],
	[1, "The Traditional Old Man and the Stylish Girl",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "kAU8NLP0Ybs", "Hopeless Masquerade", "HM", "Ichirin Kumoi and Unzan's theme", 1, 3, 0],
	[1, "Emotional Skyscraper ~ Cosmic Mind",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "z8zL4e_WpZM", "Hopeless Masquerade", "HM", "Byakuren Hijiri's theme", 1, 3, 0],
	[1, "Legend of the Great Gods",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "Jdr07jW4D4c", "Hopeless Masquerade", "HM", "Mononobe no Futo's theme", 1, 3, 0],
	[1, "Shoutoku Legend ~ True Administrator",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "fh0EXEHUeY8", "Hopeless Masquerade", "HM", "Toyosatomimi no Miko's theme", 1, 3, 0],
	[1, "Akutagawa Ryuunosuke's \"Kappa\" ~ Candid Friend",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "-Pg9BHu7oTY", "Hopeless Masquerade", "HM", "Nitori Kawashiro's theme", 1, 3, 0],
	[1, "Hartmann's Youkai Girl",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "DPD70Y3SRCQ", "Hopeless Masquerade", "HM", "Koishi Komeiji's theme", 1, 3, 0],
	[1, "Futatsuiwa from Sado",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "9r5yV9OKHcc", "Hopeless Masquerade", "HM", "Mamizou Futatsuiwa's theme (disguised)", 1, 0],
	[1, "Futatsuiwa from Gensokyo",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "lSGOj5-PnJA", "Hopeless Masquerade", "HM", "Mamizou Futatsuiwa's theme", 1, 3, 1],
	[1, "The Village in the Dead of Night",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "qHP_ING9dEY", "Hopeless Masquerade", "HM", "Pre-Battle (Kokoro)", 0, 0, 0],
	[1, "The Lost Emotion",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "xZOnG5vAj60", "Hopeless Masquerade", "HM", "Hata no Kokoro's theme", 0, 3, 1],
	[1, "Morning Clouds",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "SgS8YdFHnTM", "Hopeless Masquerade", "HM", "Ending", 0, 0, 0],
	[1, "Officially-Sanctioned Twilight Newspaper",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "L2VS3IbiJeg", "Hopeless Masquerade", "HM", "Staff Roll", 0, 0, 0],
	[1, "Performer Selection",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "XgdP4f7Dhvs", "Hopeless Masquerade", "HM", "Character Select", 0, 0, 0],
	[1, "Last Word Unleashed",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "goVagPC.jpg", "h1IOvgXuW3U", "Hopeless Masquerade", "HM", "Last Word", 0, 0, 0],
	
    //Double Dealing Character
	[1, "Mysterious Purification Rod",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "wUHyG9XqOMI", "Double Dealing Character", "DDC", "Title Screen", 0, 0, 1],
	[1, "Mist Lake",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "bodys69FTEk", "Double Dealing Character", "DDC", "Stage 1", 0, 2, 1],
	[1, "Mermaid from the Uncharted Land",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "9NPCvdyoYcQ", "Double Dealing Character", "DDC", "Wakasagihime's theme", 0, 1, 1],
	[1, "Humans and Youkai Traversing the Canal",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "SNanbLgCK-Y", "Double Dealing Character", "DDC", "Stage 2", 0, 2, 1],
	[1, "Dullahan Under the Willows",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "0smPNpVHOH8", "Double Dealing Character", "DDC", "Sekibanki's theme", 0, 1, 1],
	[1, "Bamboo Forest of the Full Moon",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "5ICZ0AAgDuA", "Double Dealing Character", "DDC", "Stage 3", 0, 2, 1],
	[1, "Lonesome Werewolf",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "23bGDZx2OPU", "Double Dealing Character", "DDC", "Kagerou Imaizumi's theme", 0, 1, 1],
	[1, "Magical Storm",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "FOBZcqnyqFs", "Double Dealing Character", "DDC", "Stage 4", 0, 2, 1],
	[1, "Illusionary Joururi",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "ge71HoKN_0s", "Double Dealing Character", "DDC", "Benben/Yatsuhashi Tsukumo's theme", 0, 1, 1],
	[1, "The Shining Needle Castle Sinking in the Air",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "v8xtmqN6jpc", "Double Dealing Character", "DDC", "Stage 5", 0, 2, 1],
	[1, "Reverse Ideology",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "hYcb854qGx0", "Double Dealing Character", "DDC", "Seija Kijin's theme", 0, 1, 1],
	[1, "The Exaggerated Castle Keep",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "BTRQaASsw5U", "Double Dealing Character", "DDC", "Stage 6", 0, 2, 1],
	[1, "Inchlings of the Shining Needle ~ Little Princess",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "jv1yYDzvFtQ", "Double Dealing Character", "DDC", "Shinmyoumaru Sukuna's theme", 0, 1, 1],
	[1, "Thunderclouds of Magical Power",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "OMU4asgN9ZY", "Double Dealing Character", "DDC", "Extra Stage", 0, 2, 1],
	[1, "Primordial Beat ~ Pristine Beat",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "ioQLlX2ELbg", "Double Dealing Character", "DDC", "Raiko Horikawa's theme", 0, 1, 1],
	[1, "Magical Power of the Mallet",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "VAdcF2IdyZY", "Double Dealing Character", "DDC", "Ending", 0, 0, 1],
	[1, "Strange, Strange Instruments",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "-YVCLjnMK6E", "Double Dealing Character", "DDC", "Staff Roll", 0, 0, 1],
	//[1, "Player's Score",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "t3hBNsqiwL8", "Great Fairy Wars", "GFW", "", 0, 0, 1],
	
    //Impossible Spell Card
	[1, "Raise the Signal Fire of Cheating",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sN4EeZI.jpg", "PM0X913-T3Q", "Impossible Spell Card", "ISC", "Title/Menu Screen", 0, 0, 1],
	[1, "Cheat Against the Impossible Danmaku",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sN4EeZI.jpg", "qYtg2kI3F-E", "Impossible Spell Card", "ISC", "Stage Theme 1", 0, 2, 1],
	[1, "Midnight Spell Card",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sN4EeZI.jpg", "Tz8_GcGzOoM", "Impossible Spell Card", "ISC", "Stage Theme 2", 0, 2, 1],
	[1, "Romantic Escape Flight",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sN4EeZI.jpg", "xFgVAJ9xyoY", "Impossible Spell Card", "ISC", "Stage Theme 3", 0, 2, 1],
	[1, "Eternal Short-Lived Reign",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "sN4EeZI.jpg", "SIpfrZVGtqk", "Impossible Spell Card", "ISC", "Stage Theme 4", 0, 2, 1],
	//[1, "Mermaid from the Uncharted Land",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "9NPCvdyoYcQ", "Double Dealing Character", "DDC", "", 0, 0, 1],
	//[1, "Illusionary Joururi",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "ge71HoKN_0s", "Double Dealing Character", "DDC", "", 0, 0, 1],
	//[1, "Reverse Ideology",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "mevzzKr.jpg", "hYcb854qGx0", "Double Dealing Character", "DDC", "", 0, 0, 1],
	//[1, "The Youkai Mountain ~ Mysterious Mountain",	[0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "c3yK3I6.jpg", "b5fNem6GvYA", "Mountain of Faith", "MoF", "", 0, 0, 1],
	
    //Dolls in Pseudo Paradise
	[1, "Legend of Hourai",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "FgyIpysqOxE", "Dolls in Pseudo Paradise", "DiPP", "Track 1", 0, 0, 1],
	[1, "Dichromatic Lotus Butterfly ~ Red and White",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "3bS0Y2if3wU", "Dolls in Pseudo Paradise", "DiPP", "Track 2", 0, 0, 1],
	[1, "Lovely Mound of Cherry Blossoms ~ Japanese Flower",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "-lWg0EIkP3w", "Dolls in Pseudo Paradise", "DiPP", "Track 3", 1, 0, 1],
	[1, "Shanghai Alice of Meiji 17",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "5YpgO6cPSc0", "Dolls in Pseudo Paradise", "DiPP", "Track 4", 1, 0, 1],
	[1, "Eastern Strange Discourse",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "H_U-h0M7vb0", "Dolls in Pseudo Paradise", "DiPP", "Track 5", 1, 0, 1],
	[1, "Enigmatic Doll",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "hOBdSxmvH7k", "Dolls in Pseudo Paradise", "DiPP", "Track 6", 1, 0, 1],
	[1, "Circus Reverie",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "YP50vp-M8_Y", "Dolls in Pseudo Paradise", "DiPP", "Track 7", 1, 0, 1],
	[1, "Forest of Dolls",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "A2wo_6E6-lc", "Dolls in Pseudo Paradise", "DiPP", "Track 8", 0, 0, 1],
	[1, "Witch of Love Potion",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "UkZCGQpy4FU", "Dolls in Pseudo Paradise", "DiPP", "Track 9", 0, 0, 1],
	[1, "Reincarnation",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "93_bnOj63xs", "Dolls in Pseudo Paradise", "DiPP", "Track 10", 1, 0, 1],
	[1, "U.N. Owen was Her?",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "c3bWWBMjSQY", "Dolls in Pseudo Paradise", "DiPP", "Track 11", 1, 0, 1],
	[1, "Eternal Shrine Maiden",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "cvfC2iYjkNw", "Dolls in Pseudo Paradise", "DiPP", "Track 12", 1, 0, 1],
	[1, "The Strange Everyday Life of the Flying Shrine Maiden",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "lyAFcV7.jpg", "K77Yvze2xYk", "Dolls in Pseudo Paradise", "DiPP", "Track 13", 0, 0, 1],
	
    //Ghostly Field Club
	[1, "Dying in the Dendera Fields in the Night",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "TkqBfFXvCZ0", "Ghostly Field Club", "GFC", "Track 1", 0, 0, 1],
	[1, "Girls' Sealing Club",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "kAiURYQLCkU", "Ghostly Field Club", "GFC", "Track 2", 0, 0, 1],
	[1, "Eastern Mystical Dream ~ Ancient Temple",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "XvXt8gTH5Ao", "Ghostly Field Club", "GFC", "Track 3", 1, 0, 1],
	[1, "Ancient Temple of the Netherworld",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "V3mdjzwtYgc", "Ghostly Field Club", "GFC", "Track 4", 0, 0, 1],
	[1, "Illusionary Night ~ Ghostly Eyes",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "mtAHoCxRUks", "Ghostly Field Club", "GFC", "Track 5", 1, 0, 1],
	[1, "Merry the Magician",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "EqkJmNe1MP0", "Ghostly Field Club", "GFC", "Track 6", 0, 0, 1],
	[1, "Strange Bird of the Moon, Illusion of the Mysterious Cat",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "sd8UmIR4Po0", "Ghostly Field Club", "GFC", "Track 7", 0, 0, 1],
	[1, "Flower of Past Days ~ Fairy of Flower",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "np1divim63I", "Ghostly Field Club", "GFC", "Track 8", 0, 0, 1],
	[1, "Magical Girl Crusade",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "gEkhCF595HE", "Ghostly Field Club", "GFC", "Track 9", 1, 0, 1],
	[1, "A Maiden's Illusionary Funeral ~ Necro-Fantasy",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "jq6gMC_5OlM", "Ghostly Field Club", "GFC", "Track 10", 1, 0, 1],
	[1, "Eternal Festival of Illusions",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "WYOa3JD.jpg", "xI2fipW9Dw4", "Ghostly Field Club", "GFC", "Track 11", 0, 0, 1],
	
    //Changeability of Strange Dream
	[1, "Kid's Festival ~ Innocent Treasures",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "bTlA_Lfssp0", "Changeability of Strange Dream", "CoSD", "Track 1", 0, 0, 1],
	[1, "Dream of Arcadia",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "CvcPbY5G89Y", "Changeability of Strange Dream", "CoSD", "Track 2", 0, 0, 1],
	[1, "Shanghai Teahouse ~ Chinese Tea",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "DpvgdbxYeFk", "Changeability of Strange Dream", "CoSD", "Track 3", 1, 0, 1],
	[1, "Voyage 1969",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "-2PxNHB9F40", "Changeability of Strange Dream", "CoSD", "Track 4", 1, 0, 1],
	[1, "Boys and Girls of a Science Era",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "hZPjFipvrhg", "Changeability of Strange Dream", "CoSD", "Track 5", 0, 0, 1],
	[1, "Retribution for the Eternal Night ~ Imperishable Night",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "edryhKpcWVQ", "Changeability of Strange Dream", "CoSD", "Track 6", 1, 0, 1],
	[1, "Night Falls ~ Evening Star",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "Ty2wQU3PEoo", "Changeability of Strange Dream", "CoSD", "Track 7", 1, 0, 1],
	[1, "Doll Judgment ~ The Girl who Played with People's Shapes",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "RdCirj77axM", "Changeability of Strange Dream", "CoSD", "Track 8", 1, 0, 1],
	[1, "Border Between Dreams and Reality",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "UvXMicfIr8Q", "Changeability of Strange Dream", "CoSD", "Track 9", 0, 0, 1],
	[1, "Phantasm Machine ~ Phantom Factory",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "BRBEWWPzQiM", "Changeability of Strange Dream", "CoSD", "Track 10", 1, 0, 1],
	[1, "Mystical Maple ~ Eternal Dream",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "OlSof0n.jpg", "XvCulJDjQPI", "Changeability of Strange Dream", "CoSD", "Track 11", 1, 0, 1],
	
    //Retrospective 53 minutes
	[1, "Hiroshige No.36 ~ Neo Super-Express",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "NKs1wYOSBp8", "Retrospective 53 minutes", "R53m", "Track 1", 0, 0, 1],
	[1, "Blue Sea of 53 Minutes",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "6owdOvGC1m0", "Retrospective 53 minutes", "R53m", "Track 2", 0, 0, 1],
	[1, "Bamboo Cutter Flight ~ Lunatic Princess",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "oN8mRWn2yCI", "Retrospective 53 minutes", "R53m", "Track 3", 1, 0, 1],
	[1, "Higan Retour ~ Riverside View",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "W6iRaGr2IBM", "Retrospective 53 minutes", "R53m", "Track 4", 1, 0, 1],
	[1, "Legend of Aokigahara",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "K9lwLau-mbQ", "Retrospective 53 minutes", "R53m", "Track 5", 0, 0, 1],
	[1, "White Flag of Usa Shrine",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "j86PO4cckYc", "Retrospective 53 minutes", "R53m", "Track 6", 1, 0, 1],
	[1, "Reach for the Moon, Immortal Smoke",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "TjvSsgDLGAU", "Retrospective 53 minutes", "R53m", "Track 7", 1, 0, 1],
	[1, "Retrospective Kyoto",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "xAIMCf5XJ_k", "Retrospective 53 minutes", "R53m", "Track 8", 1, 0, 1],
	[1, "Locked Girl ~ The Girl's Secret Room",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "_ZQdzdRlhUc", "Retrospective 53 minutes", "R53m", "Track 9", 1, 0, 1],
	[1, "Gensokyo Millennium ~ History of the Moon",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "sxDLAWXrnD0", "Retrospective 53 minutes", "R53m", "Track 10", 1, 0, 1],
	[1, "The Purest Sky and Sea",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "xCSKFnf.jpg", "e-OvejWVzcQ", "Retrospective 53 minutes", "R53m", "Track 11", 0, 0, 1],
	
    //Magical Astronomy
	[1, "Welcome to the Moon Tour",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "Fl1SfPejxMk", "Magical Astronomy", "MA", "Track 1", 0, 0, 1],
	[1, "Greenwich in the Sky",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "Tab2XwaM-Wg", "Magical Astronomy", "MA", "Track 2", 0, 0, 1],
	[1, "Sleepless Night of the Eastern Country",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "VMRb1X0mfLQ", "Magical Astronomy", "MA", "Track 3", 1, 0, 1],
	[1, "The Wheelchair's Future in Space ",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "7g_8c4SaLaQ", "Magical Astronomy", "MA", "Track 4", 0, 0, 1],
	[1, "Demystify Feast",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "0j1h2qslI3M", "Magical Astronomy", "MA", "Track 5", 1, 0, 1],
	[1, "Satellite Café Terrace",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "6iU31hkpzok", "Magical Astronomy", "MA", "Track 6", 0, 0, 1],
	[1, "G Free",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "kib9js55W-w", "Magical Astronomy", "MA", "Track 7", 0, 0, 1],
	[1, "Celestial Wizardry ~ Magical Astronomy",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "hBOx3PpO_w4", "Magical Astronomy", "MA", "Track 8", 0, 0, 1],
	[1, "Necrofantasia",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "bku_wFW8nPo", "Magical Astronomy", "MA", "Track 9", 1, 0, 1],
	[1, "The Far Side of the Moon",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "gRfj7h7.jpg", "U9NWsGwXc1k", "Magical Astronomy", "MA", "Track 10", 0, 0, 1],
	
    //Unknown Flower, Mesmerizing Journey
	[1, "Unknown Flower, Mesmerizing Journey",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "zlV63ty.jpg", "R1pdzwMotY4", "Unknown Flower, Mesmerizing Journey", "UFMJ", "Track 1", 0, 0, 1],
	[1, "Bell of Avici ~ Infinite Nightmare",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "zlV63ty.jpg", "FN83pkGa8kM", "Unknown Flower, Mesmerizing Journey", "UFMJ", "Track 2", 1, 0, 1],
	[1, "Tomorrow will be Special; Yesterday was Not",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "zlV63ty.jpg", "rHWJcbE6KrI", "Unknown Flower, Mesmerizing Journey", "UFMJ", "Track 3", 1, 0, 1],
	
    //Trojan Green Asteroid
	[1, "Satellite TORIFUNE",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "_P6rXMN4Dzg", "Trojan Green Asteroid", "TGA", "Track 1", 0, 0, 1],
	[1, "Trojan Asteroid Jungle",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "oVmn5fv83Ew", "Trojan Green Asteroid", "TGA", "Track 2", 0, 0, 1],
	[1, "Desire Drive",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "vFj9KEtXwAA", "Trojan Green Asteroid", "TGA", "Track 3", 1, 0, 1],
	[1, "The Fairies' Adventurous Tale",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "TWpd9t1yN9w", "Trojan Green Asteroid", "TGA", "Track 4", 1, 0, 1],
	[1, "Ame-no-torifune Shrine",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "_yJlPj7fv8U", "Trojan Green Asteroid", "TGA", "Track 5", 0, 0, 1],
	[1, "UFO Romance in the Night Sky",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "6EJf5c-_Fes", "Trojan Green Asteroid", "TGA", "Track 6", 1, 0, 1],
	[1, "Hartmann's Youkai Girl",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "VG8pgB76B-Y", "Trojan Green Asteroid", "TGA", "Track 7", 1, 0, 1],
	[1, "The Barrier of Ame-no-torifune Shrine",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "zdNA3Msd36g", "Trojan Green Asteroid", "TGA", "Track 8", 0, 0, 1],
	[1, "Emotional Skyscraper ~ Cosmic Mind",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "kXYavnqayYc", "Trojan Green Asteroid", "TGA", "Track 9", 1, 0, 1],
	[1, "The Gensokyo That Floats in Outer Space",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "9PZySav.png", "hmOSTLbcIoc", "Trojan Green Asteroid", "TGA", "Track 10", 0, 0, 1],
	
    //Neo-traditionalism of Japan
	[1, "Green Sanatorium",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "yE6shlNOxHM", "Neo-traditionalism of Japan", "NToJ", "Track 1", 0, 0, 1],
	[1, "Led On by a Cow to Visit Zenkou Temple",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "cfVNsoaY5Gc", "Neo-traditionalism of Japan", "NToJ", "Track 2", 0, 0, 1],
	[1, "Heartfelt Fancy",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "NZBplMHJals", "Neo-traditionalism of Japan", "NToJ", "Track 3", 1, 0, 1],
	[1, "Eastern Judgement in the Sixtieth Year ~ Fate of Sixty Years",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "ndj-kxQsC1A", "Neo-traditionalism of Japan", "NToJ", "Track 4", 1, 0, 1],
	[1, "Wind of Agartha",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "I7wb8Cmkyow", "Neo-traditionalism of Japan", "NToJ", "Track 5", 0, 0, 1],
	[1, "Izanagi Object",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "0Y2_odHZcts", "Neo-traditionalism of Japan", "NToJ", "Track 6", 0, 0, 1],
	[1, "Youkai Back Shrine Road",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "JRV__-fARMA", "Neo-traditionalism of Japan", "NToJ", "Track 7", 1, 0, 1],
	[1, "Unknown X ~ Unfound Adventure",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "hpyElTsw-bo", "Neo-traditionalism of Japan", "NToJ", "Track 8", 1, 0, 1],
	[1, "Gathering the Mysterious from All Around Japan",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "eLHtB4R1Qbs", "Neo-traditionalism of Japan", "NToJ", "Track 9", 0, 0, 1],
	[1, "Let's Live in a Lovely Cemetery",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], "5ufGjMK.jpg", "Mjggk1D2QDU", "Neo-traditionalism of Japan", "NToJ", "Track 10", 1, 0, 1],
	
    //Book bonus CDs
	[1, "Wind God Girl",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "w9FZqDn.jpg", "5YAstNIBRTk", "Bohemian Archive in Japanese Red", "BAiJR", "Track 1", 1, 0, 1],
	[1, "Adventure of the Lovestruck Tomboy",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "w9FZqDn.jpg", "5jJhBJO-La8", "Bohemian Archive in Japanese Red", "BAiJR", "Track 2", 1, 0, 1],
	[1, "Flower Viewing Mound ~ after Higan Retour",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "w9FZqDn.jpg", "mY_zudHGi_8", "Bohemian Archive in Japanese Red", "BAiJR", "Track 3", 1, 0, 1],
	[1, "Sunny Rutile Flection",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "YfoRCHQ.jpg", "eomgp_aQ4cw", "Eastern and Little Nature Deity/Strange and Bright Nature Deity", "EaLND/SaBND", "Track 1/Album 2 - Track 2", 0, 0, 1],
	[1, "Can't Sleep Because It's Nighttime",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "YfoRCHQ.jpg", "jPR3MP2n2TA", "Eastern and Little Nature Deity/Strange and Bright Nature Deity", "EaLND/SaBND", "Track 2/Album 3 - Track 3", 0, 0, 1],
	[1, "Like the Brilliance of Fairies",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "YfoRCHQ.jpg", "i8MBAPzjQI4", "Eastern and Little Nature Deity/Strange and Bright Nature Deity", "EaLND/SaBND", "Track 3/Album 3 - Track 4", 0, 0, 1],
	[1, "Japanese Saga",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "mu8UUhH.jpg", "jPFCtVHthSs", "Perfect Memento in Strict Sense", "PMiSS", "Track 1", 0, 0, 1],
	[1, "Child of Are",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "mu8UUhH.jpg", "z-PIgOTOTxc", "Perfect Memento in Strict Sense", "PMiSS", "Track 2", 0, 0, 1],
	[1, "Fly above Hatoyama at night - Power MIX",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "mu8UUhH.jpg", "b9mf72VqoO0", "Perfect Memento in Strict Sense", "PMiSS", "Track 3", 0, 0, 1],
	[1, "Sunny Milk's Scarlet Mist Incident",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "SFOcNUCFpGQ", "Strange and Bright Nature Deity", "SaBND", "Album 1 - Track 1", 1, 0, 1],
	[1, "A Land Resplendent With Nature's Beauty",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "PvKuxc28omg", "Strange and Bright Nature Deity", "SaBND", "Album 1 - Track 2", 0, 0, 1],
	[1, "Star Voyage 2008",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "Axr8OyC2iIg", "Strange and Bright Nature Deity", "SaBND", "Album 1 - Track 3", 0, 0, 1],
	[1, "The Refrain of the Lovely Great War",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "5K0Ty9DO2PU", "Strange and Bright Nature Deity", "SaBND", "Album 2 - Track 1", 1, 0, 1],
	//[1, "Sunny Rutile Flection",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "PIfo_Fiseg4", "Strange and Bright Nature Deity", "SaBND", "Album 2 - Track 2", 1, 0, 1],
	//[1, "Can't Sleep Because It's Nighttime",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "6NjWcjNKmDI", "Strange and Bright Nature Deity", "SaBND", "Album 3 - Track 3", 1, 0, 1],
	//[1, "Like the Brilliance of Fairies",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "VO9-mBdGwiY", "Strange and Bright Nature Deity", "SaBND", "Album 3 - Track 4", 1, 0, 1],
	[1, "The Fairy's Adventurous Tale",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "WdG-5Fix88c", "Strange and Bright Nature Deity", "SaBND", "Album 3 - Track 1", 0, 0, 1],
	[1, "Two Worlds",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "MGwqCJo.jpg", "rn0U_OqnNwU", "Strange and Bright Nature Deity", "SaBND", "Album 3 - Track 2", 0, 0, 1],
	[1, "Youkai Space Travel",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "p8GtjLf.jpg", "4iaLqXHt_iI", "Silent Sinner in Blue", "SSiB", "Track 1", 0, 0, 1],
	[1, "Watatsuki's Spell Card ~ Lunatic Blue",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "p8GtjLf.jpg", "yuOkeTMoCgg", "Silent Sinner in Blue", "SSiB", "Track 2", 0, 0, 1],
	[1, "A Drunkard's Lemuria (Retro Ver)",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "p8GtjLf.jpg", "Fa8c84w3Jew", "Silent Sinner in Blue", "SSiB", "Track 3", 0, 0, 1],
	[1, "Magician's Melancholy",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "FI9IsdC.jpg", "0FRm11igVnI", "The Grimoire of Marisa", "GoM", "Track 1", 0, 0, 1],
	[1, "Illusionary Sputnik Night",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "FI9IsdC.jpg", "VP0zySMtw3Y", "The Grimoire of Marisa", "GoM", "Track 2", 1, 0, 1],
	[1, "The Hide-and-Seek Lifestyle at the Shrine",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "Kw2uOqV.jpg", "fJsBj479YSU", "Oriental Sacred Place", "OSP", "Album 1 - Track 1", 0, 0, 1],
	[1, "Youkai Modern Colony",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "Kw2uOqV.jpg", "VDYHmdY5glw", "Oriental Sacred Place", "OSP", "Album 1 - Track 2", 1, 0, 1],
	[1, "Year-Round Absorbed Curiosity",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "Kw2uOqV.jpg", "mPYB_kgzbbc", "Oriental Sacred Place", "OSP", "Album 2 - Track 1", 1, 0, 1],
	[1, "A Midnight Fairy Dance",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "Kw2uOqV.jpg", "YOOQvpMzI_k", "Oriental Sacred Place", "OSP", "Album 2 - Track 2", 1, 0, 1],
	[1, "Great Fairy Wars ~ Fairy Wars",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "Kw2uOqV.jpg", "SY21CBySBYs", "Oriental Sacred Place", "OSP", "Album 2 - Track 3", 1, 0, 1],
	[1, "Magus Night",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "Kw2uOqV.jpg", "bL3KnIqMfAU", "Oriental Sacred Place", "OSP", "Album 3 - Track 1", 1, 0, 1],
	[1, "Staking Your Life on a Prank",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "Kw2uOqV.jpg", "PLsgoWJOJB4", "Oriental Sacred Place", "OSP", "Album 3 - Track 2", 1, 0, 1],
	//[1, "Old Yuanxian",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "QrUdIZd.jpg", "K96VIem5os4", "Ten Desires", "TD", "", 0, 0, 1],
	//Forbidden Scrollery
	[1, "Bibliophile with a Deciphering Eye",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "fs.jpg", "i0Wt3lN7-mk", "Forbidden Scrollery", "FS", "Track 1", 0, 0, 1],
	[1, "Humans and Youkai Traversing the Canal",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "fs.jpg", "m3S9Nsd1puU", "Forbidden Scrollery", "FS", "Track 2", 1, 0, 1],
	[1, "The Rabbit Has Landed",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "fs.jpg", "mxlnkzshWCU", "Forbidden Scrollery", "FS", "Track 3", 1, 0, 1],
	//Daisakusen
	[1, "Every Day a Red Day ~ Folksy Touhou days.",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0], "daisakusen.jpg", "A3g3MgxcVOE", "Touhou Arrange Kasseika Daisakusen", "TAKD", "Track 1", 1, 0, 1],
	
	//Urban Legend in Limbo
	[1, "Heart-Stirring Urban Legends",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "PWhN1akadiQ", "Urban Legend in Limbo", "ULiL", "Title/Menu Screen", 0, 0, 0],
	[1, "Gensokyo Mystery Discovery",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "7TyQzWU6Zz8", "Urban Legend in Limbo", "ULiL", "Character Select", 0, 0, 0],
	[1, "An Everyday Life with Balls",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "z-l-swEawrs", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0, 0],
	[1, "Forms of Manifested Folklore",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "ezoTUNAnXsA", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0, 0],
	[1, "Arrival of the Winds of the Era",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "aM3igpC1I8M", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0, 0],
	[1, "The Value is Unrealized",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "eiFmW1VgFMQ", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0, 0],
	[1, "Believe in Possibilities",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "NoWlXz-QPIE", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0, 0],
	[1, "Occult à la Carte",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "1bidQ3EvCrI", "Urban Legend in Limbo", "ULiL", "Story Mode Battle", 0, 0, 0],
	[1, "Seven-Orb Collection Showdown",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "6VeKSXjBRX0", "Urban Legend in Limbo", "ULiL", "Story Mode Battle", 0, 0, 0],
	[1, "Fair Scramble",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "mV-b8s76GnM", "Urban Legend in Limbo", "ULiL", "Story Mode Battle", 0, 0, 0],
	[1, "Bell of the Antipodes",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "iq3bJ_mEmEY", "Urban Legend in Limbo", "ULiL", "Story Mode Battle", 0, 0, 0],
	[1, "Bamboo Forest in Flames",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "W7DI15alZjE", "Urban Legend in Limbo", "ULiL", "Story Mode Battle", 0, 0, 0],
	[1, "Dichromatic Lotus Butterfly ~ Red and White",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "OJxKztZcF8o", "Urban Legend in Limbo", "ULiL", "Reimu Hakurei's theme", 1, 3, 0],
	[1, "Love-Coloured Master Spark",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "SbinUP3u_U8", "Urban Legend in Limbo", "ULiL", "Marisa Kirisame's theme", 1, 3, 0],
	[1, "The Traditional Old Man and the Stylish Girl",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "iGHFUfEA5qk", "Urban Legend in Limbo", "ULiL", "Ichirin Kumoi and Unzan's theme", 1, 3, 0],
	[1, "Emotional Skyscraper ~ Cosmic Mind",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "ZSeJmWWRWbE", "Urban Legend in Limbo", "ULiL", "Byakuren Hijiri's theme", 1, 3, 0],
	[1, "Legend of the Great Gods",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "VwREK31glRs", "Urban Legend in Limbo", "ULiL", "Mononobe no Futo's theme", 1, 3, 0],
	[1, "Shoutoku Legend ~ True Administrator",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "nlwBI4PNrLE", "Urban Legend in Limbo", "ULiL", "Toyosatomimi no Miko's theme", 1, 3, 0],
	[1, "Akutagawa Ryuunosuke's \"Kappa\" ~ Candid Friend",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "78KFFTC-LI4", "Urban Legend in Limbo", "ULiL", "Nitori Kawashiro's theme", 1, 3, 0],
	[1, "Hartmann's Youkai Girl",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "XCL9yQry_5k", "Urban Legend in Limbo", "ULiL", "Koishi Komeiji's theme", 1, 3, 0],
	[1, "Futatsuiwa from Gensokyo",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "ocJKp-cgL4s", "Urban Legend in Limbo", "ULiL", "Mamizou Futatsuiwa's theme", 1, 3, 0],
	[1, "The Lost Emotion",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "5pYBRxiqG2I", "Urban Legend in Limbo", "ULiL", "Hata no Kokoro's theme", 1, 3, 0],
	[1, "Reach For the Moon, Immortal Smoke",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0], "arjGI4C.jpg?1", "ukPCuDvqxYU", "Urban Legend in Limbo", "ULiL", "Fujiwara no Mokou's theme", 1, 3, 0],
	[1, "Inchlings of the Shining Needle ~ Little Princess",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "pnhMNwaB4wU", "Urban Legend in Limbo", "ULiL", "Shinmyoumaru Sukuna's theme", 1, 3, 0],
	[1, "Those who Know the Truth",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "sjw6_Z6BG6A", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0, 0],
	[1, "Battlefield of Hanahazama",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "fp8hxDtqmR0", "Urban Legend in Limbo", "ULiL", "Kasen Ibaraki's theme/Penultimate Boss", 0, 3, 1],
	[1, "Outside World Folklore",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "MUYyv0tYrSE", "Urban Legend in Limbo", "ULiL", "Pre-Boss", 0, 0, 0],
	[1, "Last Occultism ~ Esotericist of the Present World",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "m2DrKruxJUw", "Urban Legend in Limbo", "ULiL", "Sumireko Usami's theme/Final Boss", 0, 3, 1],
	[1, "Each Ending",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "zEYTIjJkyZM", "Urban Legend in Limbo", "ULiL", "Ending", 0, 0, 0],
	[1, "The Arcane is Revealed",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "qEge1nefugk", "Urban Legend in Limbo", "ULiL", "Staff Roll", 0, 0, 0],
	
	//Legacy of Lunatic Kingdom
	[1, "The Space Shrine Maiden Appears",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "SjqMcIDHO0k", "Legacy of Lunatic Kingdom", "LoLK", "Title Screen", 0, 0, 1],
	[1, "Unforgettable, the Nostalgic Greenery",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "Nbqy18y0DMo", "Legacy of Lunatic Kingdom", "LoLK", "Stage 1", 0, 2, 1],
	[1, "The Rabbit Has Landed",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "Jyj1u5o65tg", "Legacy of Lunatic Kingdom", "LoLK", "Seiran's theme", 0, 1, 1],
	[1, "The Lake Reflects the Cleansed Moonlight",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "NxArg7xqYAY", "Legacy of Lunatic Kingdom", "LoLK", "Stage 2", 0, 2, 1],
	[1, "September Pumpkin",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "M3A-ieD418M", "Legacy of Lunatic Kingdom", "LoLK", "Ringo's Theme", 0, 1, 1],
	[1, "The Mysterious Shrine Maiden Flying Through Space",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "KdnK6RYjnn4", "Legacy of Lunatic Kingdom", "LoLK", "Stage 3", 0, 2, 1],
	[1, "Eternal Spring Dream",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0], "5OWvYpC.jpg?1", "Qcah1Tk2cn0", "Legacy of Lunatic Kingdom", "LoLK", "Doremy Sweet's theme", 0, 1, 1],
	[1, "The Frozen Eternal Capital",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "TYwul_WIvvs", "Legacy of Lunatic Kingdom", "LoLK", "Stage 4", 0, 2, 1],
	[1, "The Reversed Wheel of Fortune",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "nmZTRSwRFGw", "Legacy of Lunatic Kingdom", "LoLK", "Sagume Kishin's theme", 0, 1, 1],
	[1, "Faraway 380,000-Kilometer Voyage",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "hWOP5XNN12M", "Legacy of Lunatic Kingdom", "LoLK", "Stage 5", 0, 2, 1],
	[1, "The Clown of the Star-Spangled Banner",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "tO1dVPu7860", "Legacy of Lunatic Kingdom", "LoLK", "Clownpiece's theme", 0, 1, 1],
	[1, "The Sea Where the Home Planet is Reflected",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "OdXeCPOEB-Y", "Legacy of Lunatic Kingdom", "LoLK", "Stage 6", 0, 2, 1],
	[1, "Pure Furies ~ Whereabouts of the Heart",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "MgBoe_x9g2o", "Legacy of Lunatic Kingdom", "LoLK", "Junko's theme", 0, 1, 1],
	[1, "A World of Nightmares Never Seen Before",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "wc9H-apkH2M", "Legacy of Lunatic Kingdom", "LoLK", "Extra Stage", 0, 2, 1],
	[1, "Pandemonic Planet",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "z6EQlZaB7v8", "Legacy of Lunatic Kingdom", "LoLK", "Hecatia Lapislazuli's theme", 0, 1, 1],
	[1, "The Moon as Seen from the Shrine",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "A6bnKLBF-vM", "Legacy of Lunatic Kingdom", "LoLK", "Ending", 0, 0, 1],
	[1, "The Space Shrine Maiden Returns Home",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "5OWvYpC.jpg?1", "QWYewZVbWc0", "Legacy of Lunatic Kingdom", "LoLK", "Staff Roll", 0, 0, 1],
	//[1, "Player's Score",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "NqI4Bym.jpg", "t3hBNsqiwL8", "Great Fairy Wars", "GFW", "", 0, 0, 1],

	//Hidden Star in Four Seasons
	[1, "The Sky Where Cherry Blossoms Flutter Down",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "3B207i_YzE0", "Hidden Star in Four Seasons", "HSiFS", "Title Screen", 0, 0, 1],
	[1, "A Star of Hope Rises in the Blue Sky",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "F27KHgqN_mo", "Hidden Star in Four Seasons", "HSiFS", "Stage 1", 0, 2, 1],
	[1, "A Midsummer Fairy's Dream",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "TWwvxS5_ZSU", "Hidden Star in Four Seasons", "HSiFS", "Eternity Larva's theme", 0, 1, 1],
	[1, "The Colorless Wind on Youkai Mountain",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "VQ7iAYY9FtE", "Hidden Star in Four Seasons", "HSiFS", "Stage 2", 0, 2, 1],
	[1, "Deep-Mountain Encounter",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "v2eIagtFpTU", "Hidden Star in Four Seasons", "HSiFS", "Nemuno Sakata's Theme", 0, 1, 1],
	[1, "Swim in a Cherry Blossom-Colored Sea",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "GJxL5EJALLY", "Hidden Star in Four Seasons", "HSiFS", "Stage 3", 0, 2, 1],
	[1, "A Pair of Divine Beasts",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "ekRq4BuzX0s", "Hidden Star in Four Seasons", "HSiFS", "Aunn Komano's theme", 0, 1, 1],
	[1, "Illusionary White Traveler",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "0o8xTL_W-9I", "Hidden Star in Four Seasons", "HSiFS", "Stage 4", 0, 2, 1],
	[1, "The Magic Straw-Hat Jizo",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "x11Fx1-7ahA", "Hidden Star in Four Seasons", "HSiFS", "Narumi Yatadera's theme", 0, 1, 1],
	[1, "Does the Forbidden Door Lead to This World, or the World Beyond?",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "k6HE6goqqrU", "Hidden Star in Four Seasons", "HSiFS", "Stage 5", 0, 2, 1],
	[1, "Crazy Backup Dancers",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "hoy_JAV5pQ4", "Hidden Star in Four Seasons", "HSiFS", "Satono and Mai's theme", 0, 1, 1],
	[1, "Into Backdoor",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "FUIPHi6m6bw", "Hidden Star in Four Seasons", "HSiFS", "Stage 6", 0, 2, 1],
	[1, "The Concealed Four Seasons",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0], "hsifs.png", "euXOWkLoDoI", "Hidden Star in Four Seasons", "HSiFS", "Okina Matara's 1st theme", 0, 1, 1],
	[1, "No More Going Through Doors",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "HWJQA0v46LE", "Hidden Star in Four Seasons", "HSiFS", "Extra Stage", 0, 2, 1],
	[1, "Secret God Matara ~ Hidden Star in All Seasons.",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "BZx5KydoqHQ", "Hidden Star in Four Seasons", "HSiFS", "Okina Matara's 2nd theme", 0, 1, 1],
	[1, "Unnatural Nature",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "HZICG3R6xWc", "Hidden Star in Four Seasons", "HSiFS", "Ending", 0, 0, 1],
	[1, "White Traveler",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "hsifs.png", "I_IjW7cJ7T8", "Hidden Star in Four Seasons", "HSiFS", "Staff Roll", 0, 0, 1],
	//[1, "Player's Score",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0], "NqI4Bym.jpg", "t3hBNsqiwL8", "Great Fairy Wars", "GFW", "", 0, 0, 1],

	//Antinomy of Common Flowers
	[1, "Inchlings of the Shining Needle ~ Little Princess",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "054pI1m5fjY", "Antinomy of Common Flowers", "AoCF", "Shinmyoumaru Sukuna's theme", 1, 3, 0],
	[1, "Battlefield of Hanahazama",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "a2c20ujQooM", "Antinomy of Common Flowers", "AoCF", "Kasen Ibaraki's theme", 1, 3, 0],
	[1, "Last Occultism ~ Esotericist of the Present World",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "uhlRyykBf-Q", "Antinomy of Common Flowers", "AoCF", "Sumireko Usami's theme", 1, 3, 0],
	[1, "Lunatic Eyes ~ Invisible Full Moon",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "HcyOdaKtv70", "Antinomy of Common Flowers", "AoCF", "Reisen Udongein Inaba's theme", 1, 1, 0],
	[1, "Eternal Spring Dream",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "61smc_jnTuo", "Antinomy of Common Flowers", "AoCF", "Doremy Sweet's theme", 1, 1, 0],
	[1, "Catastrophe in Bhavaagra ~ Wonderful Heaven",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "UaMtjm7eRmQ", "Antinomy of Common Flowers", "AoCF", "Tenshi Hinanawi's theme", 1, 1, 0],
	[1, "Night Falls ~ Evening Star",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "Oy7EQzN_QCw", "Antinomy of Common Flowers", "AoCF", "Yukari Yakumo's theme", 1, 1, 0],
	[1, "The Ground's Color is Yellow ~ Primrose",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "WCLHBw4Msio", "Antinomy of Common Flowers", "AoCF", "Hakurei Shrine", 1, 1, 0],
	[1, "Mushroom Waltz",														[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "GOWUBkJLZaA", "Antinomy of Common Flowers", "AoCF", "Kourindou", 0, 2, 0],
	[1, "The Palanquin Ship Flies in the Sky",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "ukz5STDQTjk", "Antinomy of Common Flowers", "AoCF", "Treasure Ship Above the Clouds", 0, 2, 0],
	[1, "Equality Under the Law of Dharma",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "5dUwZoXfMLk", "Antinomy of Common Flowers", "AoCF", "Myouren Temple", 0, 2, 0],
	[1, "Constant and Unchanging Temple of Worship",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "nmylWE1oKMI", "Antinomy of Common Flowers", "AoCF", "Hall of Dreams' Great Mausoleum", 0, 2, 0],
	[1, "Shining Armillary Sphere",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "zcRLgZUDMt4", "Antinomy of Common Flowers", "AoCF", "Divine Spirit Mausoleum", 0, 2, 0],
	[1, "The Ravine Kappa's Technological Prowess",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "LLWrcr76QsI", "Antinomy of Common Flowers", "AoCF", "Genbu Ravine", 0, 2, 0],
	[1, "A Rose Blooming in the Underworld",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "g-1vuqybeiY", "Antinomy of Common Flowers", "AoCF", "Palace of the Earth Spirits", 0, 2, 0],
	[1, "In the Deep-Green Tanuki Forest",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "de_xxo_0b1M", "Antinomy of Common Flowers", "AoCF", "Youkai Tanuki Forest", 0, 2, 0],
	[1, "Shinkirou Theatrical",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "hBy98DPev3A", "Antinomy of Common Flowers", "AoCF", "Human Village", 1, 2, 0],
	[1, "Immortal Red Soul",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "OYsazOeD57A", "Antinomy of Common Flowers", "AoCF", "Bamboo Forest of the Lost", 0, 2, 0],
	[1, "The Inverted Castle Lit by the Setting Sun",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "-7DCmFnpeWU", "Antinomy of Common Flowers", "AoCF", "Shining Needle Castle", 0, 2, 0],
	[1, "Overcome a Thousand Trials",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "_8yxFz7t1y4", "Antinomy of Common Flowers", "AoCF", "Kasen's Hermit World", 0, 2, 0],
	[1, "Dream World Folklore",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "j5bwCaeqY6M", "Antinomy of Common Flowers", "AoCF", "Outside World", 1, 2, 0],
	[1, "Corridor Stretching to Eternity",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "3-tnnRvcBB0", "Antinomy of Common Flowers", "AoCF", "Eientei", 0, 2, 0],
	[1, "Sleep Sheep Parade",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "2QY74Rnoo1Y", "Antinomy of Common Flowers", "AoCF", "Dream World", 0, 2, 0],
	[1, "Bhavaagra as Far as the Eye Can See",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "q7LQk4_D4FQ", "Antinomy of Common Flowers", "AoCF", "Heaven", 0, 2, 0],
	[1, "Yorimashi Between Dreams and Reality ~ Necro-Fantasia",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "7Y3hQ38YGls", "Antinomy of Common Flowers", "AoCF", "Yukari Yakumo's 2nd theme, Shrine During Incident", 1, 3, 1],
	[1, "Tonight Stars an Easygoing Egoist (Live ver.) ~ Egoistic Flowers.",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "e28gguOW_zM", "Antinomy of Common Flowers", "AoCF", "Joon Yorigami & Shion Yorigami's theme", 0, 1, 1],
	[1, "Occult Attract",														[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "8iAr-eS-GAs", "Antinomy of Common Flowers", "AoCF", "Story Mode Battle", 0, 2, 0],
	[1, "Neo Bamboo Forest in Flames",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "FZI1Q0Oingk", "Antinomy of Common Flowers", "AoCF", "Story Mode Battle", 0, 2, 0],
	[1, "Bell of So Many Aeons",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "0B2Ee2xM7Cg", "Antinomy of Common Flowers", "AoCF", "Story Mode Battle", 0, 2, 0],
	[1, "Unknown X ~ Occultly Madness",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "U8B-Thz0fvw", "Antinomy of Common Flowers", "AoCF", "Final Boss", 1, 1, 0],
	[1, "Being Things Eye To Eye",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "hZ6srN2rQqI", "Antinomy of Common Flowers", "AoCF", "Story theme 1", 0, 2, 0],
	[1, "The One Jointly Responsible",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "7PE5BWkDy_4", "Antinomy of Common Flowers", "AoCF", "Story theme 2", 0, 2, 0],
	[1, "An Odd Couple",														[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "9prAc_rKKSc", "Antinomy of Common Flowers", "AoCF", "Story theme 3", 0, 2, 0],
	[1, "Two Minds of One Body",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "PsGOZ-3WRyM", "Antinomy of Common Flowers", "AoCF", "Story theme 4", 0, 2, 0],
	[1, "Grandiloquence",														[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "OIiKpZyQLm4", "Antinomy of Common Flowers", "AoCF", "Story theme 5", 0, 2, 0],
	[1, "Scheming Outside the Box",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "FwbqKMa0GAk", "Antinomy of Common Flowers", "AoCF", "Story theme 6", 0, 2, 0],
	[1, "In High Spirits",														[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "GPDp1773H2E", "Antinomy of Common Flowers", "AoCF", "Story theme 7", 0, 2, 0],
	[1, "The Curtain Shall Rise Soon",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "s0hNdcFrl9k", "Antinomy of Common Flowers", "AoCF", "Story theme 8", 0, 2, 0],
	[1, "Flawless as Clothing of the Celestials ~ Yellow Lily",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "KjoPVusafKE", "Antinomy of Common Flowers", "AoCF", "Story theme 9", 1, 2, 0],
	[1, "Floating with the Tide",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "2yumf_EpwDw", "Antinomy of Common Flowers", "AoCF", "Ending", 0, 0, 0],
	[1, "Seeds of the Incident",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "783WEPygP3M", "Antinomy of Common Flowers", "AoCF", "Title Screen", 0, 0, 0],
	[1, "Sprouts of Suspicion",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "jc0j4c1dOVs", "Antinomy of Common Flowers", "AoCF", "Title Screen", 0, 0, 0],
	[1, "Possession Flowers Yet to Bud",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "rMlWlIrlu8A", "Antinomy of Common Flowers", "AoCF", "Staff Roll", 0, 0, 0],
	[1, "Branches Reaching to the Truth",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "Ys6A6wb86vM", "Antinomy of Common Flowers", "AoCF", "Title Screen", 0, 0, 0],
	[1, "Possession Flowers in Full Bloom",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "7RmlZ1UUm9s", "Antinomy of Common Flowers", "AoCF", "Staff Roll", 0, 0, 0],
	[1, "Blizzard of Scattering Possession Flowers",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "zpGH_05mdcg", "Antinomy of Common Flowers", "AoCF", "Title Screen", 0, 0, 0],
	[1, "The Eternal Steam Engine",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0], "gOk6DEl.jpg", "hNMYO-hgqaI", "Antinomy of Common Flowers", "AoCF", "Staff Roll", 1, 0, 0],

	//Violet Detector
	[1, "Nightmare Journal",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "XaPCFK9.jpg", "PwlS4MpxocM", "Violet Detector", "VD", "Title Screen", 0, 0, 1],
	[1, "Lucid Dreamer",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "XaPCFK9.jpg", "YWtFSxS8oQ8", "Violet Detector", "VD", "Stage 1 (First Week)", 0, 2, 1],
	[1, "Lunatic Dreamer",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "XaPCFK9.jpg", "OXgievqKJ5Y", "Violet Detector", "VD", "Stage 2 (Wrong Week)", 0, 2, 1],
	[1, "Nightmare Diary",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], "XaPCFK9.jpg", "7yvhYbCTkyk", "Violet Detector", "VD", "Stage 3 (Nightmare Week)", 0, 2, 1],

	//Dr. Latency's Freak Report
	[1, "The Childlike Duo's Naturalis Historia",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "3_8nzN0DgPM", "Dr. Latency's Freak Report", "DLFR", "Track 1", 0, 0, 1],
	[1, "The Frozen Eternal Capital",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "cf3PtLGjU5I", "Dr. Latency's Freak Report", "DLFR", "Track 2", 1, 0, 1],
	[1, "Dr. Latency's Sleepless Eyes",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "CrsC9Y2ExdY", "Dr. Latency's Freak Report", "DLFR", "Track 3", 0, 0, 1],
	[1, "September Pumpkin",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "s7uZqDh9YTs", "Dr. Latency's Freak Report", "DLFR", "Track 4", 1, 0, 1],
	[1, "The Instant is Shorter Than Planck Time",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "ev8Sb9QHWiU", "Dr. Latency's Freak Report", "DLFR", "Track 5", 0, 0, 1],
	[1, "Schrödinger's Bakeneko",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "W1eIkCZygk4", "Dr. Latency's Freak Report", "DLFR", "Track 6", 0, 0, 1],
	[1, "The Shining Needle Castle Sinking in the Air",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "_xCsYagDcKw", "Dr. Latency's Freak Report", "DLFR", "Track 7", 1, 0, 1],
	[1, "The Taboo Membrane Wall",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "lgzOA1o9p_8", "Dr. Latency's Freak Report", "DLFR", "Track 8", 0, 0, 1],
	[1, "The Sea Where the Home Planet is Reflected",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "gg-GO7fQ6H8", "Dr. Latency's Freak Report", "DLFR", "Track 9", 1, 0, 1],
	[1, "Pure Furies ~ Whereabouts of the Heart",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "wsrFKz6dtwI", "Dr. Latency's Freak Report", "DLFR", "Track 10", 1, 0, 1],
	[1, "Eternal Short-Lived Reign",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0], "dlfr.png", "r_dD3Q7G0s4", "Dr. Latency's Freak Report", "DLFR", "Track 11", 1, 0, 1],

	//Dateless Bar "Old Adam"
	[1, "Old Adam Bar",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0], "dboa.png", "6dhPzFMCcAw", "Dateless Bar \"Old Adam\"", "DBOA", "Track 1", 0, 0, 1],
	[1, "The Darkness Brought In by Swallowstone Naturalis Historia",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0], "dboa.png", "Pe5MKi2P4QA", "Dateless Bar \"Old Adam\"", "DBOA", "Track 2", 0, 0, 1],
	[1, "Reverse Ideology",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "8BUWMPBy--M", "Dateless Bar \"Old Adam\"", "DBOA", "Track 3", 1, 0, 1],
	[1, "Outsider Cocktail",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "wv87-GvQlrw", "Dateless Bar \"Old Adam\"", "DBOA", "Track 4", 0, 0, 1],
	[1, "Omiwa Legend",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "MKVYoJQs1Wk", "Dateless Bar \"Old Adam\"", "DBOA", "Track 5", 1, 0, 1],
	[1, "Pandemonic Planet",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "KqkzIS5mygI", "Dateless Bar \"Old Adam\"", "DBOA", "Track 6", 1, 0, 1],
	[1, "Adventurer's Tavern of the Old World",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "TTGjcJyqtuM", "Dateless Bar \"Old Adam\"", "DBOA", "Track 7", 0, 0, 1],
	[1, "Rural Makai City Esoteria",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "YQFylj3KU5o", "Dateless Bar \"Old Adam\"", "DBOA", "Track 8", 1, 0, 1],
	[1, "The Lost Emotion",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "Il5fFPrDtjk", "Dateless Bar \"Old Adam\"", "DBOA", "Track 9", 1, 0, 1],
	[1, "Hangover of Bedfellows Dreaming Differently",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], "dboa.png", "8HnH8C3Ptkk", "Dateless Bar \"Old Adam\"", "DBOA", "Track 10", 0, 0, 1],

	//Wily Beast and Weakest Creature
	[1, "Silent Beast Spirits",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "KvI4Q7Hder8", "Wily Beast and Weakest Creature", "WBaWC", "Title Screen", 0, 0, 1],
	[1, "The Lamentations Known Only by Jizo",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "H8nKIxv0t0Y", "Wily Beast and Weakest Creature", "WBaWC", "Stage 1", 0, 2, 1],
	[1, "Jelly Stone",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "DyI9J1NyRoE", "Wily Beast and Weakest Creature", "WBaWC", "Eika Ebisu's theme", 0, 1, 1],
	[1, "Lost River",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "cUVAMHm1RLg", "Wily Beast and Weakest Creature", "WBaWC", "Stage 2", 0, 2, 1],
	[1, "The Stone Baby and the Submerged Bovine",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "MjpyCoUljds", "Wily Beast and Weakest Creature", "WBaWC", "Urumi Ushizaki's Theme", 0, 1, 1],
	[1, "Everlasting Red Spider Lily",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "ePzB2RTXtWk", "Wily Beast and Weakest Creature", "WBaWC", "Stage 3", 0, 2, 1],
	[1, "Seraphic Chicken",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "kaNGMQyuL6w", "Wily Beast and Weakest Creature", "WBaWC", "Kutaka Niwatari's theme", 0, 1, 1],
	[1, "Unlocated Hell",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "g6quAOBCqEM", "Wily Beast and Weakest Creature", "WBaWC", "Stage 4", 0, 2, 1],
	[1, "Tortoise Dragon ~ Fortune and Misfortune",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "TgunO56ONMA", "Wily Beast and Weakest Creature", "WBaWC", "Yachie Kicchou's theme", 0, 1, 1],
	[1, "Beast Metropolis",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "1KoJxo9mMvA", "Wily Beast and Weakest Creature", "WBaWC", "Stage 5", 0, 2, 1],
	[1, "Joutoujin of Ceramics",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "R7PeyXIW5zw", "Wily Beast and Weakest Creature", "WBaWC", "Mayumi Joutouguu's theme", 0, 1, 1],
	[1, "Electric Heritage",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "U1RPODPdvWs", "Wily Beast and Weakest Creature", "WBaWC", "Stage 6", 0, 2, 1],
	[1, "Entrusting this World to Idols ~ Idolatrize World",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "Y0VYKbTSxu0", "Wily Beast and Weakest Creature", "WBaWC", "Keiki Haniyasushin's theme", 0, 1, 1],
	[1, "The Shining Law of the Strong Eating the Weak",		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "Fjny1bxfyOA", "Wily Beast and Weakest Creature", "WBaWC", "Extra Stage", 0, 2, 1],
	[1, "Prince Shoutoku's Pegasus ~ Dark Pegasus",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "ZRdXeRkijZI", "Wily Beast and Weakest Creature", "WBaWC", "Saki Kurokoma's theme", 0, 1, 1],
	[1, "The Animals' Rest",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "F15o3TXcnxA", "Wily Beast and Weakest Creature", "WBaWC", "Ending", 0, 0, 1],
	[1, "Returning Home from the Underground",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0], "wbawc.png", "zXiC7YFQngk", "Wily Beast and Weakest Creature", "WBaWC", "Staff Roll", 0, 0, 1],
	//[1, "Player's Score",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0], "NqI4Bym.jpg", "t3hBNsqiwL8", "Great Fairy Wars", "GFW", "", 0, 0, 1],
	
	//Touhou Gouyoku Ibun
	[1, "Submerged Hell of Sunken Sorrow",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "DfU31yb8eNo", "Touhou Gouyoku Ibun", "SHoSS", "Title Screen", 0, 0, 0],
	[1, "Eastern Strange Tale of Avarice",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "3ScV3OKt0Yk", "Touhou Gouyoku Ibun", "SHoSS", "Staff Roll", 0, 0, 0],
	[1, "Laws of Heaven, Desires of Man",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "DW--G-vGJgY", "Touhou Gouyoku Ibun", "SHoSS", "Ending", 0, 0, 0],
	[1, "Magician's Melancholy",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "UtTdWnidTz8", "Touhou Gouyoku Ibun", "SHoSS", "Forest of Magic theme", 1, 2, 0],
	[1, "The Dark Blowhole",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "8Feuj8pUEEc", "Touhou Gouyoku Ibun", "SHoSS", "Rainbow Cavern of Earth Spirits theme", 1, 2, 0],
	[1, "Walking the Streets of a Former Hell",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "mTGzHX9Y4aM", "Touhou Gouyoku Ibun", "SHoSS", "Former Hell theme", 1, 2, 0],
	[1, "Hellfire Mantle",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "Elr7RWO9tD4", "Touhou Gouyoku Ibun", "SHoSS", "Hell of Blazing Fires theme", 1, 2, 0],
	[1, "Cemetery of Onbashira",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "x8VzHIfffzU", "Touhou Gouyoku Ibun", "SHoSS", "Underground Fusion Reactor theme", 1, 2, 0],
	[1, "Depths of the Earth, Ocean of Avarice",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "T2j1969Yo1c", "Touhou Gouyoku Ibun", "SHoSS", "Sea of Petroleum theme", 0, 2, 0],
	[1, "Everlasting Red Spider Lily",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "gCvnKqJiUDk", "Touhou Gouyoku Ibun", "SHoSS", "Hell of Blazing Fires (Flooded) theme", 1, 2, 0],
	[1, "The Centennial Festival for Magical Girls",			[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "Qm5h3G2fVks", "Touhou Gouyoku Ibun", "SHoSS", "Scarlet Devil Mansion theme", 1, 2, 0],
	[1, "Maiden's Capriccio",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "WbFDnpkLAbc", "Touhou Gouyoku Ibun", "SHoSS", "Reimu Hakurei's theme", 1, 1, 0],
	[1, "Love-Colored Master Spark",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "40KHejDcryg", "Touhou Gouyoku Ibun", "SHoSS", "Marisa Kirisame's theme", 1, 1, 0],
	[1, "The Sealed-Away Youkai",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "quVo4T_Zyq4", "Touhou Gouyoku Ibun", "SHoSS", "Yamame Kurodani's theme", 1, 1, 0],
	[1, "Beware the Umbrella Left There Forever",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "4tYWk6LQPNo", "Touhou Gouyoku Ibun", "SHoSS", "Kogasa Tatara's theme", 1, 1, 0],
	[1, "Captain Murasa",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "wokmjmCNROc", "Touhou Gouyoku Ibun", "SHoSS", "Minamitsu Murasa's theme", 1, 1, 0],
	[1, "The Venerable Ancient Battlefield",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "ssh_Ufp1AKw", "Touhou Gouyoku Ibun", "SHoSS", "Kanako Yasaka's theme", 1, 1, 0],
	[1, "Tonight Stars an Easygoing Egoist ~ Egoistic Flowers",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "3JXL92AFvp4", "Touhou Gouyoku Ibun", "SHoSS", "Joon and Shion Yorigami's theme", 1, 1, 0],
	[1, "A Flower-Studded Sake Dish on Mt. Ooe",				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "v6gmIpt6naA", "Touhou Gouyoku Ibun", "SHoSS", "Yuugi Hoshiguma's theme", 1, 1, 0],
	[1, "Solar Sect of Mystic Wisdom",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "wEho7LFF77s", "Touhou Gouyoku Ibun", "SHoSS", "Utsuho Reiuji's theme", 1, 1, 0],
	[1, "Seraphic Chicken",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "DmJPv4EDYRQ", "Touhou Gouyoku Ibun", "SHoSS", "Kutaka Niwatari's theme", 1, 1, 0],
	[1, "U.N. Owen Was Her?",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "lGukmISfmyg", "Touhou Gouyoku Ibun", "SHoSS", "Flandre Scarlet's theme", 1, 1, 0],
	[1, "Memento of the Avaricious Beast",						[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "dnzeZjSuHgQ", "Touhou Gouyoku Ibun", "SHoSS", "Yuuma Toutetsu's 1st theme", 0, 1, 1],
	[1, "Memento of All Organisms ~ Memory of Fossil Energy.",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0], "shoss.jpg", "ZOczrPEtriU", "Touhou Gouyoku Ibun", "SHoSS", "Yuuma Toutetsu's 2nd theme", 0, 1, 1],
	
	//Unconnected Marketeers
	[1, "A Rainbow Spanning Gensokyo",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "QhFpGscR0sc", "Unconnected Marketeers", "UM", "Title Screen", 0, 0, 1],
	[1, "A Shower of Strange Occurrences",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "7EYa1dzv2X0", "Unconnected Marketeers", "UM", "Stage 1", 0, 2, 1],
	[1, "Kitten of Great Fortune",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "OYfpDVHo9Ns", "Unconnected Marketeers", "UM", "Mike Goutokuji's theme", 0, 1, 1],
	[1, "The Cliff Hidden in Deep Green",									[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "Slk_RUzWGys", "Unconnected Marketeers", "UM", "Stage 2", 0, 2, 1],
	[1, "Banditry Technology",												[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "DDdLXVmUHqs", "Unconnected Marketeers", "UM", "Takane Yamashiro's Theme", 0, 1, 1],
	[1, "The Perpetual Snow of Komakusa Blossoms",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "qw4ITokIuek", "Unconnected Marketeers", "UM", "Stage 3", 0, 2, 1],
	[1, "Smoking Dragon",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "auLz5IclPpw", "Unconnected Marketeers", "UM", "Sannyo Komakusa's theme", 0, 1, 1],
	[1, "The Obsolescent Industrial Remains",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "U_uWMfmuQLw", "Unconnected Marketeers", "UM", "Stage 4", 0, 2, 1],
	[1, "Ore from the Age of the Gods",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "gtRzp8O_Olo", "Unconnected Marketeers", "UM", "Misumaru Tamatsukuri's Theme", 0, 1, 1],
	[1, "The Long-Awaited Oumagatoki",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "qttE17B3LtY", "Unconnected Marketeers", "UM", "Stage 5", 0, 2, 1],
	[1, "Starry Mountain of Tenma",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "viGlmdmOFY8", "Unconnected Marketeers", "UM", "Megumu Iizunamaru's theme", 0, 1, 1],
	[1, "Lunar Rainbow",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "ZamWDSwqyPk", "Unconnected Marketeers", "UM", "Stage 6", 0, 2, 1],
	[1, "Where Is That Bustling Marketplace Now ~ Immemorial Marketeers",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "Udn3r030Wic", "Unconnected Marketeers", "UM", "Chimata Tenkyuu's Theme", 0, 1, 1],
	[1, "The Great Fantastic Underground Railway Network",					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "uV-CxxDpnqA", "Unconnected Marketeers", "UM", "Extra Stage", 0, 2, 1],
	[1, "The Princess Who Slays Dragon Kings",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "AiGYjSW6dZk", "Unconnected Marketeers", "UM", "Momoyo Himemushi's theme", 0, 1, 1],
	[1, "The Sunday After the Storm",										[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "_kESz8ND7Mk", "Unconnected Marketeers", "UM", "Ending", 0, 0, 1],
	[1, "A Rainbow-Colored World",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], "um.jpg", "AUFP1wxuncs", "Unconnected Marketeers", "UM", "Staff Roll", 0, 0, 1]
	//[1, "Player's Score",													[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,1], "NqI4Bym.jpg", "t3hBNsqiwL8", "Great Fairy Wars", "GFW", "", 0, 0, 1],
];
//,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "sjw6_Z6BG6A", "Urban Legend in Limbo", "ULiL", "Pre-Battle", 0, 0],
//	[1, "Battlefield of Hanahazama",							[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "fp8hxDtqmR0", "Urban Legend in Limbo", "ULiL", "Kasen Ibaraki's theme/Penultimate Boss", 0, 3, 1],
//	[1, "Outside World Folklore",								[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "MUYyv0tYrSE", "Urban Legend in Limbo", "ULiL", "Pre-Boss", 0, 0, 0],
//	[1, "Last Occultism ~ Esotericist of the Present World",	[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "m2DrKruxJUw", "Urban Legend in Limbo", "ULiL", "Sumireko Usami's theme/Final Boss", 0, 3, 1],
//	[1, "Each Ending",											[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], "arjGI4C.jpg?1", "zEYTIjJkyZM", "Urban Legend in Limbo", "ULiL", "Ending",

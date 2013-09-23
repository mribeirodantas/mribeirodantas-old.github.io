#! /bin/bash

LINE=9
FILE="$1"

sed ""$LINE"i <item>" rss.xml > rss.xml_temp
let LINE=LINE+1
sed ""$LINE"i <title>$FILE</title>" rss.xml_temp > rss.xml_temp2
let LINE=LINE+1
sed ""$LINE"i <link>http://mribeirodantas.github.io/$FILE.html</link>" rss.xml_temp2 > rss.xml_temp
let LINE=LINE+1
sed ""$LINE"i <description>" rss.xml_temp > rss.xml_temp2
let LINE=LINE+1
sed ""$LINE"i </description>" rss.xml_temp2 > rss.xml_temp
let LINE=LINE+1
sed ""$LINE"i </item>" rss.xml_temp > rss.xml_temp2
let LINE=LINE+1
sed ""$LINE"i \ " rss.xml_temp2 > rss.xml_temp
sed "12r $FILE" rss.xml_temp > rss.xml_temp2
mv rss.xml_temp2 rss.xml
rm rss.xml_*

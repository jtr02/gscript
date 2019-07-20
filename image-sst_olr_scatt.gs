
***WP
*lon1=120
*lon2=170

***CP
*lon1=170
*lon2=220

***EP
lon1=220
lon2=270


lat1=-10
lat2=10

var1=sst
var2=olr.2

'open ersstv2.2.5x2.5.mon1979-.ctl'
'open olr.2.5x2.5.mon1979-.ctl'

fixmon=1;while(fixmon<=12)

'cc'
'set t 'fixmon
'q dim';line=sublin(result,5);  time=subwrd(line,6)

*'set yflip on'

tt=fixmon;while(tt<=312)

'set t 'tt
'set gxout scatter'
'set lon 'lon1' 'lon2'  '
'set lat 'lat1' 'lat2'  '
'set vrange2 150 300'
'set vrange 22 32'

'co'
'd sst;olr.2'


tt=tt+12;endwhile


'gif image_scat_00'fixmon'_'var1''var2'_'time'  '
'cc'
fixmon=fixmon+1;endwhile


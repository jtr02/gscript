**************************************************************
* function:
*   draw zero-line on line graph
*
* usage:
*   zeroline color mark linestyle thickness value
*     color     : line color
*     mark      : line mark
*     linestyle : line style
*     thickness : line thickness
*     value     : y_axis_value
*
* display help:
*   zeroline -help
*
* written by Y. Kamae
* 08/11/27
**************************************************************
function ckzero (args)

***********************   USAGE   ****************************
usage1="usage: zeroline color mark linetype thickness value"
usage2="color    : colors of the line and symbols (Default 1)"
usage3="mark     : symbols type (Default 0=no symbol)"
usage4="linetype : line type (Default 1=solid line)"
usage5="thickness: line thickness (Default 6=thick)"
usage6="value    : line value of y axis (Default 0.0=zero line)"
usage7=" "
usage8='!!please set vrange beforehand!!'
usage8='Ex.: zeroline'
usage9='Ex.: zeroline 1 0 1 6 0.0'

if (subwrd(args,1)='-help')
 say usage1
 say usage2
 say usage3
 say usage4
 say usage5
 say usage6
 say usage7
 say usage8
 say usage9
 return
endif

if (subwrd(args,1)='')
col='1'
mar='0'
lin='1'
thi='6'
val='0.0'
else
col=subwrd(args,1)
mar=subwrd(args,2)
lin=subwrd(args,3)
thi=subwrd(args,4)
val=subwrd(args,5)
endif

'set gxout line'
'aaaaa=0.0'
'set ccolor 'col
'set cmark 'mar
'set cstyle 'lin
'set cthick 'thi
'set grads off'
'd const(aaaaa,'val ')'

return
